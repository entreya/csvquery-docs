import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TableOfContents.module.css';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    const location = useLocation();

    // Parse headings from DOM
    useEffect(() => {
        const updateHeadings = () => {
            // Select h2 and h3 from the main content area using the specific ID
            const mainContent = document.getElementById('main-content');
            if (!mainContent) return;

            const elements = Array.from(mainContent.querySelectorAll('h2, h3'));
            const items: TocItem[] = elements
                .map((elem) => ({
                    id: elem.id,
                    text: elem.textContent || '',
                    level: Number(elem.tagName.substring(1)),
                }))
                .filter(item => item.id && item.text); // Ensure ID exists

            // Only update if changed to avoid loops/jitters
            setHeadings(prev => {
                const isSame = prev.length === items.length &&
                    prev.every((item, i) => item.id === items[i].id && item.text === items[i].text);
                return isSame ? prev : items;
            });
        };

        // Retry logic to find main-content if it's not immediately available
        const attemptUpdate = (retries = 5) => {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                updateHeadings();
                // Attach observer once main content is found
                const observer = new MutationObserver(updateHeadings);
                observer.observe(mainContent, { childList: true, subtree: true });
                return () => observer.disconnect();
            } else if (retries > 0) {
                const timer = setTimeout(() => attemptUpdate(retries - 1), 100);
                return () => clearTimeout(timer);
            }
            return () => { };
        };

        // Initial attempt
        const cleanup = attemptUpdate();

        // Also run a fallback timeout sequence just in case DOM structure settles late
        const t1 = setTimeout(updateHeadings, 150);
        const t2 = setTimeout(updateHeadings, 500);
        const t3 = setTimeout(updateHeadings, 1000); // Late check for slower transitions

        return () => {
            if (typeof cleanup === 'function') cleanup();
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [location.pathname]);

    // Scroll spy using IntersectionObserver or getBoundingClientRect
    // Using getBoundingClientRect for simpler active state logic relative to header height
    useEffect(() => {
        const handleScroll = () => {
            const headerOffset = 100; // Account for sticky header
            const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];

            // Find the last heading that is above the "scrolled past" line
            let currentId = '';
            for (const elem of headingElements) {
                const rect = elem.getBoundingClientRect();
                // If top of element is above (or close to) the fixed header area
                if (rect.top <= headerOffset + 50) {
                    currentId = elem.id;
                } else {
                    // Since we're iterating in order, once we find one below, we can stop? 
                    // No, because we want the *last* one that satisfied the condition.
                    // But if we found one below, the *previous* one was the correct one.
                    break;
                }
            }

            // If we are at the very bottom of the page, highlight the last item
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                if (headingElements.length > 0) {
                    currentId = headingElements[headingElements.length - 1].id;
                }
            }

            setActiveId(currentId);
        };

        // Throttle slightly or just use passive listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once on mount to set initial active
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav
            className={styles.toc}
            aria-label="Table of contents"
        >
            <h4 className={styles.title}>On This Page</h4>
            <ul className={styles.list}>
                {headings.map(heading => (
                    <li
                        key={heading.id}
                        className={`${styles.item} ${heading.level === 3 ? styles.depth3 : ''}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`${styles.link} ${activeId === heading.id ? styles.active : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                setActiveId(heading.id);
                                window.history.pushState(null, '', `#${heading.id}`);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
