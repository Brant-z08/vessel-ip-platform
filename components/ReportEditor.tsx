'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  slug: string
  isAdmin: boolean
  initialName: string
  initialFullName: string
  initialIndustry: string
  initialTrl: number
  initialConfidence: number
  initialZone: string
  initialMarkdown: string
}

type Mode = 'view' | 'edit' | 'preview'

export default function ReportEditor({
  slug,
  isAdmin,
  initialName,
  initialFullName,
  initialIndustry,
  initialTrl,
  initialConfidence,
  initialZone,
  initialMarkdown,
}: Props) {
  const [mode, setMode] = useState<Mode>('view')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [name, setName] = useState(initialName)
  const [fullName, setFullName] = useState(initialFullName)
  const [industry, setIndustry] = useState(initialIndustry)
  const [trl, setTrl] = useState(initialTrl)
  const [confidence, setConfidence] = useState(initialConfidence)
  const [zone, setZone] = useState(initialZone)
  const [markdown, setMarkdown] = useState(initialMarkdown)

  async function handleSave() {
    setSaving(true)
    setSaveError('')
    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, full_name: fullName, industry, trl, confidence, zone, report_markdown: markdown }),
      })
      if (!res.ok) {
        const text = await res.text()
        let message = `Server error ${res.status}`
        try { message = JSON.parse(text).error ?? message } catch {}
        throw new Error(message)
      }
      setMode('view')
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setName(initialName)
    setFullName(initialFullName)
    setIndustry(initialIndustry)
    setTrl(initialTrl)
    setConfidence(initialConfidence)
    setZone(initialZone)
    setMarkdown(initialMarkdown)
    setMode('view')
  }

  // Non-admin: just render the report
  if (!isAdmin) return <ReportMarkdown markdown={markdown} />

  // ── Admin toolbar ──────────────────────────────────────────────
  const toolbar = (
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mr-1">Admin</span>

      {mode === 'view' && (
        <>
          <button
            onClick={() => setMode('edit')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-700 hover:border-scarlet hover:text-scarlet transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit report
          </button>
          <button
            onClick={() => setMode('preview')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Member view
          </button>
        </>
      )}

      {mode === 'preview' && (
        <button
          onClick={() => setMode('view')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-scarlet rounded-lg text-scarlet transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
          Back to admin view
        </button>
      )}

      {mode === 'edit' && (
        <>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-scarlet text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button
            onClick={handleCancel}
            disabled={saving}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          {saveError && <p className="text-xs text-red-600">{saveError}</p>}
        </>
      )}
    </div>
  )

  // ── Member view (preview) ──────────────────────────────────────
  if (mode === 'preview') {
    return (
      <div>
        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-dashed border-gray-200">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Previewing as member</span>
          <button
            onClick={() => setMode('view')}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-scarlet rounded-lg text-scarlet transition-colors"
          >
            Back to admin view
          </button>
        </div>
        <ReportMarkdown markdown={markdown} />
      </div>
    )
  }

  // ── Edit mode ──────────────────────────────────────────────────
  if (mode === 'edit') {
    return (
      <div>
        {toolbar}

        {/* Metadata fields */}
        <div className="grid grid-cols-2 gap-4 mb-8 p-5 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Full name</label>
            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Industry</label>
            <input
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Zone</label>
            <input
              value={zone}
              onChange={e => setZone(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">TRL (1–9)</label>
            <input
              type="number" min={1} max={9}
              value={trl}
              onChange={e => setTrl(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Confidence (1–10)</label>
            <input
              type="number" min={1} max={10}
              value={confidence}
              onChange={e => setConfidence(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent"
            />
          </div>
        </div>

        {/* Markdown editor */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Report markdown</label>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            rows={40}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent resize-y"
          />
        </div>
      </div>
    )
  }

  // ── Default: admin view (rendered report + toolbar) ────────────
  return (
    <div>
      {toolbar}
      <ReportMarkdown markdown={markdown} />
    </div>
  )
}

function ReportMarkdown({ markdown }: { markdown: string }) {
  return (
    <article
      className="
        prose prose-gray max-w-none

        prose-h1:text-2xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:text-gray-950
        prose-h2:text-lg prose-h2:font-semibold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-3
        prose-h3:text-base prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-6 prose-h3:mb-2

        prose-p:text-gray-700 prose-p:leading-7
        prose-strong:text-gray-900 prose-strong:font-semibold

        prose-table:text-sm
        prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 prose-th:bg-gray-50 prose-th:py-2 prose-th:px-4
        prose-td:text-gray-700 prose-td:py-2 prose-td:px-4 prose-td:align-top
        prose-thead:border-b prose-thead:border-gray-200

        prose-hr:border-gray-200 prose-hr:my-8

        prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-gray-600

        prose-li:text-gray-700 prose-li:leading-7
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  )
}
