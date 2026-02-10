import { useEffect } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress (optional: hide spinner)
nprogress.configure({ showSpinner: false });

export function PageLoader() {
    useEffect(() => {
        // Start the progress bar when the component mounts (loading starts)
        nprogress.start();

        // Set a timeout to reload the page if it hangs for too long (e.g., 15 seconds)
        const timeoutMsg = setTimeout(() => {
            console.warn('Page load timeout. Reloading...');
            window.location.reload();
        }, 3000);

        // Cleanup: finish progress bar when component unmounts (loading finishes)
        return () => {
            clearTimeout(timeoutMsg);
            nprogress.done();
        };
    }, []);

    // Return a minimal or empty UI, as the progress bar is at the top of the window
    return null;
}
