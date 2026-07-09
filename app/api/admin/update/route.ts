import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  if (cookieStore.get('admin')?.value !== 'true') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { slug, name, full_name, industry, trl, confidence, zone, report_markdown } = body

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  const supabase = adminClient()
  const { error } = await supabase
    .from('technologies')
    .update({ name, full_name, industry, trl, confidence, zone, report_markdown })
    .eq('slug', slug)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
