import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigation } from '../../lib/navigation';

interface Tab {
    path: string;
    title: string;
}

interface TabsContextType {
    tabs: Tab[];
    activeTabPath: string | null;
    openTab: (path: string, title?: string) => void;
    closeTab: (path: string) => void;
    closeOtherTabs: (path: string) => void;
    closeAllTabs: () => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Helper to remove trailing slashes and basename
const normalize = (path: string) => {
    let p = path;
    if (p.startsWith('/csvquery-docs')) p = p.replace('/csvquery-docs', '');
    if (p.endsWith('/') && p.length > 1) p = p.slice(0, -1);
    return p || '/';
};

// Helper to find title from navigation
const findTitle = (path: string): string => {
    const normPath = normalize(path);
    for (const section of navigation) {
        for (const item of section.items) {
            if (normalize(item.href) === normPath) {
                return item.title;
            }
        }
    }
    // Fallback for known paths
    if (normPath === '/' || normPath === '') return 'Introduction';
    // Fallback to capitalizing last segment
    const segments = normPath.split('/');
    const last = segments[segments.length - 1];
    return last ? last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ') : 'Page';
};

export function TabsProvider({ children }: { children: ReactNode }) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Auto-open tab for current location
    useEffect(() => {
        const path = normalize(location.pathname);
        setTabs((prev) => {
            // Check if tab exists
            if (prev.some(t => normalize(t.path) === path)) {
                return prev;
            }
            // Add new tab
            const title = findTitle(path);
            return [...prev, { path: location.pathname, title }];
        });
    }, [location.pathname]);

    // Added title to callback but ignoring it for now to silence unused var
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const openTab = useCallback((path: string, _title?: string) => {
        navigate(path);
        // The useEffect will handle adding the tab
    }, [navigate]);

    const closeTab = useCallback((path: string) => {
        setTabs(prev => {
            const newTabs = prev.filter(t => t.path !== path);

            // If we closed the active tab, navigate to the last remaining tab, or home
            if (path === location.pathname) {
                if (newTabs.length > 0) {
                    navigate(newTabs[newTabs.length - 1].path);
                } else {
                    navigate('/'); // Navigate to home if all tabs closed
                }
            }
            return newTabs;
        });
    }, [location.pathname, navigate]);

    const closeOtherTabs = useCallback((path: string) => {
        setTabs(prev => prev.filter(t => t.path === path));
        if (path !== location.pathname) {
            navigate(path);
        }
    }, [location.pathname, navigate]);

    const closeAllTabs = useCallback(() => {
        setTabs([]);
        navigate('/'); // Navigate to home when closing all
    }, [navigate]);

    return (
        <TabsContext.Provider value={{
            tabs,
            activeTabPath: location.pathname,
            openTab,
            closeTab,
            closeOtherTabs,
            closeAllTabs
        }}>
            {children}
        </TabsContext.Provider>
    );
}

export function useTabs() {
    const context = useContext(TabsContext);
    if (context === undefined) {
        throw new Error('useTabs must be used within a TabsProvider');
    }
    return context;
}
