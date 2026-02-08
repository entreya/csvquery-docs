import { CodeBlock } from '../components/mdx/CodeBlock';

export function ConditionsPage() {
    return (
        <>
            <h1 id="condition-syntax">Condition Syntax</h1>
            <p>
                CsvQuery supports Yii2-style conditions for flexible, readable query building.
            </p>

            <h2 id="hash-format">Hash Format</h2>
            <p>The simplest format - key-value pairs are joined with AND:</p>
            <CodeBlock className="language-php">
                {`// Single condition
->where(['STATUS' => 'active'])

// Multiple conditions (implicit AND)
->where(['STATUS' => 'active', 'TYPE' => 'premium'])`}
            </CodeBlock>

            <h2 id="operator-format">Operator Format</h2>
            <p>For comparisons, use array format with operator first:</p>
            <CodeBlock className="language-php">
                {`['operator', 'column', value]`}
            </CodeBlock>

            <h3 id="comparison-operators">Comparison Operators</h3>
            <table>
                <thead>
                    <tr><th>Operator</th><th>Example</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>=</code></td><td><code>['=', 'STATUS', 'active']</code></td><td>Equal (same as hash format)</td></tr>
                    <tr><td><code>!=</code></td><td><code>['!=', 'STATUS', 'deleted']</code></td><td>Not equal</td></tr>
                    <tr><td><code>&gt;</code></td><td><code>['&gt;', 'SCORE', 80]</code></td><td>Greater than</td></tr>
                    <tr><td><code>&gt;=</code></td><td><code>['&gt;=', 'AGE', 18]</code></td><td>Greater or equal</td></tr>
                    <tr><td><code>&lt;</code></td><td><code>['&lt;', 'PRICE', 100]</code></td><td>Less than</td></tr>
                    <tr><td><code>&lt;=</code></td><td><code>['&lt;=', 'QUANTITY', 0]</code></td><td>Less or equal</td></tr>
                </tbody>
            </table>

            <h3 id="special-operators">Special Operators</h3>

            <h4><code>BETWEEN</code></h4>
            <CodeBlock className="language-php">
                {`->where(['BETWEEN', 'AGE', 18, 65])
// Matches: 18 <= AGE <= 65`}
            </CodeBlock>

            <h4><code>IN</code></h4>
            <CodeBlock className="language-php">
                {`->where(['IN', 'CATEGORY', ['A', 'B', 'C']])
// Matches any of A, B, or C`}
            </CodeBlock>

            <h4><code>NOT IN</code></h4>
            <CodeBlock className="language-php">
                {`->where(['NOT IN', 'STATUS', ['deleted', 'banned']])`}
            </CodeBlock>

            <h4><code>LIKE</code></h4>
            <CodeBlock className="language-php">
                {`->where(['LIKE', 'NAME', '%john%'])   // Contains
->where(['LIKE', 'EMAIL', '%@gmail.com']) // Ends with`}
            </CodeBlock>

            <h4><code>NOT LIKE</code></h4>
            <CodeBlock className="language-php">
                {`->where(['NOT LIKE', 'EMAIL', '%spam%'])`}
            </CodeBlock>

            <h2 id="logical-operators">Logical Operators</h2>

            <h3 id="and-conditions">AND Conditions</h3>
            <CodeBlock className="language-php">
                {`// Using andWhere() - most common
->where(['STATUS' => 'active'])
->andWhere(['>', 'SCORE', 80])

// Using explicit AND
->where(['AND',
    ['STATUS' => 'active'],
    ['>', 'SCORE', 80]
])`}
            </CodeBlock>

            <h3 id="or-conditions">OR Conditions</h3>
            <CodeBlock className="language-php">
                {`// Using orWhere()
->where(['STATUS' => 'active'])
->orWhere(['STATUS' => 'pending'])

// Using explicit OR
->where(['OR',
    ['STATUS' => 'active'],
    ['STATUS' => 'pending']
])`}
            </CodeBlock>

            <h2 id="nested-conditions">Nested Conditions</h2>
            <p>Combine AND/OR for complex logic:</p>
            <CodeBlock className="language-php">
                {`// (STATUS = 'active') OR (SCORE > 90 AND TYPE = 'vip')
->where(['OR',
    ['STATUS' => 'active'],
    ['AND',
        ['>', 'SCORE', 90],
        ['TYPE' => 'vip']
    ]
])`}
            </CodeBlock>

            <h2 id="null-checks">NULL Checks</h2>
            <CodeBlock className="language-php">
                {`// Check for NULL
->where(['IS', 'DELETED_AT', null])

// Check for NOT NULL
->where(['IS NOT', 'EMAIL', null])`}
            </CodeBlock>

            <h2 id="filter-where">Filter Where</h2>
            <p>Ignores empty values - useful for search forms:</p>
            <CodeBlock className="language-php">
                {`// Empty values are ignored
$query->filterWhere([
    'STATUS' => $request->status,     // Ignored if empty
    'CATEGORY' => $request->category, // Ignored if empty
]);`}
            </CodeBlock>
        </>
    );
}
