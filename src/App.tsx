import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Layout } from './components/layout/Layout';
import { TabsProvider } from './components/layout/TabsContext';
import { ScrollToTop } from './components/layout/ScrollToTop';
import './styles/globals.css';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const GettingStartedPage = lazy(() => import('./pages/GettingStartedPage').then(module => ({ default: module.GettingStartedPage })));
const InstallationPage = lazy(() => import('./pages/InstallationPage').then(module => ({ default: module.InstallationPage })));
const QuickStartPage = lazy(() => import('./pages/QuickStartPage').then(module => ({ default: module.QuickStartPage })));
const ExamplesPage = lazy(() => import('./pages/ExamplesPage').then(module => ({ default: module.ExamplesPage })));
const RequirementsPage = lazy(() => import('./pages/RequirementsPage').then(module => ({ default: module.RequirementsPage })));
const ApiPage = lazy(() => import('./pages/ApiPage').then(module => ({ default: module.ApiPage })));
const CsvQueryPage = lazy(() => import('./pages/CsvQueryPage').then(module => ({ default: module.CsvQueryPage })));
const ActiveQueryPage = lazy(() => import('./pages/ActiveQueryPage').then(module => ({ default: module.ActiveQueryPage })));
const ConditionsPage = lazy(() => import('./pages/ConditionsPage').then(module => ({ default: module.ConditionsPage })));
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage').then(module => ({ default: module.ArchitecturePage })));
const PhpLayerPage = lazy(() => import('./pages/PhpLayerPage').then(module => ({ default: module.PhpLayerPage })));
const GoEnginePage = lazy(() => import('./pages/GoEnginePage').then(module => ({ default: module.GoEnginePage })));
const CommunicationPage = lazy(() => import('./pages/CommunicationPage').then(module => ({ default: module.CommunicationPage })));
const BenchmarksPage = lazy(() => import('./pages/BenchmarksPage').then(module => ({ default: module.BenchmarksPage })));
const PerformancePage = lazy(() => import('./pages/PerformancePage').then(module => ({ default: module.PerformancePage })));
const ComparisonsPage = lazy(() => import('./pages/ComparisonsPage').then(module => ({ default: module.ComparisonsPage })));

// Loading fallback
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '200px',
    color: 'var(--text-tertiary)'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/csvquery-docs">
        <TabsProvider>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                {/* Getting Started */}
                <Route path="getting-started" element={<GettingStartedPage />} />
                <Route path="getting-started/installation" element={<InstallationPage />} />
                <Route path="getting-started/quick-start" element={<QuickStartPage />} />
                <Route path="getting-started/examples" element={<ExamplesPage />} />
                <Route path="getting-started/requirements" element={<RequirementsPage />} />

                {/* API Reference */}
                <Route path="api" element={<ApiPage />} />
                <Route path="api/csvquery" element={<CsvQueryPage />} />
                <Route path="api/activequery" element={<ActiveQueryPage />} />
                <Route path="api/conditions" element={<ConditionsPage />} />
                {/* Removed Internal Reference route */}

                {/* Architecture */}
                <Route path="architecture" element={<ArchitecturePage />} />
                <Route path="architecture/php-layer" element={<PhpLayerPage />} />
                <Route path="architecture/go-engine" element={<GoEnginePage />} />
                <Route path="architecture/communication" element={<CommunicationPage />} />

                {/* Benchmarks */}
                <Route path="benchmarks" element={<BenchmarksPage />} />
                <Route path="benchmarks/performance" element={<PerformancePage />} />
                <Route path="benchmarks/comparisons" element={<ComparisonsPage />} />
              </Route>
            </Routes>
          </Suspense>
        </TabsProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
