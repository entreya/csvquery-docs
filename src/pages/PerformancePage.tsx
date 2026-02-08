export function PerformancePage() {
    return (
        <>
            <h1 id="performance-tests">Performance Tests</h1>
            <p>
                Detailed breakdown of CsvQuery performance across different scenarios.
            </p>

            <h2 id="indexing-benchmarks">Indexing Benchmarks</h2>
            <h3 id="single-column">Single Column Index</h3>
            <table>
                <thead>
                    <tr><th>Rows</th><th>Time</th><th>Index Size</th><th>Compression Ratio</th></tr>
                </thead>
                <tbody>
                    <tr><td>100,000</td><td>0.3s</td><td>8MB</td><td>12:1</td></tr>
                    <tr><td>1,000,000</td><td>2.5s</td><td>80MB</td><td>10:1</td></tr>
                    <tr><td>10,000,000</td><td>25s</td><td>750MB</td><td>8:1</td></tr>
                </tbody>
            </table>

            <h3 id="composite-index">Composite Index (2 columns)</h3>
            <table>
                <thead>
                    <tr><th>Rows</th><th>Time</th><th>Index Size</th></tr>
                </thead>
                <tbody>
                    <tr><td>100,000</td><td>0.4s</td><td>12MB</td></tr>
                    <tr><td>1,000,000</td><td>3s</td><td>120MB</td></tr>
                    <tr><td>10,000,000</td><td>30s</td><td>1.1GB</td></tr>
                </tbody>
            </table>

            <h2 id="query-benchmarks">Query Benchmarks</h2>
            <h3 id="indexed-queries">Indexed Queries (1M rows)</h3>
            <table>
                <thead>
                    <tr><th>Operation</th><th>Result Size</th><th>Latency</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>count()</code></td><td>-</td><td>10ms</td></tr>
                    <tr><td><code>where(['X' =&gt; 'Y'])-&gt;count()</code></td><td>0 matches</td><td>14ms</td></tr>
                    <tr><td><code>where(['X' =&gt; 'Y'])-&gt;count()</code></td><td>150K matches</td><td>25ms</td></tr>
                    <tr><td><code>where(['X' =&gt; 'Y'])-&gt;all()</code></td><td>100 rows</td><td>35ms</td></tr>
                    <tr><td><code>where(['X' =&gt; 'Y'])-&gt;all()</code></td><td>1K rows</td><td>50ms</td></tr>
                    <tr><td><code>where(['X' =&gt; 'Y'])-&gt;all()</code></td><td>10K rows</td><td>120ms</td></tr>
                </tbody>
            </table>

            <h3 id="full-scan">Full Table Scan (no index)</h3>
            <table>
                <thead>
                    <tr><th>Rows</th><th>Scan Time</th></tr>
                </thead>
                <tbody>
                    <tr><td>100,000</td><td>200ms</td></tr>
                    <tr><td>1,000,000</td><td>2s</td></tr>
                    <tr><td>10,000,000</td><td>20s</td></tr>
                </tbody>
            </table>

            <h2 id="scalability">Scalability</h2>
            <p>
                Query latency remains nearly constant as data grows, thanks to binary search
                on sorted indexes:
            </p>
            <table>
                <thead>
                    <tr><th>Rows</th><th>Indexed Query</th><th>Growth Factor</th></tr>
                </thead>
                <tbody>
                    <tr><td>100K</td><td>12ms</td><td>1x</td></tr>
                    <tr><td>1M</td><td>15ms</td><td>1.25x</td></tr>
                    <tr><td>10M</td><td>20ms</td><td>1.67x</td></tr>
                    <tr><td>100M</td><td>28ms</td><td>2.33x</td></tr>
                </tbody>
            </table>
            <p>
                Query time grows logarithmically with data size (O(log n) for binary search).
            </p>
        </>
    );
}
