import { CodeBlock } from '../components/mdx/CodeBlock';
import { Callout } from '../components/mdx/Callout';

export function InstallationPage() {
    return (
        <>
            <h1 id="installation">Installation</h1>
            <p>
                CsvQuery consists of a PHP wrapper and a Go binary. The binary is built automatically
                during Composer install, but you can also build it manually.
            </p>

            <h2 id="requirements">Requirements</h2>
            <table>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Requirements</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>All</strong></td>
                        <td>PHP 8.1+, Go 1.21+</td>
                    </tr>
                    <tr>
                        <td><strong>Linux/macOS</strong></td>
                        <td>Unix Domain Socket support (recommended)</td>
                    </tr>
                    <tr>
                        <td><strong>Windows</strong></td>
                        <td>None (Binary is statically linked)</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="composer-install">Via Composer</h2>
            <CodeBlock className="language-bash">
                {`composer require entreya/csvquery`}
            </CodeBlock>

            <p>
                The Go binary is built automatically during <code>composer install</code>.
                If Go is not available, pre-compiled binaries for your platform are included.
            </p>

            <h2 id="build-commands">Build Commands</h2>
            <CodeBlock className="language-bash">
                {`# Build for current platform
composer build

# Build for all platforms
composer build:all

# Clean all binaries
composer build:clean`}
            </CodeBlock>

            <h2 id="manual-build">Manual Build</h2>
            <p>If you prefer to build the Go binary manually:</p>
            <CodeBlock className="language-bash">
                {`# Build for current OS/architecture
php scripts/build.php

# Build for all platforms
php scripts/build.php --all`}
            </CodeBlock>

            <h2 id="windows-notes">Windows Notes</h2>
            <Callout type="info">
                The Windows binary is statically linked and does not require MinGW, Cygwin, or WSL to run.
                Just use the <code>.exe</code> as is.
            </Callout>

            <h2 id="verify-installation">Verify Installation</h2>
            <p>Test that everything is working:</p>
            <CodeBlock className="language-php">
                {`<?php
require 'vendor/autoload.php';

use Entreya\\CsvQuery\\Core\\CsvQuery;

// This should work without errors
$csv = new CsvQuery('/path/to/test.csv');
echo "CsvQuery installed successfully!\\n";
echo "Headers: " . implode(', ', $csv->getHeaders());`}
            </CodeBlock>

            <Callout type="warning" title="Troubleshooting">
                If you encounter issues, check the <a href="https://github.com/entreya/csvquery/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">CONTRIBUTING.md</a> for platform-specific setup instructions.
            </Callout>
        </>
    );
}
