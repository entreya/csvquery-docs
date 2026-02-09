import { createTheme, type ThemeOptions } from '@mui/material/styles';

// Extracting tokens from tokens.css
const colors = {
    primary: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8B5CF6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
    },
    accent: {
        warning: '#D97706',
        error: '#DC2626',
        success: '#059669',
        info: '#0284C7',
    },
    light: {
        background: {
            default: '#ffffff',
            paper: '#ffffff', // Using white for paper in light mode
            secondary: '#f6f8fa',
            tertiary: '#eaeef2',
        },
        text: {
            primary: '#24292f',
            secondary: '#57606a',
            tertiary: '#6e7781',
            muted: '#8c959f',
        },
        border: {
            primary: '#d0d7de',
            secondary: '#eaeef2',
            accent: 'rgba(139, 92, 246, 0.4)',
        },
        link: '#7c3aed', // primary-600
    },
    dark: {
        background: {
            default: '#0d1117',
            paper: '#0d1117', // Using default bg for paper in dark mode to match
            secondary: '#010409',
            tertiary: '#161b22',
        },
        text: {
            primary: '#c9d1d9',
            secondary: '#8b949e',
            tertiary: '#484f58',
            muted: '#30363d',
        },
        border: {
            primary: '#30363d',
            secondary: '#21262d',
            accent: 'rgba(139, 92, 246, 0.4)',
        },
        link: '#8B5CF6', // primary-500
    },
};

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: colors.primary[500],
            light: colors.primary[400],
            dark: colors.primary[600],
            contrastText: '#ffffff',
        },
        secondary: {
            main: mode === 'light' ? colors.light.background.secondary : colors.dark.background.secondary,
        },
        background: {
            default: mode === 'light' ? colors.light.background.default : colors.dark.background.default,
            paper: mode === 'light' ? colors.light.background.paper : colors.dark.background.paper,
        },
        text: {
            primary: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
            secondary: mode === 'light' ? colors.light.text.secondary : colors.dark.text.secondary,
            disabled: mode === 'light' ? colors.light.text.muted : colors.dark.text.muted,
        },
        divider: mode === 'light' ? colors.light.border.primary : colors.dark.border.primary,
        action: {
            hover: mode === 'light' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.15)',
        },
    },
    typography: {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: {
            fontSize: '2.25rem', // text-4xl
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '1.5rem', // text-2xl
            fontWeight: 600,
            lineHeight: 1.3,
            borderBottom: `1px solid ${mode === 'light' ? colors.light.border.primary : colors.dark.border.primary}`,
            paddingBottom: '0.5rem',
        },
        h3: {
            fontSize: '1.25rem', // text-xl
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: '1.125rem', // text-lg
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem', // text-base
            lineHeight: 1.7,
        },
        body2: {
            fontSize: '0.875rem', // text-sm
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollBehavior: 'smooth',
                    transition: 'background-color 250ms ease, color 250ms ease',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 9999, // radius-pill
                    textTransform: 'none',
                    padding: '0.75rem 1.5rem', // space-3 space-6
                },
                containedPrimary: {
                    boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)',
                    '&:hover': {
                        backgroundColor: colors.primary[600],
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(139, 92, 246, 0.45)',
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: mode === 'light' ? colors.light.link : colors.dark.link,
                    textDecoration: 'underline',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '2px',
                    transition: 'color 150ms ease, text-decoration-color 150ms ease',
                    '&:hover': {
                        color: mode === 'light' ? colors.primary[700] : colors.primary[600],
                        textDecorationThickness: '2px',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Disable elevation overlay in dark mode
                },
                rounded: {
                    borderRadius: 12, // radius-lg
                },
            },
        },
        // Add other component overrides as needed
    },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
