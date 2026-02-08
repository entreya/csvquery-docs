import{j as e,L as r}from"./index-Z1vyp1WY.js";import{M as i}from"./MermaidDiagram-DXFfz0sI.js";function c(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"architecture",children:"Architecture"}),e.jsx("p",{children:"CsvQuery uses a hybrid PHP + Go architecture to achieve high performance while maintaining a familiar PHP API."}),e.jsx("h2",{id:"overview",children:"Overview"}),e.jsx("p",{children:"The system consists of two main components that communicate via Unix Domain Sockets:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"PHP Layer"})," - Fluent API, query building, result hydration"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Go Engine"})," - SIMD parsing, indexing, binary search, compression"]})]}),e.jsx(i,{chart:`
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
            `}),e.jsx("h2",{id:"key-technologies",children:"Key Technologies"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Component"}),e.jsx("th",{children:"Technology"}),e.jsx("th",{children:"Purpose"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Parsing"})}),e.jsx("td",{children:"AVX2/SSE4.2 SIMD"}),e.jsx("td",{children:"Scan CSV delimiters at hardware speed"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Compression"})}),e.jsx("td",{children:"LZ4"}),e.jsx("td",{children:"10x faster decompression than Gzip"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Storage"})}),e.jsx("td",{children:"mmap"}),e.jsx("td",{children:"Zero-copy file access"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Communication"})}),e.jsx("td",{children:"Unix Domain Sockets"}),e.jsx("td",{children:"~1ms latency vs ~200ms process spawn"})]})]})]}),e.jsx("h2",{id:"sections",children:"Architecture Sections"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(r,{to:"/architecture/php-layer",children:"PHP Layer"})," - Query building, IPC, result hydration"]}),e.jsxs("li",{children:[e.jsx(r,{to:"/architecture/go-engine",children:"Go Engine"})," - SIMD parsing, indexing, search"]}),e.jsxs("li",{children:[e.jsx(r,{to:"/architecture/communication",children:"Communication"})," - UDS protocol, message format"]})]})]})}export{c as ArchitecturePage};
