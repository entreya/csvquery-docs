import { useState, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { TableOfContents } from './TableOfContents';
import { DocsPager } from './DocsPager';
import { TabsBar } from './TabsBar';
import { Breadcrumbs } from './Breadcrumbs';
import { SearchModal } from '../search/SearchModal';
import styles from './Layout.module.css';

export function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();

    const handleMenuToggle = useCallback(() => {
        setSidebarOpen(prev => !prev);
    }, []);

    const handleSearchOpen = useCallback(() => {
        setSearchOpen(true);
    }, []);

    // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Determine if we should show TOC
    const showToc = !['/', '/getting-started', '/getting-started/'].includes(location.pathname);

    return (
        <div className={styles.layout}>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <Header onMenuToggle={handleMenuToggle} onSearchOpen={handleSearchOpen} />

            <div className={styles.wrapper}>
                {/* Fixed Sidebar Space */}
                <div
                    className={styles.sidebarSpace}
                    aria-hidden="true"
                />

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Content Column: TabsBar + (Main + TOC) */}
                <div className={styles.contentColumn}>
                    <TabsBar />

                    <div className={styles.contentRow}>
                        <main id="main-content" className={styles.main} role="main" tabIndex={-1}>
                            <article className={styles.article}>
                                <Breadcrumbs />
                                <Outlet />
                                <DocsPager />
                            </article>
                        </main>

                        {/* Table of Contents - Conditionally rendered or just hidden via CSS if empty, 
                            but structurally adjacent to main now */}
                        {showToc && (
                            <aside className={styles.tocSpace} aria-label="Table of contents">
                                <TableOfContents />
                            </aside>
                        )}
                    </div>

                    {/* Footer inside content column now, at bottom */}
                    <Footer />
                </div>
            </div>

            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
        </div>
    );
}
