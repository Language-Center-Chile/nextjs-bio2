import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function POST(req: NextRequest) {
  try {
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
    const userId = data.user?.id

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, address, postalCode, bio } = body
    const upd = await supabase!.auth.updateUser({ data: { name, address, postalCode, bio } })
    if (upd.error) {
      return NextResponse.json({ error: 'Error updating profile' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error updating profile:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
