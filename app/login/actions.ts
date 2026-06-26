'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SHARED_PASSWORD = 'vessel2026'

export async function login(
  _prevState: { error: string },
  formData: FormData,
) {
  const password = formData.get('password') as string

  if (password !== SHARED_PASSWORD) {
    return { error: 'Incorrect password. Try again.' }
  }

  const cookieStore = await cookies()
  cookieStore.set('auth_token', 'authenticated', {
    httpOnly: true,                                    // JS in the browser can't read this
    secure: process.env.NODE_ENV === 'production',     // HTTPS only in prod
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,                         // Stay logged in for 7 days
    path: '/',
  })

  redirect('/')
}
