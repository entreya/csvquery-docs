import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton, useTheme as useMuiTheme, ButtonBase, Typography, Link } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
    onMenuToggle: () => void;
    onSearchOpen: () => void;
}

export function Header({ onMenuToggle, onSearchOpen }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const muiTheme = useMuiTheme();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                height: 64, // var(--header-height)
                bgcolor: 'background.default',
                borderBottom: 1,
                borderColor: 'divider',
                backdropFilter: 'blur(12px)',
                color: 'text.primary',
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    maxWidth: 1400,
                    width: '100%',
                    mx: 'auto',
                    px: 3, // space-6 (1.5rem)
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: '100%',
                    [muiTheme.breakpoints.down('md')]: {
                        justifyContent: 'space-between',
                        px: 2, // space-4
                    }
                }}
            >
                {/* Left Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2, // space-4
                        position: { md: 'absolute' },
                        left: { md: 24 }, // space-6
                    }}
                >
                    <IconButton
                        onClick={onMenuToggle}
                        aria-label="Toggle menu"
                        sx={{
                            display: { xs: 'flex', lg: 'none' }, // Show on < 1024px (approx lg)
                            p: 1, // space-2
                            color: 'text.secondary',
                            borderRadius: 1, // radius-md
                            transition: 'all 150ms ease',
                            '&:hover': {
                                color: 'text.primary',
                                bgcolor: 'action.hover',
                            }
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </IconButton>
                    {/* Branding */}
                    <Link
                        component={RouterLink}
                        to="/"
                        underline="none"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 0, sm: 1.5 },
                            color: 'text.primary',
                            textDecoration: 'none !important',
                            mr: 2,
                            flexShrink: 0
                        }}
                    >
                        <Box
                            component="img"
                            src="/csvquery-docs/entreya-logo-transparent.png"
                            alt="entreya"
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 0.5,
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'text.primary',
                                letterSpacing: '-0.02em',
                                display: { xs: 'none', lg: 'block' }
                            }}
                        >
                            csvquery
                        </Typography>
                    </Link>
                </Box>

                {/* Right Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2, // space-4
                        width: '100%',
                        maxWidth: 800,
                        justifyContent: { xs: 'flex-end', md: 'center' },
                        [muiTheme.breakpoints.down('md')]: {
                            width: 'auto',
                            flex: 1,
                        }
                    }}
                >
                    <ButtonBase
                        onClick={onSearchOpen}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1.5, // space-3
                            height: 44,
                            px: 2, // space-4
                            bgcolor: 'secondary.main', // bg-secondary
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 999, // pill
                            color: 'text.secondary',
                            fontSize: '1rem',
                            flex: 1,
                            maxWidth: 500,
                            cursor: 'pointer',
                            boxShadow: 1, // shadow-sm
                            transition: 'all 150ms ease',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'action.hover',
                                boxShadow: 2, // shadow-md
                            },
                            [muiTheme.breakpoints.down('md')]: {
                                minWidth: 'unset',
                                width: 'auto',
                                px: 1.5,
                                height: 36,
                                maxWidth: 'none',
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <Typography
                                component="span"
                                sx={{
                                    lineHeight: 'normal',
                                    [muiTheme.breakpoints.down('md')]: {
                                        fontSize: '0.875rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: 'block'
                                    }
                                }}
                            >
                                Search...
                            </Typography>
                        </Box>

                        <Box
                            component="kbd"
                            sx={{
                                display: { xs: 'none', md: 'inline-flex' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 24,
                                px: 1,
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

                    <IconButton
                        href="https://github.com/entreya/csvquery"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        sx={{
                            width: 44,
                            height: 44,
                            color: 'text.secondary',
                            borderRadius: 1, // radius-md
                            transition: 'all 150ms ease',
                            flexShrink: 0,
                            '&:hover': {
                                color: 'primary.main',
                                bgcolor: 'action.hover',
                            },
                            [muiTheme.breakpoints.down('md')]: {
                                width: 36,
                                height: 36,
                            }
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </IconButton>

                    <IconButton
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        sx={{
                            width: 44,
                            height: 44,
                            color: 'text.secondary',
                            borderRadius: 1, // radius-md
                            transition: 'all 150ms ease',
                            flexShrink: 0,
                            '&:hover': {
                                color: 'primary.main',
                                bgcolor: 'action.hover',
                            },
                            [muiTheme.breakpoints.down('md')]: {
                                width: 36,
                                height: 36,
                            }
                        }}
                    >
                        {theme === 'light' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                        )}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
