import { CodeBlock } from '../components/mdx/CodeBlock';

export function GoEnginePage() {
    return (
        <>
            <h1 id="go-engine">Go Engine</h1>
            <p>
                The Go engine handles all performance-critical operations: SIMD parsing,
                indexing, binary search, and compression.
            </p>

            <h2 id="package-structure">Package Structure</h2>
            <CodeBlock className="language-text">
                {`src/go/
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
    └── schema/               # Virtual columns, schema files`}
            </CodeBlock>

            <h2 id="simd-parsing">SIMD Parsing</h2>
            <p>
                The engine uses SIMD instructions to scan CSV delimiters at hardware speed:
            </p>
            <ul>
                <li><strong>AVX2</strong> - 256-bit vectors, processes 32 bytes per instruction</li>
                <li><strong>SSE4.2</strong> - 128-bit fallback for older CPUs</li>
                <li><strong>ARM NEON</strong> - For Apple Silicon and ARM servers</li>
            </ul>
            <p>This achieves parsing speeds of 10GB/s+ on modern hardware.</p>

            <h2 id="index-structure">Index Structure</h2>
            <p>Indexes are stored as <code>.cidx</code> files with LZ4 compression:</p>
            <CodeBlock className="language-text">
                {`[Header]
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
  CSV size, mtime, hash for staleness detection`}
            </CodeBlock>

            <h2 id="query-execution">Query Execution</h2>
            <ol>
                <li><strong>Index Selection</strong> - Find best matching index based on WHERE columns</li>
                <li><strong>Binary Search</strong> - Locate relevant blocks in index</li>
                <li><strong>LZ4 Decompress</strong> - Decompress only needed blocks</li>
                <li><strong>Filter</strong> - Apply remaining conditions</li>
                <li><strong>Return Offsets</strong> - Send matching row offsets to PHP</li>
            </ol>

            <h2 id="cli-commands">CLI Commands</h2>
            <CodeBlock className="language-bash">
                {`# Create indexes
./csvquery index --input data.csv --columns '["STATUS"]' --verbose

# Query from command line
./csvquery query --csv data.csv --where '{"STATUS":"active"}' --count

# Start daemon server
./csvquery daemon --socket /tmp/csvquery.sock

# Show version
./csvquery version`}
            </CodeBlock>
        </>
    );
}
