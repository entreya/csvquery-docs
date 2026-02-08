import { CodeBlock } from '../components/mdx/CodeBlock';

export function ApiReferencePage() {
    return (
        <div className="prose max-w-none">
            <h1>API Reference</h1>
            <p className="lead">
                Detailed documentation for internal classes, debugging tools, and data structures used in Entreya CsvQuery.
            </p>

            <div className="callout callout-info">
                <p>
                    <strong>Note:</strong> This reference covers advanced usage and internal APIs. For standard query operations,
                    please refer to the <a href="/csvquery-docs/api/csvquery">CsvQuery</a> and <a href="/csvquery-docs/api/activequery">ActiveQuery</a> guides.
                </p>
            </div>

            <hr />

            <h2 id="debugging">Debugging</h2>
            <p>
                CsvQuery provides several tools to inspect query execution and performance.
            </p>

            <h3>explain()</h3>
            <p>
                Returns the execution plan for the current query, including which index (if any) is being used.
            </p>
            <CodeBlock language="php" code={`$query = CsvQuery::find()
    ->from('data.csv')
    ->where(['status' => 'active']);

$plan = $query->explain();
print_r($plan);
/* Output:
Array
(
    [match] => IndexScan
    [index] => status_idx
    [key] => status
)
*/`} />

            <h3>lastQuery()</h3>
            <p>
                Returns the raw command sent to the Go engine for the most recent operation.
            </p>
            <CodeBlock language="php" code={`$users = CsvQuery::find()->select(['id'])->all();
echo CsvQuery::lastQuery();
// Output: SELECT id FROM data.csv`} />

            <hr />

            <h2 id="row-class">Row Class</h2>
            <p>
                Represents a single row of data returned from a query. When <code>asArray()</code> is NOT used, results are returned as instances of this class (or a custom model class).
            </p>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Property/Method</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>attributes</code></td>
                        <td>array</td>
                        <td>Raw associative array of column values.</td>
                    </tr>
                    <tr>
                        <td><code>__get($name)</code></td>
                        <td>mixed</td>
                        <td>Magic method to access column values as properties (e.g., <code>$row-&gt;id</code>).</td>
                    </tr>
                    <tr>
                        <td><code>toArray()</code></td>
                        <td>array</td>
                        <td>Converts the row object back to a plain array.</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <h2 id="column-schema">Column Schema</h2>
            <p>
                Defines the structure and data types of your CSV columns. Although CsvQuery is schema-less by default, defining a schema can improve type safety and casting.
            </p>

            <CodeBlock language="php" code={`class User extends \\Entreya\\CsvQuery\\ActiveRecord
{
    public static function schema()
    {
        return [
            'id' => 'int',
            'email' => 'string',
            'is_active' => 'bool',
            'created_at' => 'timestamp'
        ];
    }
}`} />

            <hr />

            <h2 id="internal-classes">Internal Classes</h2>
            <p>
                These classes handle the low-level communication between PHP and the Go engine.
            </p>

            <h3>GoBridge</h3>
            <p>
                Singleton responsible for spawning and communicating with the Go binary.
            </p>
            <ul>
                <li><strong>Properties:</strong>
                    <ul>
                        <li><code>$biaryPath</code>: Path to the compiled Go executable.</li>
                        <li><code>$pipes</code>: Resource handles for STDIN/STDOUT.</li>
                    </ul>
                </li>
                <li><strong>Methods:</strong>
                    <ul>
                        <li><code>sendCommand(string $cmd): string</code>: Sends a raw command string to the engine.</li>
                        <li><code>receiveResponse(): mixed</code>: Reads and decodes the JSON response.</li>
                    </ul>
                </li>
            </ul>

            <h3>Result</h3>
            <p>
                Encapsulates the response from the Go engine, including data, metadata, and execution time.
            </p>
        </div>
    );
}
