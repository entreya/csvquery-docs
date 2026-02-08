import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll window
        window.scrollTo(0, 0);

        // Also try to scroll the main content area if it's independently scrolling
        // (Though current layout uses window scroll, this is safe backup)
        const main = document.getElementById('main-content');
        if (main) {
            main.scrollTop = 0;
        }
    }, [pathname]);

    return null;
}
