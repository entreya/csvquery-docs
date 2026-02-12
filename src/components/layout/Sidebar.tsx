import { useState, useEffect } from 'react';
import { NavLink, useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, List, ListItem, Collapse, Typography, Link, ButtonBase } from '@mui/material';
import { navigation } from '../../lib/navigation';
import { useTheme } from '../../hooks/useTheme';

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onSearchOpen: () => void;
}

// Fixed Sidebar Item to handle nesting props properly
function NavItem({ item, onClose, level = 0 }: { item: import('../../lib/navigation').NavItem, onClose: () => void, level?: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Auto-expand
    useEffect(() => {
        if (item.items) {
            const hasActiveChild = item.items.some(child =>
                (child.href && location.pathname === child.href) ||
                (child.items && child.items.some(grandChild => grandChild.href === location.pathname))
            );
            if (hasActiveChild) {
                setIsOpen(true);
            }
        }
    }, [location.pathname, item.items]);

    const isNested = level > 0;
    // Connector line style for nested items
    const connectorStyle = isNested ? {
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '12px', // Connector length
            height: '1px',
            bgcolor: 'divider', // Matches the vertical line
            transform: 'translateY(-50%)',
        }
    } : {};

    // Group Header (with children)
    if (item.items) {
        return (
            <ListItem disablePadding sx={{ display: 'block', mb: 0 }}>
                <ButtonBase
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 0.75,
                        pr: 2,
                        pl: isNested ? 3 : 3, // Fixed padding, indentation handled by parent List ml
                        textAlign: 'left',
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        transition: 'color 150ms ease',
                        position: 'relative',
                        '&:hover': { color: 'text.primary' },
                        ...(isOpen && { color: 'primary.main' }),
                        ...connectorStyle
                    }}
                >
                    {item.icon && (
                        <item.icon
                            sx={{
                                fontSize: 20,
                                mr: 1,
                                color: 'inherit',
                                opacity: 0.8
                            }}
                        />
                    )}
                    <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>{item.title}</Typography>
                    <Box
                        component="svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        sx={{
                            width: 12,
                            height: 12,
                            strokeWidth: 1.5,
                            transition: 'transform 250ms ease',
                            transform: isOpen ? 'rotate(180deg)' : 'none',
                            opacity: 0.7,
                            flexShrink: 0,
                            ml: 1,
                        }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </Box>
                </ButtonBase>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List
                        disablePadding
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            ml: 3, // Indent the list for hierarchy
                            borderLeft: '1px solid', // Vertical tree line
                            borderColor: 'divider',
                        }}
                    >
                        {item.items.map(subItem => (
                            <NavItem key={subItem.title} item={subItem} onClose={onClose} level={level + 1} />
                        ))}
                    </List>
                </Collapse>
            </ListItem>
        );
    }

    if (!item.href) return null;

    // Link Item
    return (
        <ListItem disablePadding sx={{ display: 'block', mb: 0 }}>
            <Link
                component={NavLink}
                to={item.href}
                end // Use specific matching to avoid parent links being active for child routes
                onClick={() => {
                    if (window.innerWidth < 1024) {
                        onClose();
                    }
                }}
                underline="none"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 0.25, // Minimal vertical gutter
                    pr: 2.5, // Restored horizontal gutter
                    pl: 3.5, // Restored horizontal gutter (indented)
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                    transition: 'all 150ms ease',
                    position: 'relative',
                    textDecoration: 'none !important',
                    borderRight: '2px solid transparent', // Keep active border on right? Or maybe remove for nested?

                    ...connectorStyle,

                    '&:hover': {
                        color: 'text.primary',
                        bgcolor: 'action.hover',
                    },

                    // Active state
                    '&.active': {
                        color: 'primary.main',
                        bgcolor: 'rgba(139, 92, 246, 0.1)',
                        fontWeight: 600,
                        borderRightColor: 'primary.main',
                        // Ensure connector is visible/colored?
                        '&::before': {
                            bgcolor: 'divider', // Keep it subtle or make it active color? 
                            // Usually tree lines stay neutral.
                        }
                    }
                }}
            >
                {item.icon && (
                    <item.icon
                        sx={{
                            fontSize: 18,
                            mr: 1.5,
                            color: 'inherit',
                            opacity: 0.8
                        }}
                    />
                )}
                <Box component="span" sx={{ flex: 1 }}>{item.title}</Box>
            </Link>
        </ListItem>
    );
}

export function Sidebar({ isOpen, onClose, onSearchOpen }: SidebarProps) {
    const [openSections, setOpenSections] = useState<string[]>(
        navigation.map(n => n.title)
    );
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    // Auto-expand logic based on active route
    useEffect(() => {
        navigation.forEach(section => {
            const hasActiveLink = section.items.some(item => {
                if (item.href === location.pathname) return true;
                if (item.items) {
                    return item.items.some(child => child.href === location.pathname || (child.items && child.items.some(g => g.href === location.pathname)));
                }
                return false;
            });

            if (hasActiveLink && !openSections.includes(section.title)) {
                setOpenSections(prev => [...prev, section.title]);
            }
        });
    }, [location.pathname]);

    const toggleSection = (title: string) => {
        setOpenSections(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    return (
        <>
            {/* Backdrop for mobile */}
            <Box
                onClick={onClose}
                aria-hidden="true"
                sx={{
                    position: 'fixed',
                    inset: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 40,
                    backdropFilter: 'blur(4px)',
                    display: isOpen ? 'block' : 'none',
                    '@media (min-width: 1025px)': {
                        display: 'none !important'
                    }
                }}
            />

            <Box
                component="aside"
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 280, // sidebar-width
                    bgcolor: 'background.default', // bg-primary
                    borderRight: 1,
                    borderColor: 'divider',
                    zIndex: 50,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 250ms ease',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden', // Disable scroll on main container
                    '@media (min-width: 1025px)': {
                        transform: 'translateX(0) !important',
                        top: 0,
                        height: '100vh',
                    }
                }}
            >
                {/* Fixed Top SectionWrapper */}
                <Box sx={{ flexShrink: 0 }}>
                    {/* Logo + Theme Switcher */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2.5,
                            minHeight: 64, // Same as header height
                            borderBottom: 1,
                            borderColor: 'divider',
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to="/"
                            underline="none"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                color: 'text.primary',
                                textDecoration: 'none !important',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 0.5,
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    bgcolor: 'background.paper',
                                    width: 32,
                                    height: 32,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/csvquery-docs/entreya-logo-final.png"
                                    alt="entreya"
                                    sx={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    letterSpacing: '-0.01em',
                                }}
                            >
                                csvquery
                            </Typography>
                        </Link>

                        {/* Sliding Theme Switcher */}
                        <Box
                            onClick={toggleTheme}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: 52,
                                height: 28,
                                bgcolor: 'action.hover', // darker in light, lighter in dark
                                borderRadius: 999,
                                position: 'relative',
                                cursor: 'pointer',
                                border: 1,
                                borderColor: 'divider',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 2,
                                    left: theme === 'light' ? 2 : 26,
                                    width: 22,
                                    height: 22,
                                    borderRadius: '50%',
                                    bgcolor: 'background.paper',
                                    boxShadow: 1,
                                    transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'primary.main',
                                }}
                            >
                                {theme === 'light' ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="5" />
                                        <line x1="12" y1="1" x2="12" y2="3" />
                                        <line x1="12" y1="21" x2="12" y2="23" />
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                        <line x1="1" y1="12" x2="3" y2="12" />
                                        <line x1="21" y1="12" x2="23" y2="12" />
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                    </svg>
                                )}
                            </Box>
                        </Box>
                    </Box>

                    {/* Search Trigger */}
                    <Box sx={{ px: 2, py: 2 }}>
                        <ButtonBase
                            onClick={onSearchOpen}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                height: 36,
                                px: 1.5,
                                bgcolor: 'secondary.main', // bg-secondary
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                transition: 'all 150ms ease',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover',
                                    color: 'text.primary',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <Typography component="span" sx={{ fontSize: 'inherit' }}>
                                    Search...
                                </Typography>
                            </Box>
                            <Box
                                component="kbd"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 20,
                                    px: 0.75,
                                    fontSize: '0.75rem',
                                    fontFamily: 'monospace',
                                    bgcolor: 'background.paper',
                                    borderRadius: 0.5,
                                    color: 'text.secondary',
                                    lineHeight: 1,
                                    border: 1,
                                    borderColor: 'divider',
                                }}
                            >
                                ⌘K
                            </Box>
                        </ButtonBase>
                    </Box>
                </Box>

                {/* Scrollable Navigation Links */}
                <Box
                    component="nav"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        pb: 2,
                        overflowY: 'auto', // Scroll only this section
                        overflowX: 'hidden'
                    }}
                >
                    {navigation.map((section) => {
                        const isSectionOpen = openSections.includes(section.title);

                        return (
                            <Box key={section.title} sx={{ display: 'flex', flexDirection: 'column', mb: 0 }}>
                                <ButtonBase
                                    onClick={() => toggleSection(section.title)}
                                    aria-expanded={isSectionOpen}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        textAlign: 'left',
                                        py: 0.5, // Reduced vertical
                                        px: 2.5, // Restored horizontal gutter
                                        color: 'text.secondary',
                                        transition: 'color 150ms ease',
                                        '&:hover': {
                                            color: 'text.primary',
                                        },
                                        ...(isSectionOpen && {
                                        })
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            color: 'inherit'
                                        }}
                                    >
                                        {section.title}
                                    </Typography>
                                    <Box
                                        component="svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        sx={{
                                            width: 12,
                                            height: 12,
                                            strokeWidth: 1.5,
                                            transition: 'transform 250ms ease',
                                            transform: isSectionOpen ? 'rotate(180deg)' : 'none',
                                            opacity: 0.7,
                                            flexShrink: 0,
                                            ml: 1,
                                        }}
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </Box>
                                </ButtonBase>

                                <Collapse in={isSectionOpen} timeout="auto">
                                    <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                        {section.items.map((item) => (
                                            <NavItem key={item.title} item={item} onClose={onClose} />
                                        ))}
                                    </List>
                                </Collapse>
                            </Box>
                        );
                    })}
                </Box>

                {/* Footer Section: GitHub Link (Fixed at bottom) */}
                <Box
                    sx={{
                        p: 2,
                        borderTop: 1,
                        borderColor: 'divider',
                        flexShrink: 0, // Prevent shrinking
                        bgcolor: 'background.default', // Ensure background is opaque
                    }}
                >
                    <ButtonBase
                        component="a"
                        href="https://github.com/entreya/csvquery"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1.5,
                            width: '100%',
                            py: 1,
                            px: 2,
                            borderRadius: 1,
                            color: 'text.secondary',
                            transition: 'all 150ms ease',
                            '&:hover': {
                                color: 'text.primary',
                                bgcolor: 'action.hover',
                            }
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>GitHub</Typography>
                    </ButtonBase>
                </Box>
            </Box>
        </>
    );
}
