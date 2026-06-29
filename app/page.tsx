import { supabase } from '@/lib/supabase'
import TechnologyList from '@/components/TechnologyList'

export default async function HomePage() {
  const { data: technologies, error } = await supabase
    .from('technologies')
    .select('id, slug, name, full_name, patent_id, industry, confidence')
    .order('confidence', { ascending: false })

  if (error) {
    console.error('Failed to load technologies:', error.message)
  }

  const rows = technologies ?? []

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-2.5">
          {/* Buckeye tree icon — round canopy with bumps + trunk */}
          <svg width="22" height="28" viewBox="0 0 26 30" fill="none" aria-hidden="true">
            <circle cx="4"  cy="14" r="5.5" fill="#BB0000"/>
            <circle cx="13" cy="8"  r="8"   fill="#BB0000"/>
            <circle cx="22" cy="14" r="5.5" fill="#BB0000"/>
            <ellipse cx="13" cy="18" rx="11" ry="7" fill="#BB0000"/>
            <rect x="11" y="22" width="4" height="8" rx="2" fill="#BB0000"/>
          </svg>
          <span className="text-xl font-bold text-gray-950 tracking-tight">Cambium</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Technology Library
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {rows.length} {rows.length === 1 ? 'technology' : 'technologies'} · First-principles investment reports
          </p>
        </div>

        <TechnologyList technologies={rows} />
      </main>
    </div>
  )
}
