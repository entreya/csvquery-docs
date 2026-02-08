import { CodeBlock } from '../components/mdx/CodeBlock';
import { Callout } from '../components/mdx/Callout';

export function QuickStartPage() {
    return (
        <>
            <h1 id="quick-start">Quick Start</h1>
            <p>
                Get up and running with CsvQuery in 5 minutes. This guide assumes you've already
                <a href="/getting-started/installation"> installed CsvQuery</a>.
            </p>

            <h2 id="step-1-initialize">Step 1: Initialize CsvQuery</h2>
            <CodeBlock className="language-php">
                {`<?php
require 'vendor/autoload.php';

use Entreya\\CsvQuery\\Core\\CsvQuery;

// Point to your CSV file
$csv = new CsvQuery('/path/to/data.csv', [
    'indexDir' => '/path/to/indexes',  // Optional: defaults to CSV directory
    'workers' => 8,                     // Optional: parallel workers for indexing
]);`}
            </CodeBlock>

            <h2 id="step-2-create-indexes">Step 2: Create Indexes</h2>
            <p>
                Indexes enable fast searching. Create them once for frequently queried columns:
            </p>
            <CodeBlock className="language-php">
                {`// Create index on a single column
$csv->createIndex(['STATUS']);

// Create composite index for multi-column queries
$csv->createIndex(['STATUS', 'CATEGORY']);`}
            </CodeBlock>

            <Callout type="tip" title="Indexing Speed">
                CsvQuery can index ~400,000 rows/second on modern hardware.
                A 10GB file typically takes 2-3 minutes to index.
            </Callout>

            <h2 id="step-3-query">Step 3: Query Your Data</h2>
            <CodeBlock className="language-php">
                {`// Find all active users
$results = $csv->find()
    ->where(['STATUS' => 'active'])
    ->all();

// With multiple conditions
$results = $csv->find()
    ->where(['STATUS' => 'active'])
    ->andWhere(['>', 'SCORE', 80])
    ->orderBy(['SCORE' => SORT_DESC])
    ->limit(100)
    ->all();

// Get just one record
$user = $csv->find()
    ->where(['ID' => '12345'])
    ->one();`}
            </CodeBlock>

            <h2 id="step-4-iterate">Step 4: Iterate Efficiently</h2>
            <p>
                For large result sets, use generators to avoid loading everything into memory:
            </p>
            <CodeBlock className="language-php">
                {`// Stream results with a generator
foreach ($csv->find()->where(['CATEGORY' => 'premium'])->each() as $row) {
    echo $row['NAME'] . "\\n";
}`}
            </CodeBlock>

            <h2 id="step-5-aggregate">Step 5: Aggregate Data</h2>
            <CodeBlock className="language-php">
                {`// Count matching rows
$count = $csv->find()->where(['STATUS' => 'active'])->count();

// Sum a column
$total = $csv->find()->sum('AMOUNT');

// Group and aggregate
$byCategory = $csv->find()
    ->groupBy('CATEGORY')
    ->sum('AMOUNT');`}
            </CodeBlock>

            <Callout type="info" title="Zero-IO Counts">
                When you call <code>count()</code> on an indexed column, CsvQuery can
                return the result from index metadata without reading the CSV at all!
            </Callout>

            <h2 id="complete-example">Complete Example</h2>
            <CodeBlock className="language-php">
                {`<?php
require 'vendor/autoload.php';

use Entreya\\CsvQuery\\Core\\CsvQuery;

// Initialize
$csv = new CsvQuery('./users.csv');

// Create indexes (one-time operation)
if (!$csv->hasIndex(['STATUS'])) {
    echo "Creating index...\\n";
    $csv->createIndex(['STATUS']);
}

// Query with fluent API
$activeUsers = $csv->find()
    ->select(['ID', 'NAME', 'EMAIL'])
    ->where(['STATUS' => 'active'])
    ->andWhere(['>', 'CREATED_AT', '2024-01-01'])
    ->orderBy(['NAME' => SORT_ASC])
    ->limit(50)
    ->all();

echo "Found " . count($activeUsers) . " recent active users\\n";

foreach ($activeUsers as $user) {
    echo "- {$user['NAME']} ({$user['EMAIL']})\\n";
}`}
            </CodeBlock>
        </>
    );
}
