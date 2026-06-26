import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
        Technology Library
      </h1>
      <p className="mt-2 text-sm text-gray-500 mb-8">
        First-principles investment reports on Ohio State technologies.
      </p>

      {/* Placeholder — will be replaced with the full sortable list */}
      <div className="border border-gray-200 rounded-xl overflow-hidden max-w-2xl">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
          Demo Report
        </div>
        <Link
          href="/technologies/diamond"
          className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors group"
        >
          <div>
            <p className="text-sm font-medium text-gray-900 group-hover:underline">
              DIAMOND — TS-074364
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Data-Driven Inspection, Alerts, Maintenance, Observable Network Decision
            </p>
          </div>
          <span className="text-gray-400 group-hover:text-gray-700 transition-colors text-sm">→</span>
        </Link>
      </div>
    </main>
  )
}
