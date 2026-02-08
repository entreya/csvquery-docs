import { CodeBlock } from '../components/mdx/CodeBlock';

export function CommunicationPage() {
    return (
        <>
            <h1 id="communication">Communication Protocol</h1>
            <p>
                PHP and Go communicate via Unix Domain Sockets using a JSON-based protocol.
            </p>

            <h2 id="unix-domain-sockets">Unix Domain Sockets</h2>
            <p>
                UDS provides ~1ms latency compared to ~200ms for process spawning. The daemon
                is started automatically and runs in the background.
            </p>
            <CodeBlock className="language-text">
                {`Socket path: /tmp/csvquery-<hash>.sock
Protocol: JSON newline-delimited
Encoding: UTF-8`}
            </CodeBlock>

            <h2 id="request-format">Request Format</h2>
            <CodeBlock className="language-json">
                {`{
  "action": "select",
  "csv": "/path/to/data.csv",
  "where": {"STATUS": "active"},
  "limit": 100,
  "offset": 0,
  "select": ["ID", "NAME"],
  "orderBy": {"SCORE": "DESC"}
}`}
            </CodeBlock>

            <h2 id="response-format">Response Format</h2>
            <CodeBlock className="language-json">
                {`{
  "success": true,
  "data": {
    "offsets": [1234, 5678, 9012],
    "count": 3,
    "strategy": "IndexScan",
    "index": "STATUS"
  }
}`}
            </CodeBlock>

            <h2 id="actions">Available Actions</h2>
            <table>
                <thead>
                    <tr><th>Action</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>select</code></td><td>Query rows matching conditions</td></tr>
                    <tr><td><code>count</code></td><td>Count matching rows</td></tr>
                    <tr><td><code>index</code></td><td>Create index on columns</td></tr>
                    <tr><td><code>explain</code></td><td>Get query execution plan</td></tr>
                </tbody>
            </table>

            <h2 id="error-handling">Error Handling</h2>
            <CodeBlock className="language-json">
                {`{
  "success": false,
  "error": {
    "code": "INDEX_NOT_FOUND",
    "message": "No index found for column STATUS"
  }
}`}
            </CodeBlock>
        </>
    );
}
