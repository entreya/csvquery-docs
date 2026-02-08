export interface NavItem {
    title: string;
    href: string;
    items?: NavItem[];
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navigation: NavSection[] = [
    {
        title: 'Introduction',
        items: [
            { title: 'Overview', href: '/getting-started' },
        ],
    },
    {
        title: 'Getting Started',
        items: [
            { title: 'Installation', href: '/getting-started/installation' },
            { title: 'Quick Start', href: '/getting-started/quick-start' },
            { title: 'Examples', href: '/getting-started/examples' },
            { title: 'System Requirements', href: '/getting-started/requirements' },
        ],
    },
    {
        title: 'API Reference',
        items: [
            { title: 'Overview', href: '/api' },
            { title: 'CsvQuery Class', href: '/api/csvquery' },
            { title: 'ActiveQuery Class', href: '/api/activequery' },
            { title: 'Condition Syntax', href: '/api/conditions' },
            // Removed Internal Reference
        ],
    },
    {
        title: 'Architecture',
        items: [
            { title: 'Overview', href: '/architecture' },
            { title: 'PHP Layer', href: '/architecture/php-layer' },
            { title: 'Go Engine', href: '/architecture/go-engine' },
            { title: 'Communication', href: '/architecture/communication' },
        ],
    },
    {
        title: 'Benchmarks',
        items: [
            { title: 'Overview', href: '/benchmarks' },
            { title: 'Performance Tests', href: '/benchmarks/performance' },
            { title: 'Comparisons', href: '/benchmarks/comparisons' },
        ],
    },
];

export const mainNavItems = [
    { title: 'Getting Started', href: '/getting-started' },
    { title: 'API', href: '/api' },
    { title: 'Architecture', href: '/architecture' },
    { title: 'Benchmarks', href: '/benchmarks' },
];
