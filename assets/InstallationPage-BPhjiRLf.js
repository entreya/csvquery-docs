import{j as e}from"./index-Z1vyp1WY.js";import{C as s}from"./CodeBlock-PEt4H_Dw.js";import{C as r}from"./Callout-BTQNKGo2.js";import"./MermaidDiagram-DXFfz0sI.js";function t(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"installation",children:"Installation"}),e.jsx("p",{children:"CsvQuery consists of a PHP wrapper and a Go binary. The binary is built automatically during Composer install, but you can also build it manually."}),e.jsx("h2",{id:"requirements",children:"Requirements"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Platform"}),e.jsx("th",{children:"Requirements"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"All"})}),e.jsx("td",{children:"PHP 8.1+, Go 1.21+"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Linux/macOS"})}),e.jsx("td",{children:"Unix Domain Socket support (recommended)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Windows"})}),e.jsx("td",{children:"None (Binary is statically linked)"})]})]})]}),e.jsx("h2",{id:"composer-install",children:"Via Composer"}),e.jsx(s,{className:"language-bash",children:"composer require entreya/csvquery"}),e.jsxs("p",{children:["The Go binary is built automatically during ",e.jsx("code",{children:"composer install"}),". If Go is not available, pre-compiled binaries for your platform are included."]}),e.jsx("h2",{id:"build-commands",children:"Build Commands"}),e.jsx(s,{className:"language-bash",children:`# Build for current platform
composer build

# Build for all platforms
composer build:all

# Clean all binaries
composer build:clean`}),e.jsx("h2",{id:"manual-build",children:"Manual Build"}),e.jsx("p",{children:"If you prefer to build the Go binary manually:"}),e.jsx(s,{className:"language-bash",children:`# Build for current OS/architecture
php scripts/build.php

# Build for all platforms
php scripts/build.php --all`}),e.jsx("h2",{id:"windows-notes",children:"Windows Notes"}),e.jsxs(r,{type:"info",children:["The Windows binary is statically linked and does not require MinGW, Cygwin, or WSL to run. Just use the ",e.jsx("code",{children:".exe"})," as is."]}),e.jsx("h2",{id:"verify-installation",children:"Verify Installation"}),e.jsx("p",{children:"Test that everything is working:"}),e.jsx(s,{className:"language-php",children:`<?php
require 'vendor/autoload.php';

use Entreya\\CsvQuery\\Core\\CsvQuery;

// This should work without errors
$csv = new CsvQuery('/path/to/test.csv');
echo "CsvQuery installed successfully!\\n";
echo "Headers: " . implode(', ', $csv->getHeaders());`}),e.jsxs(r,{type:"warning",title:"Troubleshooting",children:["If you encounter issues, check the ",e.jsx("a",{href:"https://github.com/entreya/csvquery/blob/main/CONTRIBUTING.md",target:"_blank",rel:"noopener noreferrer",children:"CONTRIBUTING.md"})," for platform-specific setup instructions."]})]})}export{t as InstallationPage};
