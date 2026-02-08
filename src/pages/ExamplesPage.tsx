import { CodeBlock } from '../components/mdx/CodeBlock';

export function ExamplesPage() {
    return (
        <>
            <h1 id="examples">Examples</h1>
            <p>
                Real-world examples of common CsvQuery patterns and use cases.
            </p>

            <h2 id="basic-filtering">Basic Filtering</h2>
            <CodeBlock className="language-php">
                {`// Simple equality
$csv->find()->where(['STATUS' => 'active'])->all();

// Multiple conditions (AND)
$csv->find()
    ->where(['STATUS' => 'active', 'TYPE' => 'premium'])
    ->all();

// OR conditions
$csv->find()
    ->where(['STATUS' => 'active'])
    ->orWhere(['STATUS' => 'pending'])
    ->all();`}
            </CodeBlock>

            <h2 id="comparison-operators">Comparison Operators</h2>
            <CodeBlock className="language-php">
                {`// Greater than
$csv->find()->where(['>', 'SCORE', 80])->all();

// Less than or equal
$csv->find()->where(['<=', 'AGE', 30])->all();

// Between range
$csv->find()->where(['BETWEEN', 'PRICE', 100, 500])->all();

// IN list
$csv->find()->where(['IN', 'CATEGORY', ['A', 'B', 'C']])->all();

// LIKE pattern
$csv->find()->where(['LIKE', 'NAME', '%john%'])->all();`}
            </CodeBlock>

            <h2 id="selecting-columns">Selecting Columns</h2>
            <CodeBlock className="language-php">
                {`// Select specific columns
$csv->find()
    ->select(['ID', 'NAME', 'EMAIL'])
    ->all();

// Get as arrays instead of Row objects
$csv->find()
    ->select(['ID', 'NAME'])
    ->asArray()
    ->all();`}
            </CodeBlock>

            <h2 id="sorting-pagination">Sorting & Pagination</h2>
            <CodeBlock className="language-php">
                {`// Sort descending
$csv->find()
    ->orderBy(['CREATED_AT' => SORT_DESC])
    ->all();

// Multiple sort columns
$csv->find()
    ->orderBy(['STATUS' => SORT_ASC, 'NAME' => SORT_ASC])
    ->all();

// Pagination
$csv->find()
    ->orderBy(['ID' => SORT_ASC])
    ->limit(20)
    ->offset(40)  // Page 3
    ->all();`}
            </CodeBlock>

            <h2 id="aggregations">Aggregations</h2>
            <CodeBlock className="language-php">
                {`// Count
$total = $csv->find()->count();
$active = $csv->find()->where(['STATUS' => 'active'])->count();

// Sum
$revenue = $csv->find()->sum('AMOUNT');

// Average
$avgScore = $csv->find()->average('SCORE');

// Min/Max
$oldest = $csv->find()->min('CREATED_AT');
$newest = $csv->find()->max('CREATED_AT');`}
            </CodeBlock>

            <h2 id="grouping">Grouping</h2>
            <CodeBlock className="language-php">
                {`// Group by category
$byCategory = $csv->find()
    ->groupBy('CATEGORY')
    ->sum('AMOUNT');

// Count per group
$statusCounts = $csv->find()
    ->groupBy('STATUS')
    ->count();`}
            </CodeBlock>

            <h2 id="index-results">Index Results by Column</h2>
            <CodeBlock className="language-php">
                {`// Index by ID for easy lookup
$users = $csv->find()
    ->indexBy('ID')
    ->all();

// Now access by ID
$user = $users['12345'];`}
            </CodeBlock>

            <h2 id="complex-conditions">Complex Nested Conditions</h2>
            <CodeBlock className="language-php">
                {`// Complex nested OR/AND
$csv->find()
    ->where(['OR',
        ['STATUS' => 'active'],
        ['AND',
            ['>', 'SCORE', 90],
            ['TYPE' => 'vip']
        ]
    ])
    ->all();`}
            </CodeBlock>

            <h2 id="data-modification">Data Modification</h2>
            <CodeBlock className="language-php">
                {`// Insert a single row
$csv->insert([
    'NAME' => 'John Doe',
    'EMAIL' => 'john@example.com',
    'STATUS' => 'active'
]);

// Batch insert
$csv->batchInsert([
    ['NAME' => 'User 1', 'STATUS' => 'active'],
    ['NAME' => 'User 2', 'STATUS' => 'pending'],
]);

// Update rows
$csv->update(
    ['STATUS' => 'inactive'],  // Set these values
    ['ID' => '12345']          // Where these conditions match
);`}
            </CodeBlock>

            <h2 id="query-explanation">Query Explanation</h2>
            <CodeBlock className="language-php">
                {`// See how the query will be executed
$plan = $csv->find()
    ->where(['STATUS' => 'active'])
    ->explain();

print_r($plan);
// [
//   'strategy' => 'IndexScan',
//   'index' => 'STATUS',
//   'estimated_rows' => 50000
// ]`}
            </CodeBlock>
        </>
    );
}
