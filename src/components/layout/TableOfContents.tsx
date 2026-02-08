import { useEffect, useState, useRef, useCallback } from 'react';
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
    const tocRef = useRef<HTMLElement>(null);
    const location = useLocation();

    // Extract headings from the page - Runs on mount AND route change
    useEffect(() => {
        // Short timeout to ensure DOM is updated after route transition
        const timer = setTimeout(() => {
            const article = document.querySelector('article');
            if (!article) return;

            const elements = article.querySelectorAll('h1, h2, h3');
            const items: TocItem[] = [];

            elements.forEach((el) => {
                if (el.id) {
                    items.push({
                        id: el.id,
                        text: el.textContent || '',
                        level: parseInt(el.tagName.charAt(1)),
                    });
                }
            });

            setHeadings(items);
            // Reset active ID on page change
            setActiveId('');
        }, 100);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Intersection Observer for active heading tracking
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -80% 0px',
                threshold: 0,
            }
        );

        // Observe all headings
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    // Auto-scroll TOC to keep active item visible
    useEffect(() => {
        if (!activeId || !tocRef.current) return;

        const activeLink = tocRef.current.querySelector(`a[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [activeId]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveId(id);
            // Update URL hash without scrolling
            window.history.pushState(null, '', `#${id}`);
        }
    }, []);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav ref={tocRef} className={styles.toc} aria-label="Table of contents">
            <h4 className={styles.title}>On This Page</h4>
            <ul className={styles.list}>
                {headings.map(({ id, text, level }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            onClick={(e) => handleClick(e, id)}
                            className={`${styles.link} ${level === 3 ? styles.subLink : ''} ${activeId === id ? styles.active : ''}`}
                        >
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
