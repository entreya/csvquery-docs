import{j as e}from"./index-Z1vyp1WY.js";import{C as n}from"./CodeBlock-PEt4H_Dw.js";import"./MermaidDiagram-DXFfz0sI.js";function t(){return e.jsxs("div",{className:"prose",children:[e.jsx("h1",{children:"ActiveQuery Class"}),e.jsxs("p",{className:"lead",children:["The ",e.jsx("code",{children:"ActiveQuery"})," class provides a fluent interface for building and executing queries, mimicking the Yii2 ActiveQuery pattern."]}),e.jsx("h2",{children:"Query Building"}),e.jsx("h3",{children:"select"}),e.jsx(n,{language:"php",code:`
public function select(array $columns): self
            `}),e.jsx("p",{children:"Specifies the columns to retrieve. If not set, all columns are returned."}),e.jsx("h3",{children:"where"}),e.jsx(n,{language:"php",code:`
public function where(array|string|null $condition, mixed $value = null): self
            `}),e.jsx("p",{children:"Sets the WHERE condition. Supports multiple formats:"}),e.jsx(n,{language:"php",code:`
// Simple equality
$query->where('status', 'active');

// Hash format
$query->where(['status' => 'active', 'role' => 'admin']);

// Operator format
$query->where(['>', 'age', 18]);
$query->where(['between', 'created_at', '2023-01-01', '2023-12-31']);
$query->where(['like', 'email', '@gmail.com']);
            `}),e.jsx("h3",{children:"andWhere / orWhere"}),e.jsx(n,{language:"php",code:`
public function andWhere(array|string $condition, mixed $value = null): self
public function orWhere(array|string $condition, mixed $value = null): self
            `}),e.jsx("p",{children:"Appends conditions using AND or OR logic."}),e.jsx("h3",{children:"filterWhere"}),e.jsx(n,{language:"php",code:`
public function filterWhere(array $condition): self
            `}),e.jsx("p",{children:"adds a condition only if values are not empty (useful for search forms)."}),e.jsx("h3",{children:"orderBy"}),e.jsx(n,{language:"php",code:`
public function orderBy(array|string $columns): self
            `}),e.jsx("p",{children:"Sorts the results. Note: Sorting large datasets without an index can be slow."}),e.jsx(n,{language:"php",code:`
$query->orderBy(['created_at' => SORT_DESC]);
            `}),e.jsx("h3",{children:"limit / offset"}),e.jsx(n,{language:"php",code:`
public function limit(int $limit): self
public function offset(int $offset): self
            `}),e.jsx("p",{children:"Pagination support. Works efficiently with indexes."}),e.jsx("h2",{children:"Execution Methods"}),e.jsx("h3",{children:"all"}),e.jsx(n,{language:"php",code:`
public function all(): array
            `}),e.jsx("p",{children:"Executes the query and returns all results as an array of rows."}),e.jsx("h3",{children:"one"}),e.jsx(n,{language:"php",code:`
public function one(): array|Row|null
            `}),e.jsx("p",{children:"Returns the first result or null if none found."}),e.jsx("h3",{children:"each"}),e.jsx(n,{language:"php",code:`
public function each(int $batchSize = 100):Generator
            `}),e.jsx("p",{children:"Returns a Generator to iterate over results one by one, memory-efficiently."}),e.jsx(n,{language:"php",code:`
foreach ($query->each() as $row) {
    // Process $row
}
            `}),e.jsx("h3",{children:"batch"}),e.jsx(n,{language:"php",code:`
public function batch(int $batchSize = 100): Generator
            `}),e.jsx("p",{children:"Iterates in batches of rows."}),e.jsx("h3",{children:"count"}),e.jsx(n,{language:"php",code:`
public function count(string $q = '*', $db = null): int
            `}),e.jsx("p",{children:"Returns the number of matching records. Uses O(1) index count if possible."}),e.jsx("h3",{children:"exists"}),e.jsx(n,{language:"php",code:`
public function exists(): bool
            `}),e.jsx("p",{children:"Returns true if the query yields any results."}),e.jsx("h2",{children:"Aggregations"}),e.jsx("h3",{children:"sum, average, min, max"}),e.jsx(n,{language:"php",code:`
public function sum($column)
public function average($column)
public function min($column)
public function max($column)
            `}),e.jsx("p",{children:"Performs aggregation on a specific column."}),e.jsx("h2",{children:"Diagnostics"}),e.jsx("h3",{children:"explain"}),e.jsx(n,{language:"php",code:`
public function explain(string $format = 'array'): mixed
            `}),e.jsx("p",{children:"Returns the execution plan (e.g., 'IndexScan', 'FullScan') and reasons for index selection."}),e.jsx("h3",{children:"getStats"}),e.jsx(n,{language:"php",code:`
public function getStats(string $format = 'array'): array|string
            `}),e.jsx("p",{children:"Returns execution timing statistics (Indexing time, Fetching time, Total time)."})]})}export{t as ActiveQueryPage};
