import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, List, ListItem, Collapse, Typography, Link, ButtonBase } from '@mui/material';
import { navigation } from '../../lib/navigation';

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
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

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [openSections, setOpenSections] = useState<string[]>(
        navigation.map(n => n.title)
    );
    const location = useLocation();

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
                    top: 64, // header-height
                    left: 0,
                    bottom: 0,
                    width: 280, // sidebar-width
                    bgcolor: 'background.default', // bg-primary (checked: muiTheme map)
                    borderRight: 1,
                    borderColor: 'divider',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    zIndex: 50,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 250ms ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '@media (min-width: 1025px)': {
                        transform: 'translateX(0) !important'
                    }
                }}
            >
                <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', flex: 1, pb: 8, pt: 2 }}>
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
            </Box>
        </>
    );
}
