import { useRef, useEffect } from 'react';
import { useTabs } from './TabsContext';
import styles from './TabsBar.module.css';

export function TabsBar() {
    const { tabs, activeTabPath, closeTab, openTab } = useTabs();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll active tab into view
    useEffect(() => {
        if (scrollRef.current) {
            const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeTabPath]);

    if (tabs.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={styles.scrollArea} ref={scrollRef}>
                {tabs.map((tab) => {
                    const isActive = tab.path === activeTabPath;
                    return (
                        <div
                            key={tab.path}
                            className={`${styles.tab} ${isActive ? styles.active : ''}`}
                            data-active={isActive}
                            onClick={() => openTab(tab.path)}
                        >
                            <span className={styles.title}>{tab.title}</span>
                            <button
                                className={styles.closeBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeTab(tab.path);
                                }}
                                aria-label={`Close ${tab.title}`}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
