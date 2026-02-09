import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/mdx/CodeBlock';

export function ApiPage() {
    return (
        <>
            <h1 id="api-reference">API Reference</h1>
            <p>
                Complete reference for all CsvQuery classes and methods. CsvQuery provides a
                fluent, Yii2-style API for querying CSV files.
            </p>

            <h2 id="core-classes">Core Classes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Link to="/api/csvquery"><strong>CsvQuery</strong></Link></td>
                        <td>Main entry point - initialize, manage indexes, start queries</td>
                    </tr>
                    <tr>
                        <td><Link to="/api/activequery"><strong>ActiveQuery</strong></Link></td>
                        <td>Fluent query builder - conditions, sorting, limiting, execution</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="namespaces">Namespaces</h2>
            <table>
                <thead>
                    <tr>
                        <th>Namespace</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>Entreya\CsvQuery\Core</code></td>
                        <td>Entry point, CSV handling, index lifecycle</td>
                    </tr>
                    <tr>
                        <td><code>Entreya\CsvQuery\Query</code></td>
                        <td>Fluent API, condition building, execution</td>
                    </tr>
                    <tr>
                        <td><code>Entreya\CsvQuery\Bridge</code></td>
                        <td>Process management, IPC with Go binary</td>
                    </tr>
                    <tr>
                        <td><code>Entreya\CsvQuery\Models</code></td>
                        <td>Data representation, type casting</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="quick-example">Quick Example</h2>
            <CodeBlock className="language-php">
                {`use Entreya\\CsvQuery\\Core\\CsvQuery;

$csv = new CsvQuery('/path/to/data.csv');
$csv->createIndex(['STATUS']);

$results = $csv->find()
    ->where(['STATUS' => 'active'])
    ->limit(100)
    ->all();`}
            </CodeBlock>

            <h2 id="sections">API Sections</h2>
            <ul>
                <li><Link to="/api/csvquery">CsvQuery Class</Link> - Initialization and index management</li>
                <li><Link to="/api/activequery">ActiveQuery Class</Link> - Query building and execution</li>
                <li><Link to="/api/php/conditions">Condition Syntax</Link> - WHERE clause formats</li>
            </ul>
        </>
    );
}
