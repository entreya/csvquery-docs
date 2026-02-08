import{j as e,L as i}from"./index-Z1vyp1WY.js";import{C as s}from"./CodeBlock-PEt4H_Dw.js";import{C as t}from"./Callout-BTQNKGo2.js";import"./MermaidDiagram-DXFfz0sI.js";function o(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"introduction",children:"Introduction"}),e.jsx("p",{children:"Welcome to CsvQuery! This guide will help you get up and running with the library in just a few minutes."}),e.jsx("h2",{id:"what-is-csvquery",children:"What is CsvQuery?"}),e.jsxs("p",{children:[e.jsx("strong",{children:"CsvQuery"})," is a high-performance query engine that treats massive CSV files (10GB - 1TB+) like searchable databases. It uses a PHP + Go hybrid architecture to achieve sub-millisecond query latencies without the overhead of traditional database systems."]}),e.jsx(s,{className:"language-mermaid",children:`graph TD
    A[PHP Application] -->|Query| B[PHP Caching Layer]
    B -->|Cache Miss| C[Go Engine Binary]
    C -->|SIMD Scan| D[(CSV File)]
    C -->|Lookup| E[Memory Mapped Index]
    C -->|Result| B
    B -->|Result| A`}),e.jsx("h3",{id:"key-features",children:"Key Features"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Blazing Fast"}),": SIMD-accelerated CSV parsing (AVX2/SSE4.2) at 10GB/s+"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Massive Scale"}),": Tested on 18M+ rows, 10GB+ files"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Memory Efficient"}),": Mmap-based access with LZ4-compressed indexes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Yii2-like API"}),": Familiar fluent query builder for PHP developers"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Zero-IO Queries"}),": COUNT operations bypass CSV reads entirely via index metadata"]})]}),e.jsx(t,{type:"tip",title:"When to use CsvQuery",children:"CsvQuery is ideal when you have large CSV files that you need to query repeatedly, but importing into a database is impractical due to file size, update frequency, or complexity."}),e.jsx("h2",{id:"quick-install",children:"Quick Install"}),e.jsx("p",{children:"Install via Composer:"}),e.jsx(s,{className:"language-bash",children:"composer require entreya/csvquery"}),e.jsxs("p",{children:["The Go binary is built automatically on install. See the ",e.jsx(i,{to:"/getting-started/installation",children:"Installation Guide"})," for manual setup options."]}),e.jsx("h2",{id:"your-first-query",children:"Your First Query"}),e.jsx(s,{className:"language-php",children:`<?php
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

echo count($activeUsers) . " active users found";`}),e.jsx("h2",{id:"next-steps",children:"Next Steps"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(i,{to:"/getting-started/installation",children:"Installation"})," - Detailed setup instructions"]}),e.jsxs("li",{children:[e.jsx(i,{to:"/getting-started/quick-start",children:"Quick Start"})," - 5-minute tutorial"]}),e.jsxs("li",{children:[e.jsx(i,{to:"/api",children:"API Reference"})," - Complete method documentation"]}),e.jsxs("li",{children:[e.jsx(i,{to:"/architecture",children:"Architecture"})," - How CsvQuery works under the hood"]})]})]})}export{o as GettingStartedPage};
