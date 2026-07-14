import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import TechnologyList from '@/components/TechnologyList'
import MetricsSidebar from '@/components/MetricsSidebar'
import { logout } from '@/app/logout/actions'

export default async function HomePage() {
  const { data: technologies, error } = await supabase
    .from('technologies')
    .select('id, slug, name, full_name, patent_id, industry, confidence, trl, zone')
    .order('name', { ascending: true })

  if (error) {
    console.error('Failed to load technologies:', error.message)
  }

  const rows = technologies ?? []

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/cambium-tree-background.svg')" }}>
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-6 h-16 flex items-center gap-3">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-8 w-auto" />
          <div className="flex flex-col leading-tight">
            <Link href="/" className="text-xl font-bold text-gray-950 tracking-tight hover:opacity-75 transition-opacity">Cambium</Link>
            <span className="text-xs text-gray-400 font-normal">The living layer where ideas become ventures</span>
          </div>
          <form action={logout} className="ml-auto">
            <button type="submit" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="flex items-start">
        <MetricsSidebar />

        <main className="flex-1 min-w-0 px-8 py-10">
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
    </div>
  )
}
