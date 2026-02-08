import { Link } from 'react-router-dom';
import { Callout } from '../components/mdx/Callout';

export function BenchmarksPage() {
    return (
        <>
            <h1 id="benchmarks">Benchmarks</h1>
            <p>
                Performance benchmarks on various dataset sizes.
            </p>

            <h2 id="test-environment">Test Environment</h2>
            <table>
                <thead>
                    <tr><th>Spec</th><th>Value</th></tr>
                </thead>
                <tbody>
                    <tr><td>CPU</td><td>Apple M1 Pro / Intel i7-12700K</td></tr>
                    <tr><td>RAM</td><td>16GB / 32GB</td></tr>
                    <tr><td>Storage</td><td>NVMe SSD</td></tr>
                    <tr><td>OS</td><td>macOS 14 / Ubuntu 22.04</td></tr>
                </tbody>
            </table>

            <h2 id="indexing-performance">Indexing Performance</h2>
            <table>
                <thead>
                    <tr><th>Rows</th><th>File Size</th><th>Index Time</th><th>Throughput</th></tr>
                </thead>
                <tbody>
                    <tr><td>1,000,000</td><td>~500MB</td><td>2.5s</td><td>400K rows/sec</td></tr>
                    <tr><td>10,000,000</td><td>~5GB</td><td>25s</td><td>400K rows/sec</td></tr>
                    <tr><td>18,000,000</td><td>~10GB</td><td>50s</td><td>360K rows/sec</td></tr>
                </tbody>
            </table>

            <h2 id="query-latency">Query Latency (1M rows)</h2>
            <table>
                <thead>
                    <tr><th>Query Type</th><th>Hits</th><th>Latency</th></tr>
                </thead>
                <tbody>
                    <tr><td>COUNT(*) no filter</td><td>N/A</td><td>~10ms</td></tr>
                    <tr><td>COUNT with indexed filter</td><td>0</td><td>~14ms</td></tr>
                    <tr><td>COUNT with indexed filter</td><td>150K</td><td>~25ms</td></tr>
                    <tr><td>SELECT with filter</td><td>1K rows</td><td>~50ms</td></tr>
                    <tr><td>Full table scan</td><td>N/A</td><td>~2000ms</td></tr>
                </tbody>
            </table>

            <Callout type="tip" title="Zero-IO Index Scans">
                When your query (e.g., <code>COUNT(*)</code>) can be satisfied entirely by
                index metadata, the engine skips reading the CSV file altogether.
            </Callout>

            <h2 id="memory-usage">Memory Usage</h2>
            <p>
                CsvQuery uses mmap for file access, keeping memory usage constant regardless
                of file size:
            </p>
            <table>
                <thead>
                    <tr><th>File Size</th><th>Memory Usage</th></tr>
                </thead>
                <tbody>
                    <tr><td>500MB</td><td>~18MB</td></tr>
                    <tr><td>5GB</td><td>~18MB</td></tr>
                    <tr><td>10GB</td><td>~20MB</td></tr>
                </tbody>
            </table>

            <h2 id="more-benchmarks">More Details</h2>
            <ul>
                <li><Link to="/benchmarks/performance">Detailed Performance Tests</Link></li>
                <li><Link to="/benchmarks/comparisons">Comparisons vs MySQL, Pandas</Link></li>
            </ul>
        </>
    );
}
