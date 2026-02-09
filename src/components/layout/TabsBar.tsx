import { useRef, useEffect, useState } from 'react';
import { useTabs } from './TabsContext';
import styles from './TabsBar.module.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import clsx from 'clsx';

export function TabsBar() {
    const { tabs, activeTabPath, openTab, closeTab } = useTabs();
    const scrollRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<{ [path: string]: HTMLButtonElement | null }>({});
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            checkScroll();
            window.addEventListener('resize', checkScroll);
            el.addEventListener('scroll', checkScroll);
        }
        return () => {
            window.removeEventListener('resize', checkScroll);
            if (el) el.removeEventListener('scroll', checkScroll);
        };
    }, [tabs]);

    // Scroll active tab into view
    useEffect(() => {
        if (activeTabPath && tabRefs.current[activeTabPath]) {
            tabRefs.current[activeTabPath]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [activeTabPath, tabs.length]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = 200;
            scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
        }
    };

    if (tabs.length === 0) return null;

    return (
        <div className={styles.container}>
            {showLeft && (
                <button
                    className={styles.scrollBtn}
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeftIcon fontSize="small" />
                </button>
            )}

            <div className={styles.scrollArea} ref={scrollRef}>
                {tabs.map((tab, tabIndex) => {
                    const isActiveTab = tab.path === activeTabPath;
                    const breadcrumbs = tab.breadcrumbs;

                    // For each tab, render its breadcrumb chain as connected segments
                    // The LAST breadcrumb is the actual page (leaf)
                    return (
                        <div key={tab.path} className={clsx(styles.tabGroup, { [styles.activeGroup]: isActiveTab })}>
                            {breadcrumbs.map((crumb, crumbIndex) => {
                                const isLast = crumbIndex === breadcrumbs.length - 1;
                                const Icon = crumb.icon || DescriptionTwoToneIcon;

                                // Parent crumbs (non-last) are displayed as non-clickable divs
                                if (!isLast) {
                                    return (
                                        <div
                                            key={crumb.path + crumbIndex}
                                            className={clsx(styles.tab, styles.crumb)}
                                            title={crumb.title}
                                        >
                                            <Icon sx={{ fontSize: 16, mr: 0.5, opacity: 0.8 }} />
                                            <span className={styles.title}>{crumb.title}</span>
                                        </div>
                                    );
                                }

                                // Leaf tab (last item) - clickable button
                                return (
                                    <button
                                        key={crumb.path + crumbIndex}
                                        ref={(el) => { tabRefs.current[tab.path] = el; }}
                                        className={clsx(styles.tab, {
                                            [styles.active]: isActiveTab
                                        })}
                                        onClick={() => openTab(crumb.path)}
                                        title={crumb.title}
                                    >
                                        <Icon sx={{ fontSize: 16, mr: 0.5, opacity: 0.8 }} />
                                        <span className={styles.title}>{crumb.title}</span>
                                        <span
                                            className={styles.closeBtn}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                closeTab(tab.path);
                                            }}
                                            title="Close tab"
                                        >
                                            <CloseTwoToneIcon sx={{ fontSize: 14 }} />
                                        </span>
                                    </button>
                                );
                            })}
                            {/* Separator between tab groups */}
                            {tabIndex < tabs.length - 1 && <div className={styles.separator} />}
                        </div>
                    );
                })}
            </div>

            {showRight && (
                <button
                    className={styles.scrollBtn}
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRightIcon fontSize="small" />
                </button>
            )}
        </div>
    );
}
