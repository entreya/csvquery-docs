import React, { useState, useCallback, Component, type ErrorInfo, type ReactNode } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import styles from './CodeBlock.module.css';
import { MermaidDiagram } from './MermaidDiagram';

interface CodeBlockProps {
    children?: React.ReactNode;
    code?: string;
    className?: string; // used for language-xxx class if language prop not provided
    language?: string;
    title?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class CodeBlockErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('CodeBlock error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.language}>code</span>
                    </div>
                    <pre className={styles.pre}>
                        <code className={styles.code}>Error rendering code block</code>
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

function extractText(node: React.ReactNode): string {
    if (node === null || node === undefined) {
        return '';
    }
    if (typeof node === 'string') {
        return node;
    }
    if (typeof node === 'number') {
        return String(node);
    }
    if (typeof node === 'boolean') {
        return '';
    }
    if (Array.isArray(node)) {
        return node.map(extractText).join('');
    }
    if (React.isValidElement(node)) {
        const props = node.props as { children?: React.ReactNode };
        if (props && props.children !== undefined) {
            return extractText(props.children);
        }
    }
    return '';
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function CodeBlockInner({ children, code: codeProp, className, language: languageProp, title }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    // Prefer explicit code prop, then fallback to children
    const code = codeProp || extractText(children).trim();

    // Helper to get clean language from class
    const getLanguageFromClass = (cls?: string) => {
        if (!cls) return 'text';
        return cls.replace(/language-/, '');
    };

    // Prefer explicit language prop, fallback to class
    const language = languageProp || getLanguageFromClass(className) || 'text';

    // If language is mermaid, render the diagram component directly
    if (language === 'mermaid') {
        return <MermaidDiagram chart={code} />;
    }

    let highlighted: string;
    try {
        highlighted = language !== 'text' && Prism.languages[language]
            ? Prism.highlight(code, Prism.languages[language], language)
            : escapeHtml(code);
    } catch {
        highlighted = escapeHtml(code);
    }

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [code]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.language}>{title || language}</span>
                <button
                    className={styles.copyButton}
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied!' : 'Copy code'}
                >
                    {copied ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className={styles.pre}>
                <code
                    className={`${styles.code} language-${language}`}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                />
            </pre>
        </div>
    );
}

export function CodeBlock(props: CodeBlockProps) {
    return (
        <CodeBlockErrorBoundary>
            <CodeBlockInner {...props} />
        </CodeBlockErrorBoundary>
    );
}
