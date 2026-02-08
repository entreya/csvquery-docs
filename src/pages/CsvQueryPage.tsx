import { CodeBlock } from '../components/mdx/CodeBlock';

export function CsvQueryPage() {
    return (
        <div className="prose">
            <h1>CsvQuery Class</h1>
            <p className="lead">
                The <code>CsvQuery</code> class is the main entry point for the library. It handles file operations,
                index management, and initiates queries.
            </p>

            <h2>Constructor</h2>
            <CodeBlock language="php" code={`
public function __construct(string $csvPath, array $options = [])
            `} />
            <p>
                Initializes a new CsvQuery instance.
            </p>
            <ul>
                <li><strong>$csvPath</strong>: Absolute or relative path to the CSV file.</li>
                <li><strong>$options</strong>: Configuration array.
                    <ul>
                        <li><code>indexDir</code>: Directory to store index files (default: same as CSV).</li>
                        <li><code>separator</code>: CS separator character (default: <code>,</code>).</li>
                        <li><code>workers</code>: Number of parallel indexing workers (default: CPU count).</li>
                        <li><code>memoryMB</code>: Memory limit per worker in MB (default: 500).</li>
                    </ul>
                </li>
            </ul>

            <h3>Example</h3>
            <CodeBlock language="php" code={`
use Entreya\\CsvQuery\\Core\\CsvQuery;

$csv = new CsvQuery('data/users.csv', [
    'indexDir' => 'data/indexes',
    'workers' => 4
]);
            `} />

            <h2>Index Management</h2>

            <h3>createIndex</h3>
            <CodeBlock language="php" code={`
public function createIndex(array $columns, bool $verbose = false, array $options = []): bool
            `} />
            <p>
                Creates one or more indexes. Supporting single-column and composite indexes.
            </p>
            <CodeBlock language="php" code={`
// Single column index
$csv->createIndex(['email']);

// Multiple single-column indexes
$csv->createIndex(['email', 'status']);

// Composite index (email + status)
$csv->createIndex([['email', 'status']]);

// Mixed
$csv->createIndex(['id', ['last_name', 'first_name']]);
            `} />

            <h3>hasIndex</h3>
            <CodeBlock language="php" code={`
public function hasIndex(string|array $column): bool
            `} />
            <p>Checks if an index exists for the specified column(s).</p>

            <h3>validateIntegrity</h3>
            <CodeBlock language="php" code={`
public function validateIntegrity(): bool
            `} />
            <p>
                Verifies that the existing indexes match the current CSV file using file size, modification time, and a cryptographic sampling hash.
                Returns <code>false</code> if the CSV has been modified since indexing.
            </p>

            <h2>Querying</h2>

            <h3>find</h3>
            <CodeBlock language="php" code={`
public function find(): ActiveQuery
            `} />
            <p>Returns a new <code>ActiveQuery</code> instance for building a query.</p>

            <h3>where</h3>
            <CodeBlock language="php" code={`
public function where(string|array $column, mixed $value = null): ActiveQuery
            `} />
            <p>Shortcut to start a query with a WHERE condition.</p>
            <CodeBlock language="php" code={`
// Fluent syntax
$users = $csv->where('status', 'active')->all();
            `} />

            <h2>Data Manipulation</h2>

            <h3>insert</h3>
            <CodeBlock language="php" code={`
public function insert(array $row): void
            `} />
            <p>Appends a single row to the CSV file.</p>

            <h3>batchInsert</h3>
            <CodeBlock language="php" code={`
public function batchInsert(array $rows): void
            `} />
            <p>Appends multiple rows efficiently.</p>

            <h3>update</h3>
            <CodeBlock language="php" code={`
public function update(array $attributes, array $conditions = []): int
            `} />
            <p>
                Updates rows matching the condition. Uses a sidecar mechanism to persist updates without rewriting the entire CSV.
                Returns the number of affected rows.
            </p>
            <CodeBlock language="php" code={`
// Deactivate users who haven't logged in
$csv->update(
    ['status' => 'inactive'], 
    ['last_login' => '2023-01-01']
);
            `} />

            <h3>addColumn</h3>
            <CodeBlock language="php" code={`
public function addColumn(string $name, string $default = '', bool $materialize = false): void
            `} />
            <p>
                Adds a new column to the CSV schema. Use <code>materialize = true</code> to rewrite the entire file with the new column populated.
            </p>

            <h2>Metadata</h2>

            <h3>getHeaders</h3>
            <CodeBlock language="php" code={`
public function getHeaders(): array
            `} />
            <p>Returns the list of column names.</p>

        </div>
    );
}
