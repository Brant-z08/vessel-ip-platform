import Link from 'next/link'
import { technologies } from '@/lib/technologies'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav — matches detail page */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-sm font-medium text-gray-900">OSU IP Platform</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Technology Library
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {technologies.length} {technologies.length === 1 ? 'technology' : 'technologies'} · First-principles investment reports
          </p>
        </div>

        {/* List */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_140px_100px_32px] gap-4 items-center px-5 py-2.5 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Technology</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industry</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Confidence</span>
            <span />
          </div>

          {/* Rows */}
          {technologies.map((tech, i) => (
            <Link
              key={tech.id}
              href={`/technologies/${tech.id}`}
              className={`
                grid grid-cols-[1fr_140px_100px_32px] gap-4 items-center
                px-5 py-4 group transition-colors hover:bg-gray-50
                ${i < technologies.length - 1 ? 'border-b border-gray-200' : ''}
              `}
            >
              {/* Name + metadata */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:underline underline-offset-2">
                  {tech.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {tech.patentId} · {tech.fullName}
                </p>
              </div>

              {/* Industry tag */}
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 w-fit">
                {tech.industry}
              </span>

              {/* Confidence score */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-900">{tech.confidence}</span>
                <span className="text-xs text-gray-400">/ 10</span>
              </div>

              {/* Arrow */}
              <span className="text-gray-300 group-hover:text-gray-600 transition-colors text-base leading-none justify-self-end">
                →
              </span>
            </Link>
          ))}
        </div>

      </main>
    </div>
  )
}
