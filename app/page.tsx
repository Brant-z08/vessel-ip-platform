import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import TechnologyList from '@/components/TechnologyList'
import MetricsSidebar from '@/components/MetricsSidebar'

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
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-2.5">
          {/* Buckeye tree icon */}
          <svg width="32" height="32" viewBox="0 0 200 200" aria-hidden="true">
            <g fill="none" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M100,18 C85,22 75,30 70,40 L55,38 L60,45 L45,48 L55,55 L35,60 L48,68 L28,75 L42,82 L25,92 L40,98 L30,110 L48,115 L40,128 L58,132 L52,145 L72,148 L68,158 L85,160 L92,142" />
              <path d="M100,18 C115,22 125,30 130,40 L145,38 L140,45 L155,48 L145,55 L165,60 L152,68 L172,75 L158,82 L175,92 L160,98 L170,110 L152,115 L160,128 L142,132 L148,145 L128,148 L132,158 L115,160 L108,142" />
              <circle cx="100" cy="105" r="12" />
            </g>
            <path fill="#111111" d="M100,18 C75,25 60,40 55,55 C40,60 30,72 28,82 C26,95 35,105 45,108 C40,118 48,128 58,132 C55,142 65,150 78,152 C85,158 95,160 100,158 C105,160 115,158 122,152 C135,150 145,142 142,132 C152,128 160,118 155,108 C165,105 174,95 172,82 C170,72 160,60 145,55 C140,40 125,25 100,18 Z M92,142 L92,175 C92,182 88,188 82,192 L118,192 C112,188 108,182 108,175 L108,142 Z" />
            <circle fill="#111111" cx="100" cy="105" r="5" />
            <circle fill="#111111" cx="96" cy="101" r="2" />
            <g fill="none" stroke="#111111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M94,150 L94,185" /><path d="M100,148 L100,182" /><path d="M106,150 L106,185" />
              <path d="M96,160 L104,162" /><path d="M95,172 L103,170" /><path d="M97,180 L105,178" />
              <path d="M70,65 Q85,75 100,72" /><path d="M130,65 Q115,75 100,72" />
              <path d="M50,85 Q70,92 85,88" /><path d="M150,85 Q130,92 115,88" />
              <path d="M75,110 Q88,115 100,112" /><path d="M125,110 Q112,115 100,112" />
              <path d="M60,50 Q55,42 52,48 Q58,52 60,50" /><path d="M140,50 Q145,42 148,48 Q142,52 140,50" />
              <path d="M45,75 Q38,68 35,75 Q42,78 45,75" /><path d="M155,75 Q162,68 165,75 Q158,78 155,75" />
              <path d="M55,105 Q48,98 45,105 Q52,108 55,105" /><path d="M145,105 Q152,98 155,105 Q148,108 145,105" />
              <path d="M75,125 Q70,118 68,125 Q73,128 75,125" /><path d="M125,125 Q130,118 132,125 Q127,128 125,125" />
              <path d="M82,192 Q72,195 65,198" /><path d="M88,192 Q85,196 80,199" />
              <path d="M112,192 Q115,196 120,199" /><path d="M118,192 Q128,195 135,198" />
              <path d="M100,93 Q102,88 105,90" /><path d="M98,93 Q96,88 93,90" />
              <path d="M60,198 Q100,202 140,198" />
            </g>
          </svg>
          <Link href="/" className="text-xl font-bold text-gray-950 tracking-tight hover:opacity-75 transition-opacity">Cambium</Link>
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
