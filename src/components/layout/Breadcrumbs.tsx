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
        // Broad search in navigation
        let foundTitle: string | undefined;

        const search = (items: typeof navigation[0]['items']) => {
            for (const item of items) {
                if (item.href === path) {
                    foundTitle = item.title;
                    return;
                }
                if (item.items) {
                    search(item.items);
                    if (foundTitle) return;
                }
            }
        };

        for (const section of navigation) {
            if (section.items) search(section.items);
            if (foundTitle) return foundTitle;
        }

        // Fallback: capitalize
        const segments = path.split('/');
        const last = segments[segments.length - 1];
        return last ? last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ') : 'Page';
    };

    const crumbs = pathSegments.map((_, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const title = findTitle(path);

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
