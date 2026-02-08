import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  base: '/csvquery-docs/',
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeSlug, [rehypePrism, { showLineNumbers: true }]],
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
