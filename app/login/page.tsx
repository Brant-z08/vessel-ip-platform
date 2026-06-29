'use client'

import { useActionState } from 'react'
import { login } from './actions'
import TreeMotif from '@/components/TreeMotif'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, { error: '' })

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">

      <TreeMotif />

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
