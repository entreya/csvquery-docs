import { useLocation, Link } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import styles from './Breadcrumbs.module.css';

export function Breadcrumbs() {
    const location = useLocation();
    const pathSegments = location.pathname
        .replace(/^\/csvquery-docs/, '') // Strip basename
        .split('/')
        .filter(Boolean);

    if (pathSegments.length === 0) return null;

    // Helper to find title for a segment/path
    const findTitle = (path: string) => {
        // Try to find in navigation
        for (const section of navigation) {
            for (const item of section.items) {
                if (item.href.endsWith(path)) return item.title;
            }
            if (section.title.toLowerCase().replace(/\s+/g, '-') === path) return section.title;
            // Also check if segment matches section title loosely
        }
        // Fallback: capitalize
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    };

    const crumbs = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const title = findTitle(segment);

        return (
            <li key={path} className={styles.item}>
                {index > 0 && <span className={styles.separator}>/</span>}
                {isLast ? (
                    <span className={styles.current} aria-current="page">
                        {title}
                    </span>
                ) : (
                    <Link to={path} className={styles.link}>
                        {title}
                    </Link>
                )}
            </li>
        );
    });

    return (
        <nav aria-label="Breadcrumb" className={styles.nav}>
            <ol className={styles.list}>
                {crumbs}
            </ol>
        </nav>
    );
}
