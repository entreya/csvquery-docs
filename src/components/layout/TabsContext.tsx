import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigation } from '../../lib/navigation';
import type { SvgIconComponent } from '@mui/icons-material';

// Define what a single segment in the breadcrumb looks like
interface BreadcrumbItem {
    title: string;
    path: string;
    icon?: SvgIconComponent;
}

// The "Tab" now represents the entire active context chain
export interface Tab {
    path: string;
    breadcrumbs: BreadcrumbItem[];
}

interface TabsContextType {
    tabs: Tab[]; // Can contain multiple open tabs
    activeTabPath: string | null;
    openTab: (path: string, title?: string) => void;
    navigateWithinTab: (fromTabPath: string, toPath: string) => void;
    closeTab: (path: string) => void;
    closeOtherTabs: (path: string) => void;
    closeAllTabs: () => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const normalize = (path: string) => {
    let p = path;
    if (p.startsWith('/csvquery-docs')) p = p.replace('/csvquery-docs', '');
    if (p.endsWith('/') && p.length > 1) p = p.slice(0, -1);
    return p || '/';
};

// Helper to find hierarchical chain
const findTabChain = (path: string): BreadcrumbItem[] => {
    const normPath = normalize(path);

    const search = (items: typeof navigation[0]['items'], currentChain: BreadcrumbItem[]): BreadcrumbItem[] | null => {
        for (const item of items) {
            const itemTab: BreadcrumbItem = {
                title: item.title,
                path: item.href || '',
                icon: item.icon
            };

            // Check if this item matches
            if (item.href && normalize(item.href) === normPath) {
                return [...currentChain, itemTab];
            }

            // Check children
            if (item.items) {
                // Always include parent in the chain for visual hierarchy (notch pattern)
                // TabsBar will handle making them non-clickable if they don't have a path
                const nextChain = [...currentChain, itemTab];
                const found = search(item.items, nextChain);
                if (found) return found;
            }
        }
        return null;
    };

    for (const section of navigation) {
        const found = search(section.items, []);
        if (found) return found;
    }

    // Fallback logic for paths not in navigation
    if (normPath === '/' || normPath === '') {
        return [{ title: 'Introduction', path: '/', icon: undefined }];
    }

    const segments = normPath.split('/');
    const last = segments[segments.length - 1];
    const title = last ? last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ') : 'Page';

    return [{ title, path, icon: undefined }];
};

export function TabsProvider({ children }: { children: ReactNode }) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Auto-open tab for current location (Multi-Tab Mode with Breadcrumbs)
    useEffect(() => {
        const path = normalize(location.pathname);
        const chain = findTabChain(path);

        setTabs((prev) => {
            // Check if this exact path already exists
            const existingIndex = prev.findIndex(t => normalize(t.path) === path);

            if (existingIndex !== -1) {
                // Update existing tab's breadcrumbs if needed
                const updated = [...prev];
                updated[existingIndex] = { path: location.pathname, breadcrumbs: chain };
                return updated;
            }

            // Check for sibling navigation (same parent)
            // A sibling shares the same parent breadcrumb chain (all but last item)
            const parentChain = chain.slice(0, -1);

            if (parentChain.length > 0) {
                const siblingIndex = prev.findIndex(t => {
                    const tabParentChain = t.breadcrumbs.slice(0, -1);
                    if (tabParentChain.length !== parentChain.length) return false;
                    return tabParentChain.every((item, i) => item.title === parentChain[i].title);
                });

                if (siblingIndex !== -1) {
                    // Replace sibling tab with new path
                    const updated = [...prev];
                    updated[siblingIndex] = { path: location.pathname, breadcrumbs: chain };
                    return updated;
                }
            }

            // No existing or sibling tab - add new tab
            return [...prev, { path: location.pathname, breadcrumbs: chain }];
        });
    }, [location.pathname]);

    // Active tab path should effectively just be current location

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const openTab = useCallback((path: string, _title?: string) => {
        navigate(path);
    }, [navigate]);

    // Navigate within the same tab (for breadcrumb clicks)
    // This replaces the current tab's path instead of adding a new tab
    const navigateWithinTab = useCallback((fromTabPath: string, toPath: string) => {
        setTabs(prev => {
            const tabIndex = prev.findIndex(t => t.path === fromTabPath);
            if (tabIndex !== -1) {
                // Remove the current tab, the useEffect will add the new one
                const updated = [...prev];
                updated.splice(tabIndex, 1);
                return updated;
            }
            return prev;
        });
        navigate(toPath);
    }, [navigate]);

    const closeTab = useCallback((pathToClose: string) => {
        setTabs(prev => {
            const newTabs = prev.filter(t => t.path !== pathToClose);

            // If we closed the active tab, navigate to the last remaining tab, or home
            if (pathToClose === location.pathname) {
                if (newTabs.length > 0) {
                    navigate(newTabs[newTabs.length - 1].path);
                } else {
                    navigate('/');
                }
            }
            return newTabs;
        });
    }, [location.pathname, navigate]);

    const closeOtherTabs = useCallback(() => { }, []); // No-op

    const closeAllTabs = useCallback(() => {
        setTabs([]);
        navigate('/'); // Navigate to home when closing all
    }, [navigate]);

    return (
        <TabsContext.Provider value={{
            tabs,
            activeTabPath: location.pathname,
            openTab,
            navigateWithinTab,
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
