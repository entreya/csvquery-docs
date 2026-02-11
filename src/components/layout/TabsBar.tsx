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
                    if (!breadcrumbs || breadcrumbs.length === 0) return null;

                    // Only render the LEAF node (last item) as the tab
                    const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
                    const Icon = lastCrumb.icon || DescriptionTwoToneIcon;

                    return (
                        <div key={tab.path} className={clsx(styles.tabGroup, { [styles.activeGroup]: isActiveTab })}>
                            <button
                                ref={(el) => { tabRefs.current[tab.path] = el; }}
                                className={clsx(styles.tab, {
                                    [styles.active]: isActiveTab
                                })}
                                onClick={() => openTab(tab.path)}
                                title={lastCrumb.title}
                            >
                                <Icon sx={{ fontSize: 16, mr: 0.5, opacity: 0.8 }} />
                                <span className={styles.title}>{lastCrumb.title}</span>
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

                            {/* Separator between tabs */}
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
