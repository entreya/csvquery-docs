import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import styles from './SearchModal.module.css';
import ArticleIcon from '@mui/icons-material/Article';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

const HISTORY_KEY = 'csvquery_search_history';
const MAX_HISTORY = 5;

export function SearchModal({ onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [history, setHistory] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedHistory = localStorage.getItem(HISTORY_KEY);
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory);
                // Sanitize history to ensure no invalid icon components cause crashes
                const sanitized = Array.isArray(parsed) ? parsed.map((item: any) => ({
                    ...item,
                    icon: undefined // Ensure icon is undefined
                })) : [];
                setHistory(sanitized);
            } catch (e) {
                console.error('Failed to parse search history', e);
                // If parsing fails, clear the corrupted history
                localStorage.removeItem(HISTORY_KEY);
            }
        }
    }, []);

    const addToHistory = (item: SearchResult) => {
        // Create a history item without the icon component (it can't be serialized)
        const historyItem = { ...item, icon: undefined };
        const newHistory = [historyItem, ...history.filter(h => h.href !== item.href)].slice(0, MAX_HISTORY);
        setHistory(newHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    };

    const removeFromHistory = (e: React.MouseEvent, href: string) => {
        e.stopPropagation();
        const newHistory = history.filter(h => h.href !== href);
        setHistory(newHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    }

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
            const currentList = results.length > 0 ? results : history;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentList.length > 0) {
                        setSelectedIndex(prev => Math.min(prev + 1, currentList.length - 1));
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentList.length > 0) {
                        setSelectedIndex(prev => Math.max(prev - 1, 0));
                    }
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (currentList[selectedIndex]) {
                        handleResultClick(currentList[selectedIndex]);
                    }
                    break;
            }
        },
        [results, history, selectedIndex, onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleResultClick = (item: SearchResult) => {
        addToHistory(item);
        navigate(item.href);
        onClose();
    };

    const renderBreadcrumbs = (path: { title: string }[]) => {
        if (path.length === 0) return null;

        return (
            <div className={styles.breadcrumbs}>
                {path.map((p, i) => (
                    <span key={i} className={styles.breadcrumbSegment}>
                        {i > 0 && <span className={styles.breadcrumbSeparator}>&gt;</span>}
                        {p.title}
                    </span>
                ))}
            </div>
        );
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
                        const ItemIcon = result.icon || ArticleIcon;

                        return (
                            <li key={result.href}>
                                <div
                                    className={`${styles.result} ${isSelected ? styles.selected : ''}`}
                                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                                    onClick={() => handleResultClick(result)}
                                >
                                    <div className={styles.resultIcon}>
                                        <ItemIcon />
                                    </div>
                                    <div className={styles.resultContent}>
                                        {renderBreadcrumbs(result.path)}
                                        <div className={styles.resultTitle}>{result.title}</div>
                                    </div>
                                    <div className={styles.enterIcon}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 10 4 15 9 20" />
                                            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        ));
    };

    const renderHistory = () => {
        if (history.length === 0 || query !== '') return null;

        return (
            <div className={styles.sectionGroup}>
                <div className={styles.sectionHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Recent Searches</span>
                    <button className={styles.clearHistoryButton} onClick={clearHistory}>Clear All</button>
                </div>
                <ul className={styles.resultsList}>
                    {history.map((result, index) => {
                        const isSelected = index === selectedIndex;
                        const ItemIcon = result.icon || HistoryIcon;

                        return (
                            <li key={result.href}>
                                <div
                                    className={`${styles.result} ${isSelected ? styles.selected : ''}`}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    onClick={() => handleResultClick(result)}
                                >
                                    <div className={styles.resultIcon}>
                                        <ItemIcon sx={{ color: 'text.secondary', opacity: 0.7 }} />
                                    </div>
                                    <div className={styles.resultContent}>
                                        {renderBreadcrumbs(result.path)}
                                        <div className={styles.resultTitle}>{result.title}</div>
                                    </div>
                                    <div
                                        className={styles.deleteHistoryIcon}
                                        onClick={(e) => removeFromHistory(e, result.href)}
                                        title="Remove from history"
                                    >
                                        <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }


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

                <div className={styles.resultsContainer}>
                    {renderHistory()}

                    {results.length > 0 && (
                        <div className={styles.results}>
                            {renderResults()}
                        </div>
                    )}
                </div>

                {query && results.length === 0 && (
                    <div className={styles.noResults}>No results found for "{query}"</div>
                )}

                {!query && history.length === 0 && (
                    <div className={styles.hints}>
                        <p>Start typing to search...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
