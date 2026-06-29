import { supabase } from '@/lib/supabase'
import TechnologyList from '@/components/TechnologyList'
import TreeMotif from '@/components/TreeMotif'

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
    <div className="min-h-screen relative overflow-hidden">
      <TreeMotif />

      <nav className="border-b border-gray-200 bg-white/95 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-sm font-medium text-gray-900">Cambium</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-8 border border-white/60 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Technology Library
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {rows.length} {rows.length === 1 ? 'technology' : 'technologies'} · First-principles investment reports
            </p>
          </div>

          <TechnologyList technologies={rows} />
        </div>
      </main>
    </div>
  )
}
