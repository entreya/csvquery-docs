import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/mdx/CodeBlock';
import { Callout } from '../components/mdx/Callout';

export function GettingStartedPage() {
    return (
        <>
            <h1 id="introduction">Introduction</h1>
            <p>
                Welcome to CsvQuery! This guide will help you get up and running with the library in just a few minutes.
            </p>

            <h2 id="what-is-csvquery">What is CsvQuery?</h2>
            <p>
                <strong>CsvQuery</strong> is a high-performance query engine that treats massive CSV files (10GB - 1TB+)
                like searchable databases. It uses a PHP + Go hybrid architecture to achieve sub-millisecond query
                latencies without the overhead of traditional database systems.
            </p>

            <CodeBlock className="language-mermaid">
                {`graph TD
    A[PHP Application] -->|Query| B[PHP Caching Layer]
    B -->|Cache Miss| C[Go Engine Binary]
    C -->|SIMD Scan| D[(CSV File)]
    C -->|Lookup| E[Memory Mapped Index]
    C -->|Result| B
    B -->|Result| A`}
            </CodeBlock>

            <h3 id="key-features">Key Features</h3>
            <ul>
                <li><strong>Blazing Fast</strong>: SIMD-accelerated CSV parsing (AVX2/SSE4.2) at 10GB/s+</li>
                <li><strong>Massive Scale</strong>: Tested on 18M+ rows, 10GB+ files</li>
                <li><strong>Memory Efficient</strong>: Mmap-based access with LZ4-compressed indexes</li>
                <li><strong>Yii2-like API</strong>: Familiar fluent query builder for PHP developers</li>
                <li><strong>Zero-IO Queries</strong>: COUNT operations bypass CSV reads entirely via index metadata</li>
            </ul>

            <Callout type="tip" title="When to use CsvQuery">
                CsvQuery is ideal when you have large CSV files that you need to query repeatedly,
                but importing into a database is impractical due to file size, update frequency, or complexity.
            </Callout>

            <h2 id="quick-install">Quick Install</h2>
            <p>Install via Composer:</p>
            <CodeBlock className="language-bash">
                {`composer require entreya/csvquery`}
            </CodeBlock>

            <p>The Go binary is built automatically on install. See the <Link to="/getting-started/installation">Installation Guide</Link> for manual setup options.</p>

            <h2 id="your-first-query">Your First Query</h2>
            <CodeBlock className="language-php">
                {`<?php
require 'vendor/autoload.php';

use Entreya\\CsvQuery\\Core\\CsvQuery;

// Initialize with your CSV file
$csv = new CsvQuery('/path/to/data.csv');

// Create an index for fast searching (one-time)
$csv->createIndex(['STATUS']);

// Query with fluent API
$activeUsers = $csv->find()
    ->where(['STATUS' => 'active'])
    ->limit(100)
    ->all();

echo count($activeUsers) . " active users found";`}
            </CodeBlock>

            <h2 id="next-steps">Next Steps</h2>
            <ul>
                <li><Link to="/getting-started/installation">Installation</Link> - Detailed setup instructions</li>
                <li><Link to="/getting-started/quick-start">Quick Start</Link> - 5-minute tutorial</li>
                <li><Link to="/api">API Reference</Link> - Complete method documentation</li>
                <li><Link to="/architecture">Architecture</Link> - How CsvQuery works under the hood</li>
            </ul>
        </>
    );
}
