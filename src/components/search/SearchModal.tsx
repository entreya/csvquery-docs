import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import styles from './SearchModal.module.css';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import type { SvgIconComponent } from '@mui/icons-material';

interface SearchModalProps {
    onClose: () => void;
}

interface SearchResult {
    title: string;
    href: string;
    section: string;
    path: { title: string; href?: string }[];
    icon?: SvgIconComponent;
}

export function SearchModal({ onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Build searchable items from navigation
    const searchItems: SearchResult[] = useMemo(() => {
        const items: SearchResult[] = [];

        function recurse(navItems: import('../../lib/navigation').NavItem[], parentPath: { title: string; href?: string }[]) {
            for (const item of navItems) {
                if (item.href) {
                    items.push({
                        title: item.title,
                        href: item.href,
                        section: parentPath[0]?.title || 'Uncategorized',
                        path: parentPath,
                        icon: item.icon,
                    });
                }
                if (item.items) {
                    recurse(item.items, [...parentPath, { title: item.title, href: item.href }]);
                }
            }
        }

        navigation.forEach(section => {
            recurse(section.items, [{ title: section.title }]);
        });

        return items;
    }, []);

    // Filter results based on query
    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = searchItems.filter(
            item =>
                item.title.toLowerCase().includes(lowerQuery) ||
                item.section.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
        setSelectedIndex(0);
    }, [query, searchItems]);

    // Group results by section
    const groupedResults = useMemo(() => {
        const groups: Record<string, SearchResult[]> = {};
        results.forEach(result => {
            if (!groups[result.section]) {
                groups[result.section] = [];
            }
            groups[result.section].push(result);
        });
        return groups;
    }, [results]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (results[selectedIndex]) {
                        navigate(results[selectedIndex].href);
                        onClose();
                    }
                    break;
            }
        },
        [results, selectedIndex, navigate, onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleResultClick = (href: string) => {
        navigate(href);
        onClose();
    };

    const renderResults = () => {
        let globalIndex = 0;
        return Object.entries(groupedResults).map(([section, items]) => (
            <div key={section} className={styles.sectionGroup}>
                <div className={styles.sectionHeader}>{section}</div>
                <ul className={styles.resultsList}>
                    {items.map(result => {
                        const currentIndex = globalIndex++;
                        const isSelected = currentIndex === selectedIndex;

                        // Build tree items: path segments + final result
                        const treeItems = [
                            ...result.path.slice(1), // Skip section (already shown as header)
                            { title: result.title, href: result.href, icon: result.icon }
                        ];

                        return (
                            <li key={result.href}>
                                <div
                                    className={`${styles.result} ${isSelected ? styles.selected : ''}`}
                                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                                >
                                    <div className={styles.treeView}>
                                        {treeItems.map((item, depth) => {
                                            const isLast = depth === treeItems.length - 1;
                                            const ItemIcon = (item as any).icon || ArticleIcon;

                                            return (
                                                <div
                                                    key={depth}
                                                    className={styles.treeLine}
                                                    style={{ paddingLeft: depth * 16 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (item.href) {
                                                            handleResultClick(item.href);
                                                        }
                                                    }}
                                                >
                                                    <span className={styles.treeConnector}>
                                                        {depth > 0 ? (isLast ? '└─' : '├─') : ''}
                                                    </span>
                                                    {depth === 0 && !isLast && <AccountTreeTwoToneIcon sx={{ fontSize: 14, mr: 0.5, opacity: 0.6 }} />}
                                                    {isLast && <ItemIcon sx={{ fontSize: 16, mr: 0.75, color: 'primary.main' }} />}
                                                    <span className={`${styles.treeLabel} ${isLast ? styles.treeLabelMain : ''} ${item.href ? styles.treeClickable : ''}`}>
                                                        {item.title}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        ));
    };


    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.inputWrapper}>
                    <svg
                        className={styles.searchIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        placeholder="Search documentation..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <kbd className={styles.kbd}>ESC</kbd>
                </div>

                {results.length > 0 && (
                    <div className={styles.results}>
                        {renderResults()}
                    </div>
                )}

                {query && results.length === 0 && (
                    <div className={styles.noResults}>No results found for "{query}"</div>
                )}

                {!query && (
                    <div className={styles.hints}>
                        <p>Start typing to search...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
