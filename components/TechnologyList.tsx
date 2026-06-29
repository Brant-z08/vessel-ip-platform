'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'

type Technology = {
  id: string
  slug: string
  name: string
  full_name: string
  patent_id: string
  industry: string
  confidence: number
}

export default function TechnologyList({ technologies }: { technologies: Technology[] }) {
  const [search, setSearch] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  const industries = useMemo(
    () => [...new Set(technologies.map(t => t.industry))].sort(),
    [technologies]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return technologies.filter(tech => {
      const matchesSearch =
        !q ||
        tech.name.toLowerCase().includes(q) ||
        tech.full_name.toLowerCase().includes(q) ||
        tech.patent_id.toLowerCase().includes(q)
      const matchesIndustry = !selectedIndustry || tech.industry === selectedIndustry
      return matchesSearch && matchesIndustry
    })
  }, [technologies, search, selectedIndustry])

  const isFiltering = search.trim() !== '' || selectedIndustry !== null

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div>
      {/* ── Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">

        {/* Search box */}
        <div className="relative w-full sm:max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or tech ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent placeholder-gray-400 transition"
          />
        </div>

        {/* Filter dropdown */}
        {industries.length > 0 && (
          <div className="relative shrink-0" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(o => !o)}
              className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors whitespace-nowrap ${
                selectedIndustry
                  ? 'border-scarlet text-scarlet bg-white'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              {/* Funnel icon */}
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 9h10M11 14h2" />
              </svg>
              <span>{selectedIndustry ?? 'Filter'}</span>
              {/* Chevron */}
              <svg
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${filterOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {filterOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                <button
                  onClick={() => { setSelectedIndustry(null); setFilterOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                    !selectedIndustry
                      ? 'text-scarlet font-medium bg-gray-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All industries
                  {!selectedIndustry && (
                    <svg className="w-3.5 h-3.5 text-scarlet shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <div className="border-t border-gray-100 mx-2 my-1" />
                {industries.map(industry => (
                  <button
                    key={industry}
                    onClick={() => { setSelectedIndustry(industry); setFilterOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      selectedIndustry === industry
                        ? 'text-scarlet font-medium bg-gray-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {industry}
                    {selectedIndustry === industry && (
                      <svg className="w-3.5 h-3.5 text-scarlet shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── List ── */}
      {filtered.length === 0 ? (
        <div className="border border-gray-200 rounded-xl px-6 py-16 text-center">
          <p className="text-sm font-medium text-gray-900">No results</p>
          <p className="text-sm text-gray-500 mt-1">
            No technologies match{search ? ` "${search}"` : ''}{selectedIndustry ? ` in ${selectedIndustry}` : ''}.
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_160px_100px_32px] gap-4 items-center px-5 py-2.5 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Technology</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industry</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Confidence</span>
            <span />
          </div>

          {/* Rows */}
          {filtered.map((tech, i) => (
            <Link
              key={tech.id}
              href={`/technologies/${tech.slug}`}
              className={`
                grid grid-cols-[1fr_160px_100px_32px] gap-4 items-center
                px-5 py-4 group transition-colors hover:bg-gray-50
                ${i < filtered.length - 1 ? 'border-b border-gray-200' : ''}
              `}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-scarlet group-hover:underline underline-offset-2">
                  {tech.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {tech.patent_id} · {tech.full_name}
                </p>
              </div>

              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 w-fit truncate max-w-full">
                {tech.industry}
              </span>

              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-scarlet">{tech.confidence}</span>
                <span className="text-xs text-gray-400">/ 10</span>
              </div>

              <span className="text-gray-300 group-hover:text-scarlet transition-colors text-base leading-none justify-self-end">
                →
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Result count — only shown while filtering */}
      {isFiltering && (
        <p className="mt-3 text-xs text-gray-400">
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        </p>
      )}
    </div>
  )
}
