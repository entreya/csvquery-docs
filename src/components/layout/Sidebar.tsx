import { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [openSections, setOpenSections] = useState<string[]>(
        navigation.map(n => n.title) // start all open
    );

    const location = useLocation();

    // Auto-expand logic based on active route
    useEffect(() => {
        navigation.forEach(section => {
            const hasActiveLink = section.items.some(item =>
                item.href === location.pathname || location.pathname.startsWith(item.href + '/')
            );

            if (hasActiveLink && !openSections.includes(section.title)) {
                setOpenSections(prev => [...prev, section.title]);
            }
        });
    }, [location.pathname]);

    const toggleSection = (title: string) => {
        setOpenSections(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className={styles.backdrop}
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
            >
                {/* Branding Header */}
                <div className={styles.branding}>
                    <Link to="/" className={styles.brandingLink}>
                        <img
                            src="/csvquery-docs/entreya-logo.png"
                            alt="entreya"
                            className={styles.brandingLogo}
                        />
                        <div className={styles.brandingText}>
                            {/* "entreya" text removed as requested */}
                            <span className={styles.libName}>csvquery</span>
                        </div>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    {navigation.map((section) => {
                        const isSectionOpen = openSections.includes(section.title);

                        return (
                            <div key={section.title} className={styles.section}>
                                <button
                                    className={styles.sectionHeader}
                                    onClick={() => toggleSection(section.title)}
                                    aria-expanded={isSectionOpen}
                                >
                                    <span className={styles.sectionTitle}>{section.title}</span>
                                    <svg
                                        className={`${styles.chevron} ${isSectionOpen ? styles.rotate : ''}`}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>

                                <div className={`${styles.sectionContent} ${isSectionOpen ? styles.show : ''}`}>
                                    <ul className={styles.list}>
                                        {section.items.map((item) => {
                                            return (
                                                <li key={item.href}>
                                                    <NavLink
                                                        to={item.href}
                                                        end={true}
                                                        className={({ isActive }) =>
                                                            `${styles.link} ${isActive ? styles.active : ''}`
                                                        }
                                                        onClick={() => {
                                                            // Close sidebar on mobile when link clicked
                                                            if (window.innerWidth < 1024) {
                                                                onClose();
                                                            }
                                                        }}
                                                    >
                                                        {item.title}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
