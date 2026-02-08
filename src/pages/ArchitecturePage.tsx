import { Link } from 'react-router-dom';
import { MermaidDiagram } from '../components/mdx/MermaidDiagram';

export function ArchitecturePage() {
    return (
        <>
            <h1 id="architecture">Architecture</h1>
            <p>
                CsvQuery uses a hybrid PHP + Go architecture to achieve high performance
                while maintaining a familiar PHP API.
            </p>

            <h2 id="overview">Overview</h2>
            <p>
                The system consists of two main components that communicate via Unix Domain Sockets:
            </p>
            <ul>
                <li><strong>PHP Layer</strong> - Fluent API, query building, result hydration</li>
                <li><strong>Go Engine</strong> - SIMD parsing, indexing, binary search, compression</li>
            </ul>

            <MermaidDiagram chart={`
graph TD
    subgraph PHP[PHP Application]
        CsvQuery --> ActiveQuery
        ActiveQuery --> GoBridge
    end
    
    subgraph Go[Go Engine]
        GoBridge -- "JSON/UDS" --> UDSDaemon
        UDSDaemon --> QueryEngine
        QueryEngine --> IndexReader
        
        SIMDScan[SIMD Parse]
        BinarySearch
        LZ4[LZ4 Decompress]
        
        QueryEngine --> SIMDScan
        QueryEngine --> BinarySearch
        IndexReader --> LZ4
    end
    
    subgraph Storage[Disk Storage]
        CSV[CSV File]
        CIDX[.cidx Index]
        Updates[_updates.json]
        
        SIMDScan --> CSV
        BinarySearch --> CIDX
        IndexReader --> Updates
    end
            `} />

            <h2 id="key-technologies">Key Technologies</h2>
            <table>
                <thead>
                    <tr><th>Component</th><th>Technology</th><th>Purpose</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Parsing</strong></td>
                        <td>AVX2/SSE4.2 SIMD</td>
                        <td>Scan CSV delimiters at hardware speed</td>
                    </tr>
                    <tr>
                        <td><strong>Compression</strong></td>
                        <td>LZ4</td>
                        <td>10x faster decompression than Gzip</td>
                    </tr>
                    <tr>
                        <td><strong>Storage</strong></td>
                        <td>mmap</td>
                        <td>Zero-copy file access</td>
                    </tr>
                    <tr>
                        <td><strong>Communication</strong></td>
                        <td>Unix Domain Sockets</td>
                        <td>~1ms latency vs ~200ms process spawn</td>
                    </tr>
                </tbody>
            </table>

            <h2 id="sections">Architecture Sections</h2>
            <ul>
                <li><Link to="/architecture/php-layer">PHP Layer</Link> - Query building, IPC, result hydration</li>
                <li><Link to="/architecture/go-engine">Go Engine</Link> - SIMD parsing, indexing, search</li>
                <li><Link to="/architecture/communication">Communication</Link> - UDS protocol, message format</li>
            </ul>
        </>
    );
}
