'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, { error: '' })

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">

      {/* ── Background tree motif ── */}
      {/* Cambium = the growth layer in trees; branching silhouette ties name to form */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[105vh] w-auto opacity-[0.07] pointer-events-none select-none"
        viewBox="0 0 800 1000"
        fill="none"
        stroke="#BB0000"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Trunk */}
        <path d="M400 1000 Q401 850 400 660" strokeWidth="14"/>

        {/* Level 1 — first split */}
        <path d="M400 660 Q312 575 225 465" strokeWidth="8"/>
        <path d="M400 660 Q488 575 575 465" strokeWidth="8"/>

        {/* Level 2 — left subtree */}
        <path d="M225 465 Q172 378 132 285" strokeWidth="5.5"/>
        <path d="M225 465 Q255 372 278 278" strokeWidth="5.5"/>

        {/* Level 2 — right subtree */}
        <path d="M575 465 Q522 372 522 278" strokeWidth="5.5"/>
        <path d="M575 465 Q628 378 668 285" strokeWidth="5.5"/>

        {/* Level 3 — from 132,285 */}
        <path d="M132 285 Q100 212 76 132" strokeWidth="3.5"/>
        <path d="M132 285 Q148 210 162 130" strokeWidth="3.5"/>

        {/* Level 3 — from 278,278 */}
        <path d="M278 278 Q255 202 238 118" strokeWidth="3.5"/>
        <path d="M278 278 Q292 200 306 118" strokeWidth="3.5"/>

        {/* Level 3 — from 522,278 */}
        <path d="M522 278 Q494 200 494 118" strokeWidth="3.5"/>
        <path d="M522 278 Q562 202 562 118" strokeWidth="3.5"/>

        {/* Level 3 — from 668,285 */}
        <path d="M668 285 Q638 210 638 130" strokeWidth="3.5"/>
        <path d="M668 285 Q700 212 724 132" strokeWidth="3.5"/>

        {/* Level 4 — fine tips */}
        <path d="M76 132 Q58 78 44 18" strokeWidth="2"/>
        <path d="M76 132 Q90 76 104 14" strokeWidth="2"/>
        <path d="M162 130 Q150 74 142 12" strokeWidth="2"/>
        <path d="M162 130 Q174 73 188 12" strokeWidth="2"/>
        <path d="M238 118 Q226 62 218 4" strokeWidth="2"/>
        <path d="M238 118 Q248 61 258 4" strokeWidth="2"/>
        <path d="M306 118 Q298 62 292 4" strokeWidth="2"/>
        <path d="M306 118 Q316 61 328 4" strokeWidth="2"/>
        <path d="M494 118 Q482 61 472 4" strokeWidth="2"/>
        <path d="M494 118 Q504 62 514 4" strokeWidth="2"/>
        <path d="M562 118 Q542 61 532 4" strokeWidth="2"/>
        <path d="M562 118 Q574 62 586 4" strokeWidth="2"/>
        <path d="M638 130 Q622 73 612 12" strokeWidth="2"/>
        <path d="M638 130 Q650 74 664 12" strokeWidth="2"/>
        <path d="M724 132 Q710 76 696 14" strokeWidth="2"/>
        <path d="M724 132 Q738 78 756 18" strokeWidth="2"/>
      </svg>

      {/* ── Login form ── */}
      <div className="w-full max-w-sm relative z-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">
            Cambium
          </h1>
          <p className="mt-2.5 text-sm text-gray-500">
            Enter your credentials to access the report library.
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-8 bg-white/90 backdrop-blur-sm">
          <form action={action} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-scarlet focus:border-transparent transition"
              />
            </div>

            {state.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-scarlet text-white rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {pending ? 'Checking…' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
