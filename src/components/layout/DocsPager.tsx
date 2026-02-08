import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import styles from './DocsPager.module.css';

export function DocsPager() {
    const location = useLocation();

    // Flatten navigation to find next/prev
    const flatNav = navigation.flatMap(section => section.items);
    const currentIndex = flatNav.findIndex(item => item.href === location.pathname);

    if (currentIndex === -1) return null;

    const prev = flatNav[currentIndex - 1];
    const next = flatNav[currentIndex + 1];

    if (!prev && !next) return null;

    return (
        <div className={styles.container}>
            {prev ? (
                <Link to={prev.href} className={`${styles.link} ${styles.prev}`}>
                    <span className={styles.label}>Previous</span>
                    <span className={styles.title}>&larr; {prev.title}</span>
                </Link>
            ) : <div />}

            {next && (
                <Link to={next.href} className={`${styles.link} ${styles.next}`}>
                    <span className={styles.label}>Next</span>
                    <span className={styles.title}>{next.title} &rarr;</span>
                </Link>
            )}
        </div>
    );
}
