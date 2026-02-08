import { useParams, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

import styles from './ApiDocPage.module.css';

export function ApiDocPage() {
    const params = useParams();
    const slug = params['*'];

    const [Component, setComponent] = useState<React.ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) return;

        // Handle category redirects
        if (slug === 'php') {
            navigate('/api/php/csvquery', { replace: true });
            return;
        }
        if (slug === 'go') {
            navigate('/api/go/cli', { replace: true });
            return;
        }

        // Glob all API docs
        const modules = import.meta.glob('../content/docs/api-reference/**/*.mdx');

        // Try to match slug to file
        const targetKey = `../content/docs/api-reference/${slug}.mdx`;
        const importer = modules[targetKey];

        if (!importer) {
            console.error(`Doc not found for slug: ${slug} (Key: ${targetKey})`);
            setError(`Documentation not found: ${slug}`);
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

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.contentArea}>
                <main className={styles.markdown}>
                    <Suspense fallback={<div>Loading content...</div>}>
                        <Component />
                    </Suspense>
                </main>
            </div>

        </div>
    );
}
