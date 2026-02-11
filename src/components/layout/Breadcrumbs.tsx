import { Link } from 'react-router-dom';
import { useTabs } from './TabsContext';
import styles from './Breadcrumbs.module.css';

export function Breadcrumbs() {
    const { tabs, activeTabPath } = useTabs();

    // Find the active tab to get its breadcrumbs
    const activeTab = tabs.find(t => t.path === activeTabPath);

    if (!activeTab || !activeTab.breadcrumbs || activeTab.breadcrumbs.length === 0) return null;

    const crumbs = activeTab.breadcrumbs.map((crumb, index) => {
        const isLast = index === activeTab.breadcrumbs.length - 1;
        const Icon = crumb.icon || undefined; // Or a default icon if needed

        return (
            <li key={crumb.path + index} className={styles.item} title={crumb.title}>
                {/* Content */}
                {(isLast || !crumb.path) ? (
                    <span className={styles.current} aria-current={isLast ? "page" : undefined}>
                        {Icon && <Icon />}
                        {crumb.title}
                    </span>
                ) : (
                    <Link to={crumb.path} className={styles.link}>
                        {Icon && <Icon />}
                        {crumb.title}
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
