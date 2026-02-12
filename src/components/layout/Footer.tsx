import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <span className={styles.logo}>
                        <img
                            src="/csvquery-docs/entreya-logo-final.png"
                            alt="entreya"
                            className={styles.logoIcon}
                        />
                        <span className={styles.orgName}>entreya</span>
                        <span className={styles.separator}>/</span>
                        <span className={styles.libName}>csvquery</span>
                    </span>
                    <span className={styles.copyright}>© {new Date().getFullYear()} MIT License</span>
                </div>
                <div className={styles.links}>
                    <a href="https://github.com/entreya/csvquery" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        GitHub
                    </a>
                    <a href="https://github.com/entreya/csvquery/issues" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        Issues
                    </a>
                    <a href="https://github.com/entreya/csvquery/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        Contributing
                    </a>
                </div>
            </div>
        </footer>
    );
}
