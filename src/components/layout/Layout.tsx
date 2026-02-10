import { useState, useCallback, useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { TableOfContents } from './TableOfContents';
import { DocsPager } from './DocsPager';
import { TabsBar } from './TabsBar';
import { Breadcrumbs } from './Breadcrumbs';
import { SearchModal } from '../search/SearchModal';
import { ProgressBar } from '../ui/ProgressBar';
import { PageLoader } from './PageLoader';

export function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();
    const theme = useTheme();

    // Match custom breakpoints from CSS
    // sidebar hidden at max-width 1024px
    const isSidebarPersistent = useMediaQuery('(min-width:1025px)');
    // toc hidden at max-width 1280px
    const showTocColumn = useMediaQuery('(min-width:1281px)');

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

    // Determine if we should show TOC content (logic from original file)
    // Note: showToc boolean controls rendering of the component, 
    // showTocColumn controls visibility of the column layout
    const shouldRenderToc = !['/', '/getting-started', '/getting-started/'].includes(location.pathname);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <ProgressBar />
            <Box
                component="a"
                href="#main-content"
                className="skip-link"
                sx={{
                    position: 'absolute',
                    top: '-100%',
                    left: 2, // space-4
                    zIndex: 9999,
                    p: '0.75rem 1.5rem', // space-3 space-6
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    fontWeight: 600,
                    borderRadius: 1, // radius-md
                    textDecoration: 'none',
                    transition: 'top 150ms ease',
                    '&:focus': {
                        top: 2, // space-4
                        outline: '3px solid',
                        outlineColor: 'primary.light',
                        outlineOffset: '2px',
                    }
                }}
            >
                Skip to main content
            </Box>

            <Header onMenuToggle={handleMenuToggle} onSearchOpen={handleSearchOpen} />

            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
                {/* Fixed Sidebar Space - placeholder for fixed position sidebar */}
                <Box
                    aria-hidden="true"
                    sx={{
                        flexShrink: 0,
                        width: 280, // var(--sidebar-width)
                        display: isSidebarPersistent ? 'block' : 'none',
                    }}
                />

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Content Column: TabsBar + (Main + TOC) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    <TabsBar />

                    <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
                        <Box
                            component="main"
                            id="main-content"
                            role="main"
                            tabIndex={-1}
                            sx={{ flex: 1, minWidth: 0, p: 0, outline: 'none' }}
                        >
                            <Container
                                disableGutters
                                sx={{
                                    maxWidth: '780px !important', // var(--content-max-width) force override
                                    mx: 'auto',
                                    p: 4, // space-8 (2rem)
                                    [theme.breakpoints.down('sm')]: {
                                        px: 2, // space-4
                                        py: 3, // space-6
                                    }
                                }}
                            >
                                <Breadcrumbs />
                                <Suspense fallback={<PageLoader />}>
                                    <Outlet />
                                </Suspense>
                                <DocsPager />
                            </Container>
                        </Box>

                        {/* Table of Contents Column */}
                        {shouldRenderToc && (
                            <Box
                                component="aside"
                                aria-label="Table of contents"
                                sx={{
                                    flexShrink: 0,
                                    width: 220, // var(--toc-width)
                                    display: showTocColumn ? 'block' : 'none',
                                }}
                            >
                                <TableOfContents />
                            </Box>
                        )}
                    </Box>

                    {/* Footer inside content column */}
                    <Footer />
                </Box>
            </Box>

            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
        </Box>
    );
}
