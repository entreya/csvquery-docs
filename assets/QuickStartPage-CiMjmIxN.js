import{j as e}from"./index-Z1vyp1WY.js";import{C as r}from"./CodeBlock-PEt4H_Dw.js";import{C as t}from"./Callout-BTQNKGo2.js";import"./MermaidDiagram-DXFfz0sI.js";function o(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"quick-start",children:"Quick Start"}),e.jsxs("p",{children:["Get up and running with CsvQuery in 5 minutes. This guide assumes you've already",e.jsx("a",{href:"/getting-started/installation",children:" installed CsvQuery"}),"."]}),e.jsx("h2",{id:"step-1-initialize",children:"Step 1: Initialize CsvQuery"}),e.jsx(r,{className:"language-php",children:`<?php
require 'vendor/autoload.php';

use Entreya\\CsvQuery\\Core\\CsvQuery;

// Point to your CSV file
$csv = new CsvQuery('/path/to/data.csv', [
    'indexDir' => '/path/to/indexes',  // Optional: defaults to CSV directory
    'workers' => 8,                     // Optional: parallel workers for indexing
]);`}),e.jsx("h2",{id:"step-2-create-indexes",children:"Step 2: Create Indexes"}),e.jsx("p",{children:"Indexes enable fast searching. Create them once for frequently queried columns:"}),e.jsx(r,{className:"language-php",children:`// Create index on a single column
$csv->createIndex(['STATUS']);

// Create composite index for multi-column queries
$csv->createIndex(['STATUS', 'CATEGORY']);`}),e.jsx(t,{type:"tip",title:"Indexing Speed",children:"CsvQuery can index ~400,000 rows/second on modern hardware. A 10GB file typically takes 2-3 minutes to index."}),e.jsx("h2",{id:"step-3-query",children:"Step 3: Query Your Data"}),e.jsx(r,{className:"language-php",children:`// Find all active users
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
    ->one();`}),e.jsx("h2",{id:"step-4-iterate",children:"Step 4: Iterate Efficiently"}),e.jsx("p",{children:"For large result sets, use generators to avoid loading everything into memory:"}),e.jsx(r,{className:"language-php",children:`// Stream results with a generator
foreach ($csv->find()->where(['CATEGORY' => 'premium'])->each() as $row) {
    echo $row['NAME'] . "\\n";
}`}),e.jsx("h2",{id:"step-5-aggregate",children:"Step 5: Aggregate Data"}),e.jsx(r,{className:"language-php",children:`// Count matching rows
$count = $csv->find()->where(['STATUS' => 'active'])->count();

// Sum a column
$total = $csv->find()->sum('AMOUNT');

// Group and aggregate
$byCategory = $csv->find()
    ->groupBy('CATEGORY')
    ->sum('AMOUNT');`}),e.jsxs(t,{type:"info",title:"Zero-IO Counts",children:["When you call ",e.jsx("code",{children:"count()"})," on an indexed column, CsvQuery can return the result from index metadata without reading the CSV at all!"]}),e.jsx("h2",{id:"complete-example",children:"Complete Example"}),e.jsx(r,{className:"language-php",children:`<?php
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
}`})]})}export{o as QuickStartPage};
