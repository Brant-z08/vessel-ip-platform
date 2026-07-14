'use client'

import { useState } from 'react'
import Link from 'next/link'

const METRICS = [
  { id: 'confidence', label: 'Confidence Score', range: '1–10' },
  { id: 'zone', label: 'Zone', range: '1–3' },
  { id: 'trl', label: 'Technology Readiness Level', range: '1–9' },
]

export default function MetricsSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <div className="hidden lg:flex shrink-0 w-10 flex-col items-center min-h-[calc(100vh-56px)]">
        <div className="sticky top-14 mt-3 mx-1 flex flex-col items-center gap-3 bg-white rounded-2xl shadow-sm py-3 px-1">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Open metrics"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <span className="text-xs text-gray-400 [writing-mode:vertical-rl] rotate-180 tracking-wide">
            Metrics
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="hidden lg:block shrink-0 w-60 min-h-[calc(100vh-56px)]">
      <div className="sticky top-14 m-3 bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide leading-relaxed">
            Understanding<br />the Metrics
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Collapse"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="space-y-0.5">
          {METRICS.map(m => (
            <Link
              key={m.id}
              href={`/metrics/${m.id}`}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 group transition-colors"
            >
              <div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-scarlet transition-colors block leading-snug">
                  {m.label}
                </span>
                <span className="text-xs text-gray-400">{m.range}</span>
              </div>
              <svg
                className="w-3.5 h-3.5 text-gray-300 group-hover:text-scarlet shrink-0 ml-2 transition-colors"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
