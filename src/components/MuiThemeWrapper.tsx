import { type ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '../hooks/useTheme';
import { lightTheme, darkTheme } from '../theme/muiTheme';

export const MuiThemeWrapper = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();

    const muiTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};
