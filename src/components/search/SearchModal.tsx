import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import styles from './SearchModal.module.css';

interface SearchModalProps {
    onClose: () => void;
}

interface SearchResult {
    title: string;
    href: string;
    section: string;
}

export function SearchModal({ onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Build searchable items from navigation
    const searchItems: SearchResult[] = useMemo(() => navigation.flatMap(section =>
        section.items.map(item => ({
            title: item.title,
            href: item.href,
            section: section.title,
        }))
    ), []);

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

    // Group results by section for Tree View
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

    // Flatten filtered results for keyboard navigation index
    // We need to know which absolute index corresponds to which item in the grouped view
    // But honestly, for simple navigation, we can just keep 'results' flat list for index state
    // and map the index to the click handler.

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

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleResultClick = (href: string) => {
        navigate(href);
        onClose();
    };

    // Helper to render the tree of results
    const renderResults = () => {
        let globalIndex = 0;
        return Object.entries(groupedResults).map(([section, items]) => (
            <div key={section} className={styles.sectionGroup}>
                <div className={styles.sectionHeader}>{section}</div>
                <ul className={styles.resultsList}>
                    {items.map(result => {
                        const currentIndex = globalIndex++;
                        const isSelected = currentIndex === selectedIndex;
                        return (
                            <li key={result.href}>
                                <button
                                    className={`${styles.result} ${isSelected ? styles.selected : ''}`}
                                    onClick={() => handleResultClick(result.href)}
                                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                                >
                                    <span className={styles.resultTitle}>{result.title}</span>
                                    {isSelected && <span className={styles.resultEnter}>&crarr;</span>}
                                </button>
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
