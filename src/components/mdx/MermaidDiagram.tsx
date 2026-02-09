import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import styles from './MermaidDiagram.module.css';
import { useTheme } from '../../hooks/useTheme';

interface MermaidDiagramProps {
    chart: string;
}

const DARK_THEME = {
    theme: 'base',
    themeVariables: {
        background: '#1E293B',
        mainBkg: '#334155',      // Lighter background for nodes (Slate 700)
        primaryColor: '#334155',
        primaryBorderColor: '#94A3B8', // High contrast border (Slate 400)
        nodeBorder: '#94A3B8',
        clusterBorder: '#94A3B8',
        primaryTextColor: '#F8FAFC',   // White text (Slate 50)
        titleColor: '#F8FAFC',
        lineColor: '#CBD5E1',          // Light lines (Slate 300)
        secondaryColor: '#0F172A',
        tertiaryColor: '#475569',
        edgeLabelBackground: '#1E293B',
    },
};

const LIGHT_THEME = {
    theme: 'base',
    themeVariables: {
        background: '#FFFFFF',
        mainBkg: '#FFFFFF',
        primaryColor: '#FFFFFF',
        primaryBorderColor: '#475569', // High contrast border (Slate 600)
        nodeBorder: '#475569',
        clusterBorder: '#475569',
        primaryTextColor: '#0F172A',   // Dark text (Slate 900)
        titleColor: '#0F172A',
        lineColor: '#334155',          // Dark lines (Slate 700)
        secondaryColor: '#F8FAFC',
        tertiaryColor: '#F1F5F9',
        edgeLabelBackground: '#FFFFFF',
    },
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Re-initialize mermaid when theme changes
        mermaid.initialize({
            startOnLoad: false,
            // Cast to any because the theme string 'base' is technically correct but types can vary
            ...((theme === 'dark' ? DARK_THEME : LIGHT_THEME) as any),
            flowchart: {
                curve: 'basis',
                padding: 20,
            },
        });
    }, [theme]);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!containerRef.current || !chart.trim()) return;

            try {
                // Determine theme-specific ID to force re-render on theme change
                const id = `mermaid-${theme}-${Math.random().toString(36).substr(2, 9)}`;

                // Clear previous SVG content to avoid flickering/artifacts
                setSvg('');

                const { svg } = await mermaid.render(id, chart.trim());
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error('Mermaid rendering error:', err);
                setError('Failed to render diagram');
            }
        };

        renderDiagram();
    }, [chart, theme]); // Re-render when chart OR theme changes

    if (error) {
        return (
            <div className={styles.error}>
                <span className={styles.errorIcon}>⚠️</span>
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
