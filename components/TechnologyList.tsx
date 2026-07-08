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
  trl: number
  zone: string
}

type SortField = 'confidence' | 'trl' | 'zone'

function zoneToNum(zone: string | null | undefined): number {
  if (!zone || zone.toLowerCase() === 'none') return 0
  const n = parseInt(zone)
  return isNaN(n) ? 0 : n
}

function zoneLabel(zone: string | null | undefined): string {
  if (!zone || zone.toLowerCase() === 'none') return '—'
  return `Z${zone}`
}

function zoneBadgeClass(zone: string | null | undefined): string {
  const n = zoneToNum(zone)
  if (n === 3) return 'bg-scarlet/10 text-scarlet font-semibold'
  if (n === 2) return 'bg-gray-100 text-gray-700'
  if (n === 1) return 'bg-gray-100 text-gray-500'
  return 'text-gray-400'
}

export default function TechnologyList({ technologies }: { technologies: Technology[] }) {
  const [search, setSearch] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortField>('confidence')
  const [sortDesc, setSortDesc] = useState(true)
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

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal: number, bVal: number
      if (sortBy === 'confidence') {
        aVal = a.confidence ?? 0
        bVal = b.confidence ?? 0
      } else if (sortBy === 'trl') {
        aVal = a.trl ?? 0
        bVal = b.trl ?? 0
      } else {
        aVal = zoneToNum(a.zone)
        bVal = zoneToNum(b.zone)
      }
      return sortDesc ? bVal - aVal : aVal - bVal
    })
  }, [filtered, sortBy, sortDesc])

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

  function handleSort(field: SortField) {
    if (sortBy === field) {
      setSortDesc(d => !d)
    } else {
      setSortBy(field)
      setSortDesc(true)
    }
  }

  function SortIndicator({ field }: { field: SortField }) {
    if (sortBy !== field) return <span className="ml-0.5 text-gray-300">↕</span>
    return <span className="ml-0.5 text-scarlet">{sortDesc ? '↓' : '↑'}</span>
  }

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
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 9h10M11 14h2" />
              </svg>
              <span>{selectedIndustry ?? 'Filter'}</span>
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
                    !selectedIndustry ? 'text-scarlet font-medium bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
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
                      selectedIndustry === industry ? 'text-scarlet font-medium bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
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
      {sorted.length === 0 ? (
        <div className="border border-gray-200 rounded-xl px-6 py-16 text-center">
          <p className="text-sm font-medium text-gray-900">No results</p>
          <p className="text-sm text-gray-500 mt-1">
            No technologies match{search ? ` "${search}"` : ''}{selectedIndustry ? ` in ${selectedIndustry}` : ''}.
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_130px_90px_56px_62px_32px] gap-4 items-center px-5 py-2.5 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Technology</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industry</span>
            <button
              onClick={() => handleSort('confidence')}
              className={`text-xs font-medium uppercase tracking-wide text-left flex items-center gap-0.5 transition-colors ${
                sortBy === 'confidence' ? 'text-scarlet' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Confidence <SortIndicator field="confidence" />
            </button>
            <button
              onClick={() => handleSort('trl')}
              className={`text-xs font-medium uppercase tracking-wide text-left flex items-center gap-0.5 transition-colors ${
                sortBy === 'trl' ? 'text-scarlet' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              TRL <SortIndicator field="trl" />
            </button>
            <button
              onClick={() => handleSort('zone')}
              className={`text-xs font-medium uppercase tracking-wide text-left flex items-center gap-0.5 transition-colors ${
                sortBy === 'zone' ? 'text-scarlet' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Zone <SortIndicator field="zone" />
            </button>
            <span />
          </div>

          {/* Rows */}
          {sorted.map((tech, i) => (
            <Link
              key={tech.id}
              href={`/technologies/${tech.slug}`}
              className={`
                grid grid-cols-[1fr_130px_90px_56px_62px_32px] gap-4 items-center
                px-5 py-4 group transition-colors hover:bg-gray-50
                ${i < sorted.length - 1 ? 'border-b border-gray-200' : ''}
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
                <span className="text-sm font-semibold text-scarlet">{tech.confidence ?? '—'}</span>
                <span className="text-xs text-gray-400">/ 10</span>
              </div>

              <span className="text-sm text-gray-700">{tech.trl ?? '—'}</span>

              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs w-fit ${zoneBadgeClass(tech.zone)}`}>
                {zoneLabel(tech.zone)}
              </span>

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
          {sorted.length} {sorted.length === 1 ? 'result' : 'results'}
        </p>
      )}
    </div>
  )
}
