import { NextResponse, NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { image } = body
  if (!image) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabase = url && key ? createServerClient(url, key, {
    cookies: {
      async getAll() {
        return (await cookies()).getAll()
      },
      async setAll(cookiesToSet) {
        const store = await cookies()
        cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
      },
    },
  }) : null
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } }
  if (!data.user?.id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  try {
    const upd = await supabase!.auth.updateUser({ data: { avatar_url: image } })
    if (upd.error) return NextResponse.json({ error: 'Update error' }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
