import{j as e}from"./index-Z1vyp1WY.js";import{C as s}from"./CodeBlock-PEt4H_Dw.js";import"./MermaidDiagram-DXFfz0sI.js";function l(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"examples",children:"Examples"}),e.jsx("p",{children:"Real-world examples of common CsvQuery patterns and use cases."}),e.jsx("h2",{id:"basic-filtering",children:"Basic Filtering"}),e.jsx(s,{className:"language-php",children:`// Simple equality
$csv->find()->where(['STATUS' => 'active'])->all();

// Multiple conditions (AND)
$csv->find()
    ->where(['STATUS' => 'active', 'TYPE' => 'premium'])
    ->all();

// OR conditions
$csv->find()
    ->where(['STATUS' => 'active'])
    ->orWhere(['STATUS' => 'pending'])
    ->all();`}),e.jsx("h2",{id:"comparison-operators",children:"Comparison Operators"}),e.jsx(s,{className:"language-php",children:`// Greater than
$csv->find()->where(['>', 'SCORE', 80])->all();

// Less than or equal
$csv->find()->where(['<=', 'AGE', 30])->all();

// Between range
$csv->find()->where(['BETWEEN', 'PRICE', 100, 500])->all();

// IN list
$csv->find()->where(['IN', 'CATEGORY', ['A', 'B', 'C']])->all();

// LIKE pattern
$csv->find()->where(['LIKE', 'NAME', '%john%'])->all();`}),e.jsx("h2",{id:"selecting-columns",children:"Selecting Columns"}),e.jsx(s,{className:"language-php",children:`// Select specific columns
$csv->find()
    ->select(['ID', 'NAME', 'EMAIL'])
    ->all();

// Get as arrays instead of Row objects
$csv->find()
    ->select(['ID', 'NAME'])
    ->asArray()
    ->all();`}),e.jsx("h2",{id:"sorting-pagination",children:"Sorting & Pagination"}),e.jsx(s,{className:"language-php",children:`// Sort descending
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
    ->all();`}),e.jsx("h2",{id:"aggregations",children:"Aggregations"}),e.jsx(s,{className:"language-php",children:`// Count
$total = $csv->find()->count();
$active = $csv->find()->where(['STATUS' => 'active'])->count();

// Sum
$revenue = $csv->find()->sum('AMOUNT');

// Average
$avgScore = $csv->find()->average('SCORE');

// Min/Max
$oldest = $csv->find()->min('CREATED_AT');
$newest = $csv->find()->max('CREATED_AT');`}),e.jsx("h2",{id:"grouping",children:"Grouping"}),e.jsx(s,{className:"language-php",children:`// Group by category
$byCategory = $csv->find()
    ->groupBy('CATEGORY')
    ->sum('AMOUNT');

// Count per group
$statusCounts = $csv->find()
    ->groupBy('STATUS')
    ->count();`}),e.jsx("h2",{id:"index-results",children:"Index Results by Column"}),e.jsx(s,{className:"language-php",children:`// Index by ID for easy lookup
$users = $csv->find()
    ->indexBy('ID')
    ->all();

// Now access by ID
$user = $users['12345'];`}),e.jsx("h2",{id:"complex-conditions",children:"Complex Nested Conditions"}),e.jsx(s,{className:"language-php",children:`// Complex nested OR/AND
$csv->find()
    ->where(['OR',
        ['STATUS' => 'active'],
        ['AND',
            ['>', 'SCORE', 90],
            ['TYPE' => 'vip']
        ]
    ])
    ->all();`}),e.jsx("h2",{id:"data-modification",children:"Data Modification"}),e.jsx(s,{className:"language-php",children:`// Insert a single row
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
);`}),e.jsx("h2",{id:"query-explanation",children:"Query Explanation"}),e.jsx(s,{className:"language-php",children:`// See how the query will be executed
$plan = $csv->find()
    ->where(['STATUS' => 'active'])
    ->explain();

print_r($plan);
// [
//   'strategy' => 'IndexScan',
//   'index' => 'STATUS',
//   'estimated_rows' => 50000
// ]`})]})}export{l as ExamplesPage};
