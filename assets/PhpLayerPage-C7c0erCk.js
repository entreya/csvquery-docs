import{j as e}from"./index-Z1vyp1WY.js";import{C as r}from"./CodeBlock-PEt4H_Dw.js";import"./MermaidDiagram-DXFfz0sI.js";function t(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"php-layer",children:"PHP Layer"}),e.jsx("p",{children:"The PHP layer provides the fluent API and handles communication with the Go engine."}),e.jsx("h2",{id:"module-structure",children:"Module Structure"}),e.jsx(r,{className:"language-text",children:`src/php/
├── Core/                     # Entry point
│   └── CsvQuery.php          # Main class, index management
├── Query/                    # Query building
│   ├── ActiveQuery.php       # Fluent interface, conditions
│   └── Command.php           # SQL-like debug output
├── Bridge/                   # Go communication
│   ├── GoBridge.php          # Binary wrapper, process spawning
│   └── SocketClient.php      # Unix socket daemon client
└── Models/                   # Data wrappers
    ├── Row.php               # Row object with ArrayAccess
    ├── Cell.php              # Cell value wrapper
    └── Column.php            # Column metadata`}),e.jsx("h2",{id:"responsibilities",children:"Module Responsibilities"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Module"}),e.jsx("th",{children:"Purpose"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Core"})}),e.jsx("td",{children:"Entry point, CSV handling, index lifecycle"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Query"})}),e.jsx("td",{children:"Fluent API, condition building, execution"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Bridge"})}),e.jsx("td",{children:"Process management, IPC with Go binary"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Models"})}),e.jsx("td",{children:"Data representation, type casting"})]})]})]}),e.jsx("h2",{id:"imports",children:"Import Syntax"}),e.jsx(r,{className:"language-php",children:`use Entreya\\CsvQuery\\Core\\CsvQuery;
use Entreya\\CsvQuery\\Query\\ActiveQuery;
use Entreya\\CsvQuery\\Bridge\\GoBridge;
use Entreya\\CsvQuery\\Models\\Row;`}),e.jsx("h2",{id:"query-flow",children:"Query Flow"}),e.jsxs("ol",{children:[e.jsxs("li",{children:["User calls ",e.jsx("code",{children:"$csv->find()->where(...)"})]}),e.jsx("li",{children:"ActiveQuery builds condition structure"}),e.jsx("li",{children:"GoBridge serializes to JSON and sends to Go daemon"}),e.jsx("li",{children:"Go engine returns matching row offsets"}),e.jsx("li",{children:"PHP reads actual rows from CSV at returned offsets"}),e.jsx("li",{children:"Results hydrated into Row objects (or arrays)"})]}),e.jsx("h2",{id:"socket-client",children:"Socket Client"}),e.jsx("p",{children:"The SocketClient maintains a persistent connection to the Go daemon for sub-millisecond query latency:"}),e.jsx(r,{className:"language-php",children:`// Connection is established automatically on first query
// and reused for subsequent queries

$csv->find()->where(['ID' => '123'])->one();  // ~1-2ms
$csv->find()->where(['ID' => '456'])->one();  // ~1-2ms (reuses connection)`})]})}export{t as PhpLayerPage};
