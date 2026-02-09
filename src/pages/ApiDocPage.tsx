import { useParams, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState, isValidElement, type ReactNode } from 'react';
import { CodeBlock } from '../components/mdx/CodeBlock';

import styles from './ApiDocPage.module.css';

export function ApiDocPage({ section = 'api-reference' }: { section?: string }) {
    const params = useParams();
    const slug = params['*'];

    const [Component, setComponent] = useState<React.ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // ... (mdxComponents logic remains same)
    // Map MDX <pre><code> to our <CodeBlock>
    const mdxComponents = {
        pre: (props: { children?: ReactNode }) => {
            const child = props.children;
            if (isValidElement(child)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const childProps = child.props as any;
                if (childProps?.className) {
                    const language = (childProps.className || '').replace('language-', '');
                    const code = childProps.children;
                    return <CodeBlock code={String(code).trim()} language={language} />;
                }
            }
            return <pre {...props} />;
        },
        // Also ensure inline code looks correct
        code: (props: { className?: string, children?: ReactNode }) => {
            if (props.className) {
                // Block code handled by pre above, this catches standalone code with lang
                const language = props.className.replace('language-', '');
                return <CodeBlock code={String(props.children).trim()} language={language} />;
            }
            return <code {...props} />;
        }
    };

    useEffect(() => {
        if (!slug) return;

        // Handle category redirects (only for api-reference)
        if (section === 'api-reference') {
            if (slug === 'php') {
                navigate('/api/php/csvquery', { replace: true });
                return;
            }
            if (slug === 'go') {
                navigate('/api/go/cli', { replace: true });
                return;
            }
        }

        // Glob all API docs and Internals
        // Note: Vite glob imports must be literal strings. We can't use variables in glob().
        // So we glob everything in docs/ and filter.
        const modules = import.meta.glob('../content/docs/**/*.mdx');

        // Construct target key based on section
        const targetKey = `../content/docs/${section}/${slug}.mdx`;
        const importer = modules[targetKey];

        if (!importer) {
            console.error(`Doc not found for slug: ${slug} (Section: ${section}, Key: ${targetKey})`);
            setError(`Documentation not found: ${section}/${slug}`);
            return;
        }

        // Load the MDX component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        importer().then((mod: any) => {
            setComponent(() => mod.default);
            setError(null);
        }).catch((err) => {
            console.error("Failed to load MDX:", err);
            setError("Failed to load documentation.");
        });

    }, [slug]);

    if (error) {
        return (
            <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
                <h2>404 Not Found</h2>
                <p>{error}</p>
                <p>Available paths might include:</p>
                <ul>
                    <li>php/csvquery</li>
                    <li>go/cli</li>
                </ul>
            </div>
        );
    }

    if (!Component) {
        return <div style={{ padding: '2rem' }}>Loading API documentation...</div>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MDXContent = Component as any;

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.contentArea}>
                <main className={styles.markdown}>
                    <Suspense fallback={<div>Loading content...</div>}>
                        <MDXContent components={mdxComponents} />
                    </Suspense>
                </main>
            </div>

        </div>
    );
}
