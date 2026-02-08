import { CodeBlock } from '../components/mdx/CodeBlock';

export function ActiveQueryPage() {
    return (
        <div className="prose">
            <h1>ActiveQuery Class</h1>
            <p className="lead">
                The <code>ActiveQuery</code> class provides a fluent interface for building and executing queries,
                mimicking the Yii2 ActiveQuery pattern.
            </p>

            <h2>Query Building</h2>

            <h3>select</h3>
            <CodeBlock language="php" code={`
public function select(array $columns): self
            `} />
            <p>Specifies the columns to retrieve. If not set, all columns are returned.</p>

            <h3>where</h3>
            <CodeBlock language="php" code={`
public function where(array|string|null $condition, mixed $value = null): self
            `} />
            <p>Sets the WHERE condition. Supports multiple formats:</p>
            <CodeBlock language="php" code={`
// Simple equality
$query->where('status', 'active');

// Hash format
$query->where(['status' => 'active', 'role' => 'admin']);

// Operator format
$query->where(['>', 'age', 18]);
$query->where(['between', 'created_at', '2023-01-01', '2023-12-31']);
$query->where(['like', 'email', '@gmail.com']);
            `} />

            <h3>andWhere / orWhere</h3>
            <CodeBlock language="php" code={`
public function andWhere(array|string $condition, mixed $value = null): self
public function orWhere(array|string $condition, mixed $value = null): self
            `} />
            <p>Appends conditions using AND or OR logic.</p>

            <h3>filterWhere</h3>
            <CodeBlock language="php" code={`
public function filterWhere(array $condition): self
            `} />
            <p>adds a condition only if values are not empty (useful for search forms).</p>

            <h3>orderBy</h3>
            <CodeBlock language="php" code={`
public function orderBy(array|string $columns): self
            `} />
            <p>Sorts the results. Note: Sorting large datasets without an index can be slow.</p>
            <CodeBlock language="php" code={`
$query->orderBy(['created_at' => SORT_DESC]);
            `} />

            <h3>limit / offset</h3>
            <CodeBlock language="php" code={`
public function limit(int $limit): self
public function offset(int $offset): self
            `} />
            <p>Pagination support. Works efficiently with indexes.</p>

            <h2>Execution Methods</h2>

            <h3>all</h3>
            <CodeBlock language="php" code={`
public function all(): array
            `} />
            <p>Executes the query and returns all results as an array of rows.</p>

            <h3>one</h3>
            <CodeBlock language="php" code={`
public function one(): array|Row|null
            `} />
            <p>Returns the first result or null if none found.</p>

            <h3>each</h3>
            <CodeBlock language="php" code={`
public function each(int $batchSize = 100):Generator
            `} />
            <p>Returns a Generator to iterate over results one by one, memory-efficiently.</p>
            <CodeBlock language="php" code={`
foreach ($query->each() as $row) {
    // Process $row
}
            `} />

            <h3>batch</h3>
            <CodeBlock language="php" code={`
public function batch(int $batchSize = 100): Generator
            `} />
            <p>Iterates in batches of rows.</p>

            <h3>count</h3>
            <CodeBlock language="php" code={`
public function count(string $q = '*', $db = null): int
            `} />
            <p>Returns the number of matching records. Uses O(1) index count if possible.</p>

            <h3>exists</h3>
            <CodeBlock language="php" code={`
public function exists(): bool
            `} />
            <p>Returns true if the query yields any results.</p>

            <h2>Aggregations</h2>

            <h3>sum, average, min, max</h3>
            <CodeBlock language="php" code={`
public function sum($column)
public function average($column)
public function min($column)
public function max($column)
            `} />
            <p>Performs aggregation on a specific column.</p>

            <h2>Diagnostics</h2>

            <h3>explain</h3>
            <CodeBlock language="php" code={`
public function explain(string $format = 'array'): mixed
            `} />
            <p>Returns the execution plan (e.g., 'IndexScan', 'FullScan') and reasons for index selection.</p>

            <h3>getStats</h3>
            <CodeBlock language="php" code={`
public function getStats(string $format = 'array'): array|string
            `} />
            <p>Returns execution timing statistics (Indexing time, Fetching time, Total time).</p>
        </div>
    );
}
