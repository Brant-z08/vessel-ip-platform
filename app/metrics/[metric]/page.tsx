import { notFound } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/app/logout/actions'

const METRICS: Record<string, {
  title: string
  range: string
  intro: string
  scale: { label: string; description: string }[]
  note?: string
}> = {
  confidence: {
    title: 'Confidence Score',
    range: '1–10',
    intro: 'Reflects how much evidence exists that a technology can actually deliver on its stated performance in real conditions.',
    scale: [
      {
        label: '1–2',
        description: 'Basic concept only — no experimental validation. The hypothesis exists but has not been tested.',
      },
      {
        label: '3–4',
        description: 'Lab-validated — performance demonstrated under controlled conditions, but not in a realistic environment with users or real-world constraints.',
      },
      {
        label: '5–6',
        description: 'Demonstrated in a relevant environment — a working prototype or early pilot has shown the technology performs as claimed outside a lab setting.',
      },
      {
        label: '7–8',
        description: 'Early market proof — a real product exists and first customers have adopted it. Some revenue or user data is available.',
      },
      {
        label: '9–10',
        description: 'Fully deployed — the technology is in active commercial use, generating revenue, and demonstrably displacing incumbents.',
      },
    ],
    note: 'Most university technologies from OSU sit in the 3–5 range. A score below 4 does not disqualify a technology — it simply means the investment thesis rests more on projected performance than demonstrated performance.',
  },

  zone: {
    title: 'Zone',
    range: '1–3',
    intro: 'Drawn from the Vessel investment thesis, the Zone describes the type of market displacement a technology is capable of creating, mapped on two axes: cost and buyer experience.',
    scale: [
      {
        label: 'Zone 1',
        description: 'Incremental improvement — a modest cost reduction or a modest experience improvement, but not both. Incumbents can replicate or undercut this within a normal product cycle. Venture-scale returns are unlikely.',
      },
      {
        label: 'Zone 2',
        description: 'Single-axis displacement — a significant gain on one axis (e.g., the same experience at dramatically lower cost, or a far better experience at comparable cost). Creates a real switching case for buyers, but the market response may close the gap.',
      },
      {
        label: 'Zone 3',
        description: 'Dual-axis displacement — a substantially better experience at a substantially lower cost, simultaneously. These are the rare opportunities that create new markets or collapse incumbents. This is where Vessel focuses.',
      },
    ],
  },

  trl: {
    title: 'Technology Readiness Level',
    range: '1–9',
    intro: "A standardized scale, widely used by NASA, the U.S. Department of Energy, and academic institutions, for describing a technology's current state of development from initial concept to operational deployment.",
    scale: [
      { label: 'TRL 1', description: 'Basic principles observed — foundational science has identified the phenomenon or effect.' },
      { label: 'TRL 2', description: 'Technology concept formulated — the application has been proposed but not yet validated.' },
      { label: 'TRL 3', description: 'Experimental proof of concept — lab experiments or simulations confirm the basic concept works.' },
      { label: 'TRL 4', description: 'Technology validated in a lab — the core components have been tested and validated together in a controlled setting.' },
      { label: 'TRL 5', description: 'Technology validated in a relevant environment — testing occurs under conditions more representative of real use.' },
      { label: 'TRL 6', description: 'Technology demonstrated in a relevant environment — a representative prototype has been demonstrated.' },
      { label: 'TRL 7', description: 'System prototype demonstrated in an operational environment — a near-final version has been tested in real conditions.' },
      { label: 'TRL 8', description: 'System complete and qualified — the technology is ready for deployment and has passed qualification testing.' },
      { label: 'TRL 9', description: 'Actual system proven in operational environment — the technology is deployed and operational.' },
    ],
    note: 'Most university research sits between TRL 2 and 4. TRL 6+ is uncommon for early-stage academic IP and represents a meaningful de-risking milestone.',
  },
}

export default async function MetricPage({
  params,
}: {
  params: Promise<{ metric: string }>
}) {
  const { metric } = await params
  const content = METRICS[metric]

  if (!content) notFound()

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-6 h-14 flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <Link href="/" className="text-sm font-bold text-gray-950 tracking-tight hover:opacity-75 transition-opacity">Cambium</Link>
            <span className="text-xs text-gray-400 font-normal">The living layer where ideas become ventures</span>
          </div>
          <div className="ml-auto flex items-center gap-5">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-scarlet transition-colors flex items-center gap-1.5"
            >
              <span aria-hidden>←</span> Technology Library
            </Link>
            <form action={logout}>
              <button type="submit" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Metric</p>
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">
          {content.title}
        </h1>
        <p className="text-sm text-gray-400 mt-1 mb-8">{content.range} scale</p>

        <p className="text-gray-700 leading-7 mb-10">{content.intro}</p>

        <div className="space-y-5">
          {content.scale.map((item, i) => (
            <div key={i} className="flex gap-5 items-start">
              <div className="shrink-0 w-16 text-right pt-0.5">
                <span className="text-sm font-semibold text-scarlet">{item.label}</span>
              </div>
              <div className="flex-1 border-l border-gray-200 pl-5 pb-1">
                <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {content.note && (
          <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">{content.note}</p>
          </div>
        )}
      </main>
    </div>
  )
}
