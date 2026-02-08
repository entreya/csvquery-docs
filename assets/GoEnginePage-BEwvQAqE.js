import{j as e}from"./index-Z1vyp1WY.js";import{C as s}from"./CodeBlock-PEt4H_Dw.js";import"./MermaidDiagram-DXFfz0sI.js";function o(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"go-engine",children:"Go Engine"}),e.jsx("p",{children:"The Go engine handles all performance-critical operations: SIMD parsing, indexing, binary search, and compression."}),e.jsx("h2",{id:"package-structure",children:"Package Structure"}),e.jsx(s,{className:"language-text",children:`src/go/
├── main.go                   # CLI entry point
└── internal/
    ├── common/               # Shared types (IndexRecord, IndexMeta)
    ├── indexer/              # CSV indexing pipeline
    ├── query/                # Query engine, index selection
    ├── server/               # Unix socket daemon
    ├── simd/                 # SIMD-optimized parsing
    ├── alter/                # Schema modifications
    ├── update/               # Row update operations
    ├── updatemgr/            # Update file management
    ├── writer/               # CSV write operations
    └── schema/               # Virtual columns, schema files`}),e.jsx("h2",{id:"simd-parsing",children:"SIMD Parsing"}),e.jsx("p",{children:"The engine uses SIMD instructions to scan CSV delimiters at hardware speed:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"AVX2"})," - 256-bit vectors, processes 32 bytes per instruction"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SSE4.2"})," - 128-bit fallback for older CPUs"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ARM NEON"})," - For Apple Silicon and ARM servers"]})]}),e.jsx("p",{children:"This achieves parsing speeds of 10GB/s+ on modern hardware."}),e.jsx("h2",{id:"index-structure",children:"Index Structure"}),e.jsxs("p",{children:["Indexes are stored as ",e.jsx("code",{children:".cidx"})," files with LZ4 compression:"]}),e.jsx(s,{className:"language-text",children:`[Header]
  Magic: "CIDX"
  Version: 1
  Column Count: N
  Row Count: M

[Blocks] (LZ4 compressed)
  Block 0: [key0, offset0], [key1, offset1], ...
  Block 1: ...
  
[Block Index]
  Block 0: first_key, file_offset, size
  Block 1: ...
  
[Metadata]
  CSV size, mtime, hash for staleness detection`}),e.jsx("h2",{id:"query-execution",children:"Query Execution"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Index Selection"})," - Find best matching index based on WHERE columns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Binary Search"})," - Locate relevant blocks in index"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LZ4 Decompress"})," - Decompress only needed blocks"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Filter"})," - Apply remaining conditions"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Return Offsets"})," - Send matching row offsets to PHP"]})]}),e.jsx("h2",{id:"cli-commands",children:"CLI Commands"}),e.jsx(s,{className:"language-bash",children:`# Create indexes
./csvquery index --input data.csv --columns '["STATUS"]' --verbose

# Query from command line
./csvquery query --csv data.csv --where '{"STATUS":"active"}' --count

# Start daemon server
./csvquery daemon --socket /tmp/csvquery.sock

# Show version
./csvquery version`})]})}export{o as GoEnginePage};
