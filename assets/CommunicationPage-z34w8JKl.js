import{j as e}from"./index-Z1vyp1WY.js";import{C as s}from"./CodeBlock-PEt4H_Dw.js";import"./MermaidDiagram-DXFfz0sI.js";function r(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"communication",children:"Communication Protocol"}),e.jsx("p",{children:"PHP and Go communicate via Unix Domain Sockets using a JSON-based protocol."}),e.jsx("h2",{id:"unix-domain-sockets",children:"Unix Domain Sockets"}),e.jsx("p",{children:"UDS provides ~1ms latency compared to ~200ms for process spawning. The daemon is started automatically and runs in the background."}),e.jsx(s,{className:"language-text",children:`Socket path: /tmp/csvquery-<hash>.sock
Protocol: JSON newline-delimited
Encoding: UTF-8`}),e.jsx("h2",{id:"request-format",children:"Request Format"}),e.jsx(s,{className:"language-json",children:`{
  "action": "select",
  "csv": "/path/to/data.csv",
  "where": {"STATUS": "active"},
  "limit": 100,
  "offset": 0,
  "select": ["ID", "NAME"],
  "orderBy": {"SCORE": "DESC"}
}`}),e.jsx("h2",{id:"response-format",children:"Response Format"}),e.jsx(s,{className:"language-json",children:`{
  "success": true,
  "data": {
    "offsets": [1234, 5678, 9012],
    "count": 3,
    "strategy": "IndexScan",
    "index": "STATUS"
  }
}`}),e.jsx("h2",{id:"actions",children:"Available Actions"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Action"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"select"})}),e.jsx("td",{children:"Query rows matching conditions"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"count"})}),e.jsx("td",{children:"Count matching rows"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"index"})}),e.jsx("td",{children:"Create index on columns"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"explain"})}),e.jsx("td",{children:"Get query execution plan"})]})]})]}),e.jsx("h2",{id:"error-handling",children:"Error Handling"}),e.jsx(s,{className:"language-json",children:`{
  "success": false,
  "error": {
    "code": "INDEX_NOT_FOUND",
    "message": "No index found for column STATUS"
  }
}`})]})}export{r as CommunicationPage};
