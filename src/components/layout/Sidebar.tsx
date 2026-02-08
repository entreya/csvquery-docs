import { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

// Recursive Nav Item Component
function SidebarItem({ item, onClose }: { item: import('../../lib/navigation').NavItem, onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Auto-expand if active child
    useEffect(() => {
        if (item.items) {
            const hasActiveChild = item.items.some(child =>
                (child.href && location.pathname === child.href) ||
                (child.items && child.items.some(grandChild => grandChild.href === location.pathname))
            );
            if (hasActiveChild) {
                setIsOpen(true);
            }
        }
    }, [location.pathname, item.items]);

    if (item.items) {
        return (
            <li className={styles.nestedGroup}>
                <button
                    className={styles.nestedHeader}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    <span className={styles.nestedTitle}>{item.title}</span>
                    <svg
                        className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                {isOpen && (
                    <ul className={styles.nestedList}>
                        {item.items.map(subItem => (
                            <SidebarItem key={subItem.title} item={subItem} onClose={onClose} />
                        ))}
                    </ul>
                )}
            </li>
        );
    }

    if (!item.href) return null;

    return (
        <li>
            <NavLink
                to={item.href}
                end={true}
                className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                }
                onClick={() => {
                    if (window.innerWidth < 1024) {
                        onClose();
                    }
                }}
            >
                {item.title}
            </NavLink>
        </li>
    );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [openSections, setOpenSections] = useState<string[]>(
        navigation.map(n => n.title) // start all open
    );

    const location = useLocation();

    // Auto-expand logic based on active route
    useEffect(() => {
        navigation.forEach(section => {
            const hasActiveLink = section.items.some(item => {
                if (item.href === location.pathname) return true;
                if (item.items) {
                    // Check children
                    return item.items.some(child => child.href === location.pathname || (child.items && child.items.some(g => g.href === location.pathname)));
                }
                return false;
            });

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
                                        {section.items.map((item) => (
                                            <SidebarItem key={item.title} item={item} onClose={onClose} />
                                        ))}
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
