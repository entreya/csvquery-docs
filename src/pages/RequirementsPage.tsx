export function RequirementsPage() {
    return (
        <>
            <h1 id="system-requirements">System Requirements</h1>
            <p>CsvQuery is designed to run on modern systems with minimal dependencies.</p>

            <h2 id="minimum-requirements">Minimum Requirements</h2>
            <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Requirement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><strong>PHP</strong></td><td>8.1 or higher</td></tr>
                    <tr><td><strong>Go</strong></td><td>1.21 or higher (for building from source)</td></tr>
                    <tr><td><strong>RAM</strong></td><td>Minimum 512MB, 2GB+ recommended</td></tr>
                    <tr><td><strong>Disk</strong></td><td>Index files are ~20% of CSV size</td></tr>
                </tbody>
            </table>

            <h2 id="platform-support">Platform Support</h2>
            <table>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Architecture</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Linux</td><td>x86_64, arm64</td><td>✅ Fully Supported</td></tr>
                    <tr><td>macOS</td><td>x86_64, arm64 (Apple Silicon)</td><td>✅ Fully Supported</td></tr>
                    <tr><td>Windows</td><td>x86_64</td><td>✅ Fully Supported</td></tr>
                </tbody>
            </table>

            <h2 id="php-extensions">PHP Extensions</h2>
            <ul>
                <li><strong>json</strong> - For JSON encoding/decoding (usually bundled)</li>
                <li><strong>mbstring</strong> - For multibyte string support</li>
                <li><strong>sockets</strong> - For Unix Domain Socket communication (optional but recommended)</li>
            </ul>

            <h2 id="simd-support">SIMD Acceleration</h2>
            <p>CsvQuery uses SIMD instructions for maximum parsing performance:</p>
            <ul>
                <li><strong>AVX2</strong> - Intel Haswell (2013) and newer, AMD Excavator (2015) and newer</li>
                <li><strong>SSE4.2</strong> - Fallback for older CPUs</li>
                <li><strong>ARM NEON</strong> - Apple Silicon and ARM64 servers</li>
            </ul>
            <p>The binary automatically detects and uses the best available instruction set.</p>
        </>
    );
}
