export interface NavItem {
    title: string;
    href?: string;
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
            {
                title: 'PHP SDK',
                items: [
                    { title: 'CsvQuery', href: '/api/php/csvquery' },
                    { title: 'ActiveQuery', href: '/api/php/activequery' },
                    { title: 'Command', href: '/api/php/command' },
                    { title: 'GoBridge', href: '/api/php/gobridge' },
                    { title: 'SocketClient', href: '/api/php/socketclient' },
                    {
                        title: 'Models',
                        items: [
                            { title: 'Row', href: '/api/php/models-row' },
                            { title: 'Column', href: '/api/php/models-column' },
                            { title: 'Cell', href: '/api/php/models-cell' },
                        ]
                    }
                ]
            },
            {
                title: 'Go Engine',
                items: [
                    { title: 'CLI Commands', href: '/api/go/cli' },
                    { title: 'Query Engine', href: '/api/go/query-engine' },
                    { title: 'Indexer', href: '/api/go/indexer' },
                    { title: 'Scanner', href: '/api/go/scanner' },
                    { title: 'Daemon', href: '/api/go/daemon' },
                ]
            },
            { title: 'Condition Syntax', href: '/api/conditions' },
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

export function getFlattenedNavItems(): { title: string, href: string }[] {
    const flat: { title: string, href: string }[] = [];

    function recurse(items: NavItem[]) {
        for (const item of items) {
            if (item.href) {
                flat.push({ title: item.title, href: item.href });
            }
            if (item.items) {
                recurse(item.items);
            }
        }
    }

    for (const section of navigation) {
        recurse(section.items);
    }

    return flat;
}
