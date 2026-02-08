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
        mainBkg: '#1E293B',
        primaryColor: '#1E293B',
        primaryBorderColor: '#8B5CF6',
        nodeBorder: '#8B5CF6',
        clusterBorder: '#8B5CF6',
        primaryTextColor: '#FFFFFF',
        titleColor: '#FFFFFF',
        lineColor: '#94A3B8',
        secondaryColor: '#0F172A',
        tertiaryColor: '#334155',
        edgeLabelBackground: '#1E293B',
    },
};

const LIGHT_THEME = {
    theme: 'base',
    themeVariables: {
        background: '#FFFFFF',
        mainBkg: '#F1F5F9', // Slate 100
        primaryColor: '#F1F5F9',
        primaryBorderColor: '#7C3AED', // Purple 600
        nodeBorder: '#7C3AED',
        clusterBorder: '#7C3AED',
        primaryTextColor: '#1E293B', // Slate 800
        titleColor: '#1E293B',
        lineColor: '#64748B',       // Slate 500
        secondaryColor: '#FFFFFF',
        tertiaryColor: '#E2E8F0',
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
