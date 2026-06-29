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
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-sm font-medium text-gray-900">Cambium</span>
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
