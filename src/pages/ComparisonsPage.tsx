import { Callout } from '../components/mdx/Callout';

export function ComparisonsPage() {
    return (
        <>
            <h1 id="comparisons">Comparisons</h1>
            <p>
                How CsvQuery compares to alternative approaches for querying large CSV files.
            </p>

            <h2 id="vs-mysql-import">vs. MySQL Import</h2>
            <table>
                <thead>
                    <tr><th>Aspect</th><th>CsvQuery</th><th>MySQL Import</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Setup Time</strong></td><td>Seconds (create index)</td><td>Minutes-Hours (import, index)</td></tr>
                    <tr><td><strong>Query Latency</strong></td><td>~50ms</td><td>~50ms (once indexed)</td></tr>
                    <tr><td><strong>Disk Space</strong></td><td>CSV + 20% index</td><td>2-3x CSV size</td></tr>
                    <tr><td><strong>Data Changes</strong></td><td>Automatic re-index</td><td>Re-import required</td></tr>
                    <tr><td><strong>Dependencies</strong></td><td>None (self-contained)</td><td>MySQL server</td></tr>
                </tbody>
            </table>

            <Callout type="tip">
                Use CsvQuery when you need to query CSV files directly without ETL overhead.
                Use MySQL when you need complex JOINs or transactions.
            </Callout>

            <h2 id="vs-pandas">vs. Python Pandas</h2>
            <table>
                <thead>
                    <tr><th>Aspect</th><th>CsvQuery</th><th>Pandas</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Memory Usage</strong></td><td>~20MB constant</td><td>1-3x file size</td></tr>
                    <tr><td><strong>10GB File Load</strong></td><td>Instant (mmap)</td><td>OOM or 30GB+ RAM</td></tr>
                    <tr><td><strong>Query Style</strong></td><td>Fluent PHP API</td><td>DataFrame API</td></tr>
                    <tr><td><strong>Indexing</strong></td><td>Persistent on disk</td><td>In-memory only</td></tr>
                    <tr><td><strong>Language</strong></td><td>PHP</td><td>Python</td></tr>
                </tbody>
            </table>

            <h2 id="vs-grep-awk">vs. grep/awk</h2>
            <table>
                <thead>
                    <tr><th>Aspect</th><th>CsvQuery</th><th>grep/awk</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>Speed (indexed)</strong></td><td>~50ms</td><td>~30s (full scan)</td></tr>
                    <tr><td><strong>Speed (no index)</strong></td><td>~2s</td><td>~30s</td></tr>
                    <tr><td><strong>Complex Queries</strong></td><td>Easy (fluent API)</td><td>Complex regex</td></tr>
                    <tr><td><strong>Aggregations</strong></td><td>Built-in</td><td>Manual scripting</td></tr>
                </tbody>
            </table>

            <h2 id="vs-sqlite">vs. SQLite</h2>
            <table>
                <thead>
                    <tr><th>Aspect</th><th>CsvQuery</th><th>SQLite</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong>File Format</strong></td><td>Native CSV</td><td>SQLite database</td></tr>
                    <tr><td><strong>External Tools</strong></td><td>Works with Excel, etc.</td><td>SQLite tools only</td></tr>
                    <tr><td><strong>JOINs</strong></td><td>Single-file only</td><td>Full SQL support</td></tr>
                    <tr><td><strong>Transactions</strong></td><td>Append-only updates</td><td>Full ACID</td></tr>
                </tbody>
            </table>

            <h2 id="when-to-use">When to Use CsvQuery</h2>
            <ul>
                <li>✅ Large CSV files that change frequently</li>
                <li>✅ Need to keep CSV format for other tools</li>
                <li>✅ Memory-constrained environments</li>
                <li>✅ Quick ad-hoc queries without ETL</li>
                <li>✅ PHP application integration</li>
            </ul>

            <h2 id="when-not-to-use">When to Use Something Else</h2>
            <ul>
                <li>❌ Need complex JOINs across multiple files → Use a database</li>
                <li>❌ Need ACID transactions → Use PostgreSQL/MySQL</li>
                <li>❌ Data science/ML workflows → Use Pandas/Polars</li>
                <li>❌ Real-time streaming data → Use Kafka/TimescaleDB</li>
            </ul>
        </>
    );
}
