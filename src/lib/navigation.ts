import type { SvgIconComponent } from '@mui/icons-material';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import WebhookTwoToneIcon from '@mui/icons-material/WebhookTwoTone';
import DataObjectTwoToneIcon from '@mui/icons-material/DataObjectTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import ViewColumnTwoToneIcon from '@mui/icons-material/ViewColumnTwoTone';
import SquareTwoToneIcon from '@mui/icons-material/SquareTwoTone';
import TerminalTwoToneIcon from '@mui/icons-material/TerminalTwoTone';
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
import DnsTwoToneIcon from '@mui/icons-material/DnsTwoTone';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import CompareArrowsTwoToneIcon from '@mui/icons-material/CompareArrowsTwoTone';
import ScienceTwoToneIcon from '@mui/icons-material/ScienceTwoTone';

export interface NavItem {
    title: string;
    href?: string;
    items?: NavItem[];
    icon?: SvgIconComponent;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navigation: NavSection[] = [
    {
        title: 'Introduction',
        items: [
            { title: 'Overview', href: '/getting-started', icon: DescriptionTwoToneIcon },
        ],
    },
    {
        title: 'Getting Started',
        items: [
            { title: 'Installation', href: '/getting-started/installation', icon: DownloadTwoToneIcon },
            { title: 'Quick Start', href: '/getting-started/quick-start', icon: RocketLaunchTwoToneIcon },
            { title: 'Examples', href: '/getting-started/examples', icon: CodeTwoToneIcon },
            { title: 'System Requirements', href: '/getting-started/requirements', icon: SettingsTwoToneIcon },
        ],
    },
    {
        title: 'API Reference',
        items: [
            { title: 'Overview', href: '/api', icon: WebhookTwoToneIcon },
            {
                title: 'PHP SDK',
                icon: DataObjectTwoToneIcon,
                items: [
                    { title: 'CsvQuery', href: '/api/php/csvquery', icon: CodeTwoToneIcon },
                    { title: 'ActiveQuery', href: '/api/php/activequery', icon: CodeTwoToneIcon },
                    { title: 'Command', href: '/api/php/command', icon: TerminalTwoToneIcon },
                    { title: 'GoBridge', href: '/api/php/gobridge', icon: LayersTwoToneIcon },
                    { title: 'SocketClient', href: '/api/php/socketclient', icon: DnsTwoToneIcon },
                    { title: 'DaemonManager', href: '/api/php/daemon-manager', icon: SettingsTwoToneIcon },
                    {
                        title: 'Models',
                        icon: TableChartTwoToneIcon,
                        items: [
                            { title: 'Row', href: '/api/php/models-row', icon: TableRowsTwoToneIcon },
                            { title: 'Column', href: '/api/php/models-column', icon: ViewColumnTwoToneIcon },
                            { title: 'Cell', href: '/api/php/models-cell', icon: SquareTwoToneIcon },
                        ]
                    },
                    { title: 'Condition Syntax', href: '/api/php/conditions', icon: FilterListTwoToneIcon },
                ]
            },
            {
                title: 'Go Engine',
                icon: TerminalTwoToneIcon,
                items: [
                    { title: 'CLI Commands', href: '/api/go/cli', icon: TerminalTwoToneIcon },
                    { title: 'Query Engine', href: '/api/go/query-engine', icon: ManageSearchTwoToneIcon },
                    { title: 'Indexer', href: '/api/go/indexer', icon: StorageTwoToneIcon },
                    { title: 'Scanner', href: '/api/go/scanner', icon: DocumentScannerTwoToneIcon },
                    { title: 'Daemon', href: '/api/go/daemon', icon: DnsTwoToneIcon },
                    { title: 'SIMD', href: '/api/go/simd', icon: SpeedTwoToneIcon },
                    { title: 'Bloom Filter', href: '/api/go/bloom-filter', icon: FilterListTwoToneIcon },
                    { title: 'CIDX Format', href: '/api/go/cidx-format', icon: StorageTwoToneIcon },
                    { title: 'Index Record', href: '/api/go/index-record', icon: TableRowsTwoToneIcon },
                ]
            },

        ],
    },
    {
        title: 'Internals',
        items: [
            { title: 'Architecture Overview', href: '/internals/architecture-overview', icon: AccountTreeTwoToneIcon },
            { title: 'Data Flow', href: '/internals/data-flow', icon: CompareArrowsTwoToneIcon },
            { title: 'Debug Mode', href: '/internals/debug-mode', icon: ScienceTwoToneIcon },
        ],
    },
    {
        title: 'Benchmarks',
        items: [
            { title: 'Overview', href: '/benchmarks', icon: BarChartTwoToneIcon },
            { title: 'Performance Tests', href: '/benchmarks/performance', icon: SpeedTwoToneIcon },
            { title: 'Comparisons', href: '/benchmarks/comparisons', icon: CompareArrowsTwoToneIcon },
        ],
    },
    {
        title: 'Experimental',
        items: [
            { title: 'Playground', href: '/experimental', icon: ScienceTwoToneIcon },
        ],
    },
    {
        title: 'Roadmap',
        items: [
            { title: 'Feature Roadmap', href: '/roadmap', icon: MapTwoToneIcon },
        ]
    },
];

export const mainNavItems = [
    { title: 'Getting Started', href: '/getting-started' },
    { title: 'API', href: '/api' },
    { title: 'Architecture', href: '/architecture' },
    { title: 'Benchmarks', href: '/benchmarks' },
];

export interface FlatNavItem {
    title: string;
    href: string;
    path: string[];
}

export function getFlattenedNavItems(): FlatNavItem[] {
    const flat: FlatNavItem[] = [];

    function recurse(items: NavItem[], parentPath: string[]) {
        for (const item of items) {
            // Don't add current item title to path for itself, or do? 
            // Usually "Parent > Child". So path should be parents.

            if (item.href) {
                flat.push({
                    title: item.title,
                    href: item.href,
                    path: parentPath
                });
            }
            if (item.items) {
                recurse(item.items, [...parentPath, item.title]);
            }
        }
    }

    for (const section of navigation) {
        recurse(section.items, [section.title]);
    }

    return flat;
}
