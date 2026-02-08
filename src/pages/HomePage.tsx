import { Link } from 'react-router-dom';
import { CodeBlock } from '../components/mdx/CodeBlock';
import styles from './HomePage.module.css';

export function HomePage() {
    return (
        <div className={styles.hero}>
            <div className={styles.badge}>
                <span>🚀 v1.0.0 Released</span>
            </div>

            <h1 className={styles.title}>
                Query <span className={styles.highlight}>Billion-Row</span> CSV Files in Milliseconds
            </h1>

            <p className={styles.subtitle}>
                CsvQuery is a high-performance query engine that treats massive CSV files like searchable databases.
                Built with a PHP + Go hybrid architecture for blazing-fast queries.
            </p>

            <div className={styles.features}>
                <div className={styles.feature}>
                    <span className={styles.featureIcon}>⚡</span>
                    <span className={styles.featureText}>~50ms query latency</span>
                </div>
                <div className={styles.feature}>
                    <span className={styles.featureIcon}>💾</span>
                    <span className={styles.featureText}>&lt;20MB RAM usage</span>
                </div>
                <div className={styles.feature}>
                    <span className={styles.featureIcon}>📊</span>
                    <span className={styles.featureText}>10GB+ file support</span>
                </div>
            </div>

            <div className={styles.cta}>
                <Link to="/getting-started" className={styles.primary}>
                    Get Started →
                </Link>
                <a
                    href="https://github.com/entreya/csvquery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondary}
                >
                    View on GitHub
                </a>
            </div>

            <div className={styles.codePreview}>
                <h2 className={styles.codeHeaderTitle}>Quick Example</h2>
                <div style={{ textAlign: 'left' }}>
                    <CodeBlock language="php">
                        {`$csv = new CsvQuery('/path/to/massive.csv');
$csv->createIndex(['STATUS', 'CATEGORY']);

$results = $csv->find()
    ->where(['STATUS' => 'active'])
    ->andWhere(['>', 'SCORE', 80])
    ->limit(100)
    ->all();  // ~50ms on 10GB file`}
                    </CodeBlock>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statValue}>10GB/s+</span>
                    <span className={styles.statLabel}>SIMD Parse Speed</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>1B+</span>
                    <span className={styles.statLabel}>Rows Tested</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.statValue}>~1ms</span>
                    <span className={styles.statLabel}>IPC Latency</span>
                </div>
            </div>
        </div>
    );
}
