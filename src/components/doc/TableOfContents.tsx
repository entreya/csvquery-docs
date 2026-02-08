import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Parse headings from DOM
    useEffect(() => {
        const updateHeadings = () => {
            // Select h2 and h3 from the main content area (assuming standard mdx output)
            // We need to target the content area specifically to avoid picking up sidebar/nav headings
            const elements = Array.from(document.querySelectorAll('main h2, main h3'));
            const items: TocItem[] = elements.map((elem) => ({
                id: elem.id,
                text: elem.textContent || '',
                level: Number(elem.tagName.substring(1)),
            }));
            setHeadings(items);
        };

        // Run after render
        const timeout = setTimeout(updateHeadings, 100);

        // Observer for dynamic content changes?
        const observer = new MutationObserver(updateHeadings);
        const main = document.querySelector('main');
        if (main) {
            observer.observe(main, { childList: true, subtree: true });
        }

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, []);

    // Scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const headingElements = headings.map(h => document.getElementById(h.id));
            const scrollPosition = window.scrollY + 100; // offset

            let currentId = '';
            for (const elem of headingElements) {
                if (elem && elem.offsetTop <= scrollPosition) {
                    currentId = elem.id;
                }
            }
            setActiveId(currentId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className={styles.toc} aria-label="Table of contents">
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
