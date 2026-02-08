# CsvQuery Documentation

[![Deploy to GitHub Pages](https://github.com/entreya/csvquery-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/entreya/csvquery-docs/actions/workflows/deploy.yml)

📚 **Live Documentation**: [entreya.github.io/csvquery-docs](https://entreya.github.io/csvquery-docs)

This repository contains the documentation website for [CsvQuery](https://github.com/entreya/csvquery), a high-performance query engine for massive CSV files.

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173/csvquery-docs/`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy

Deployment happens automatically via GitHub Actions when you push to `main`. 

To deploy manually:

```bash
# Build and deploy
npm run build
# Then push the repository and GitHub Actions will deploy
```

## Project Structure

```
csvquery-docs/
├── src/
│   ├── components/     # React components
│   │   ├── layout/     # Header, Sidebar, Footer, Layout
│   │   ├── mdx/        # CodeBlock, Callout
│   │   └── search/     # SearchModal
│   ├── pages/          # Page components
│   ├── hooks/          # React hooks (useTheme)
│   ├── lib/            # Navigation config
│   └── styles/         # CSS tokens and globals
├── public/             # Static assets
└── .github/workflows/  # CI/CD configuration
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Prism.js** - Syntax highlighting
- **CSS Modules** - Scoped styling

## License

MIT - Same as the main CsvQuery project.
