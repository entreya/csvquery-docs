import { CodeBlock } from '../components/mdx/CodeBlock';

export function PhpLayerPage() {
    return (
        <>
            <h1 id="php-layer">PHP Layer</h1>
            <p>
                The PHP layer provides the fluent API and handles communication with the Go engine.
            </p>

            <h2 id="module-structure">Module Structure</h2>
            <CodeBlock className="language-text">
                {`src/php/
├── Core/                     # Entry point
│   └── CsvQuery.php          # Main class, index management
├── Query/                    # Query building
│   ├── ActiveQuery.php       # Fluent interface, conditions
│   └── Command.php           # SQL-like debug output
├── Bridge/                   # Go communication
│   ├── GoBridge.php          # Binary wrapper, process spawning
│   └── SocketClient.php      # Unix socket daemon client
└── Models/                   # Data wrappers
    ├── Row.php               # Row object with ArrayAccess
    ├── Cell.php              # Cell value wrapper
    └── Column.php            # Column metadata`}
            </CodeBlock>

            <h2 id="responsibilities">Module Responsibilities</h2>
            <table>
                <thead>
                    <tr><th>Module</th><th>Purpose</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Core</strong></td><td>Entry point, CSV handling, index lifecycle</td></tr>
                    <tr><td><strong>Query</strong></td><td>Fluent API, condition building, execution</td></tr>
                    <tr><td><strong>Bridge</strong></td><td>Process management, IPC with Go binary</td></tr>
                    <tr><td><strong>Models</strong></td><td>Data representation, type casting</td></tr>
                </tbody>
            </table>

            <h2 id="imports">Import Syntax</h2>
            <CodeBlock className="language-php">
                {`use Entreya\\CsvQuery\\Core\\CsvQuery;
use Entreya\\CsvQuery\\Query\\ActiveQuery;
use Entreya\\CsvQuery\\Bridge\\GoBridge;
use Entreya\\CsvQuery\\Models\\Row;`}
            </CodeBlock>

            <h2 id="query-flow">Query Flow</h2>
            <ol>
                <li>User calls <code>$csv-&gt;find()-&gt;where(...)</code></li>
                <li>ActiveQuery builds condition structure</li>
                <li>GoBridge serializes to JSON and sends to Go daemon</li>
                <li>Go engine returns matching row offsets</li>
                <li>PHP reads actual rows from CSV at returned offsets</li>
                <li>Results hydrated into Row objects (or arrays)</li>
            </ol>

            <h2 id="socket-client">Socket Client</h2>
            <p>
                The SocketClient maintains a persistent connection to the Go daemon for
                sub-millisecond query latency:
            </p>
            <CodeBlock className="language-php">
                {`// Connection is established automatically on first query
// and reused for subsequent queries

$csv->find()->where(['ID' => '123'])->one();  // ~1-2ms
$csv->find()->where(['ID' => '456'])->one();  // ~1-2ms (reuses connection)`}
            </CodeBlock>
        </>
    );
}
