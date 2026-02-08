import{j as e}from"./index-Z1vyp1WY.js";import{C as i}from"./CodeBlock-PEt4H_Dw.js";import"./MermaidDiagram-DXFfz0sI.js";function a(){return e.jsxs("div",{className:"prose",children:[e.jsx("h1",{children:"CsvQuery Class"}),e.jsxs("p",{className:"lead",children:["The ",e.jsx("code",{children:"CsvQuery"})," class is the main entry point for the library. It handles file operations, index management, and initiates queries."]}),e.jsx("h2",{children:"Constructor"}),e.jsx(i,{language:"php",code:`
public function __construct(string $csvPath, array $options = [])
            `}),e.jsx("p",{children:"Initializes a new CsvQuery instance."}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"$csvPath"}),": Absolute or relative path to the CSV file."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"$options"}),": Configuration array.",e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"indexDir"}),": Directory to store index files (default: same as CSV)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"separator"}),": CS separator character (default: ",e.jsx("code",{children:","}),")."]}),e.jsxs("li",{children:[e.jsx("code",{children:"workers"}),": Number of parallel indexing workers (default: CPU count)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"memoryMB"}),": Memory limit per worker in MB (default: 500)."]})]})]})]}),e.jsx("h3",{children:"Example"}),e.jsx(i,{language:"php",code:`
use Entreya\\CsvQuery\\Core\\CsvQuery;

$csv = new CsvQuery('data/users.csv', [
    'indexDir' => 'data/indexes',
    'workers' => 4
]);
            `}),e.jsx("h2",{children:"Index Management"}),e.jsx("h3",{children:"createIndex"}),e.jsx(i,{language:"php",code:`
public function createIndex(array $columns, bool $verbose = false, array $options = []): bool
            `}),e.jsx("p",{children:"Creates one or more indexes. Supporting single-column and composite indexes."}),e.jsx(i,{language:"php",code:`
// Single column index
$csv->createIndex(['email']);

// Multiple single-column indexes
$csv->createIndex(['email', 'status']);

// Composite index (email + status)
$csv->createIndex([['email', 'status']]);

// Mixed
$csv->createIndex(['id', ['last_name', 'first_name']]);
            `}),e.jsx("h3",{children:"hasIndex"}),e.jsx(i,{language:"php",code:`
public function hasIndex(string|array $column): bool
            `}),e.jsx("p",{children:"Checks if an index exists for the specified column(s)."}),e.jsx("h3",{children:"validateIntegrity"}),e.jsx(i,{language:"php",code:`
public function validateIntegrity(): bool
            `}),e.jsxs("p",{children:["Verifies that the existing indexes match the current CSV file using file size, modification time, and a cryptographic sampling hash. Returns ",e.jsx("code",{children:"false"})," if the CSV has been modified since indexing."]}),e.jsx("h2",{children:"Querying"}),e.jsx("h3",{children:"find"}),e.jsx(i,{language:"php",code:`
public function find(): ActiveQuery
            `}),e.jsxs("p",{children:["Returns a new ",e.jsx("code",{children:"ActiveQuery"})," instance for building a query."]}),e.jsx("h3",{children:"where"}),e.jsx(i,{language:"php",code:`
public function where(string|array $column, mixed $value = null): ActiveQuery
            `}),e.jsx("p",{children:"Shortcut to start a query with a WHERE condition."}),e.jsx(i,{language:"php",code:`
// Fluent syntax
$users = $csv->where('status', 'active')->all();
            `}),e.jsx("h2",{children:"Data Manipulation"}),e.jsx("h3",{children:"insert"}),e.jsx(i,{language:"php",code:`
public function insert(array $row): void
            `}),e.jsx("p",{children:"Appends a single row to the CSV file."}),e.jsx("h3",{children:"batchInsert"}),e.jsx(i,{language:"php",code:`
public function batchInsert(array $rows): void
            `}),e.jsx("p",{children:"Appends multiple rows efficiently."}),e.jsx("h3",{children:"update"}),e.jsx(i,{language:"php",code:`
public function update(array $attributes, array $conditions = []): int
            `}),e.jsx("p",{children:"Updates rows matching the condition. Uses a sidecar mechanism to persist updates without rewriting the entire CSV. Returns the number of affected rows."}),e.jsx(i,{language:"php",code:`
// Deactivate users who haven't logged in
$csv->update(
    ['status' => 'inactive'], 
    ['last_login' => '2023-01-01']
);
            `}),e.jsx("h3",{children:"addColumn"}),e.jsx(i,{language:"php",code:`
public function addColumn(string $name, string $default = '', bool $materialize = false): void
            `}),e.jsxs("p",{children:["Adds a new column to the CSV schema. Use ",e.jsx("code",{children:"materialize = true"})," to rewrite the entire file with the new column populated."]}),e.jsx("h2",{children:"Metadata"}),e.jsx("h3",{children:"getHeaders"}),e.jsx(i,{language:"php",code:`
public function getHeaders(): array
            `}),e.jsx("p",{children:"Returns the list of column names."})]})}export{a as CsvQueryPage};
