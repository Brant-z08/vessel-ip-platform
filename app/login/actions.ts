'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SHARED_PASSWORD = 'vessel2026'
const ADMIN_EMAIL = 'bzell@buildvessel.com'

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
}

export async function login(
  _prevState: { error: string },
  formData: FormData,
) {
  const email = (formData.get('email') as string).trim().toLowerCase()
  const password = formData.get('password') as string

  if (password !== SHARED_PASSWORD) {
    return { error: 'Incorrect password. Try again.' }
  }

  const cookieStore = await cookies()
  cookieStore.set('auth_token', 'authenticated', COOKIE_OPTS)

  if (email === ADMIN_EMAIL) {
    cookieStore.set('admin', 'true', COOKIE_OPTS)
  }

  redirect('/')
}
