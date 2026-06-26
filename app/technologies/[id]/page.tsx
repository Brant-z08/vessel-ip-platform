import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Maps URL slugs to report files in content/reports/
const REPORT_FILES: Record<string, string> = {
  diamond: 'diamond.md',
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const filename = REPORT_FILES[id]
  if (!filename) notFound()

  const filePath = path.join(process.cwd(), 'content', 'reports', filename)
  const markdown = fs.readFileSync(filePath, 'utf-8')

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav bar */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5"
          >
            <span aria-hidden>←</span> Technology Library
          </Link>
          <span className="text-sm font-medium text-gray-900">OSU IP Platform</span>
        </div>
      </nav>

      {/* Report body */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article
          className="
            prose prose-gray max-w-none

            /* Headings */
            prose-h1:text-2xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:text-gray-950
            prose-h2:text-lg prose-h2:font-semibold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-3
            prose-h3:text-base prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-6 prose-h3:mb-2

            /* Body text */
            prose-p:text-gray-700 prose-p:leading-7
            prose-strong:text-gray-900 prose-strong:font-semibold

            /* Tables */
            prose-table:text-sm
            prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 prose-th:bg-gray-50 prose-th:py-2 prose-th:px-4
            prose-td:text-gray-700 prose-td:py-2 prose-td:px-4 prose-td:align-top
            prose-thead:border-b prose-thead:border-gray-200

            /* Horizontal rules — used as section dividers */
            prose-hr:border-gray-200 prose-hr:my-8

            /* Links */
            prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-gray-600

            /* Lists */
            prose-li:text-gray-700 prose-li:leading-7
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </main>
    </div>
  )
}
