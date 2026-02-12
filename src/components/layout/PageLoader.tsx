import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress (optional: hide spinner)
nprogress.configure({ showSpinner: false });

// Global cache to track visited pages (persists across re-renders but resets on refresh)
// We could use sessionStorage for persistence across refreshes if desired.
const visitedPages = new Set<string>();

export function PageLoader() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        // If page is already visited/cached, do NOT show progress bar
        if (visitedPages.has(path)) {
            return;
        }

        // Add a delay before showing the progress bar
        // This prevents the bar from flashing on fast loads (e.g. from disk cache or quick network)
        const timer = setTimeout(() => {
            nprogress.start();
        }, 500); // 500ms delay

        // Set a timeout to reload the page if it hangs for too long (e.g., 15 seconds)
        const crashTimeout = setTimeout(() => {
            console.warn('Page load timeout. Reloading...');
            window.location.reload();
        }, 15000);

        // Cleanup: finish or cancel progress bar
        return () => {
            clearTimeout(timer);
            clearTimeout(crashTimeout);

            // If nprogress started, finish it
            if (nprogress.isStarted()) {
                nprogress.done();
                // Mark this page as visited only if it actually took long enough to load
                visitedPages.add(path);
            }
        };
    }, [location.pathname]);

    // Return a minimal or empty UI, as the progress bar is at the top of the window
    return null;
}
