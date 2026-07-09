import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import MetricsSidebar from '@/components/MetricsSidebar'
import ReportEditor from '@/components/ReportEditor'
import { logout } from '@/app/logout/actions'

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [{ data, error }, cookieStore] = await Promise.all([
    supabase
      .from('technologies')
      .select('slug, name, full_name, industry, trl, confidence, zone, report_markdown')
      .eq('slug', id)
      .single(),
    cookies(),
  ])

  const tech = data as {
    slug: string
    name: string
    full_name: string
    industry: string
    trl: number
    confidence: number
    zone: string
    report_markdown: string
  } | null

  if (error || !tech) notFound()

  const isAdmin = cookieStore.get('admin')?.value === 'true'

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-scarlet transition-colors flex items-center gap-1.5"
          >
            <span aria-hidden>←</span> Technology Library
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-900 hover:text-scarlet transition-colors">
            Cambium
          </Link>
          <form action={logout}>
            <button type="submit" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <div className="flex items-start">
        <MetricsSidebar />

        <main className="flex-1 min-w-0 px-8 py-12">
          <ReportEditor
            slug={tech.slug}
            isAdmin={isAdmin}
            initialName={tech.name}
            initialFullName={tech.full_name}
            initialIndustry={tech.industry}
            initialTrl={tech.trl}
            initialConfidence={tech.confidence}
            initialZone={tech.zone}
            initialMarkdown={tech.report_markdown}
          />
        </main>
      </div>
    </div>
  )
}
