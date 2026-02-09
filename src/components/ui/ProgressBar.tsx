import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, speed: 400 });

interface ProgressBarProps {
    timeoutMs?: number; // Timeout in ms before forcing reload
}

export function ProgressBar({ timeoutMs = 5000 }: ProgressBarProps) {
    const location = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        // Start progress bar on location change
        NProgress.start();

        // Safety timeout to force reload if SPA navigation hangs
        const timer = setTimeout(() => {
            if (NProgress.isStarted()) {
                console.warn(`Navigation timed out after ${timeoutMs}ms. Reloading page...`);
                window.location.reload();
            }
        }, timeoutMs);

        // Stop progress bar after a short delay to simulate completion (since we don't have real async route loading events easily accessible in v6 without data routers)
        // In a real data router app, we'd use useNavigation().state
        const stopTimer = setTimeout(() => {
            NProgress.done();
            clearTimeout(timer);
        }, 300); // Artificial delay to make the bar visible

        return () => {
            clearTimeout(timer);
            clearTimeout(stopTimer);
            NProgress.done();
        };
    }, [location.pathname, location.search, navType, timeoutMs]);

    return null;
}
