import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { sendAuthorNotification } from '@/lib/email'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, id, secret, reason } = body
    if (!process.env.MODERATION_SECRET || secret !== process.env.MODERATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!type || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supaKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = createServerClient(supaUrl!, supaKey!, {
      cookies: {
        async getAll() {
          return (await cookies()).getAll()
        },
        async setAll(cookiesToSet) {
          const store = await cookies()
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
        },
      },
    })

    const table = type === 'product' ? 'products' : type === 'offer' ? 'offers' : type === 'consultant' ? 'consultants' : null
    if (!table) return NextResponse.json({ error: 'Unknown type' }, { status: 400 })

    const sel = await supabase.from(table).select('*').eq('id', id).single()
    if (sel.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const doc = sel.data

    let authorEmail: string | null = null
    if (type === 'product') authorEmail = (doc as any).seller_email ?? null
    else if (type === 'offer') authorEmail = (doc as any).author_email ?? null
    else if (type === 'consultant') authorEmail = null

    await supabase.from(table).delete().eq('id', id)

    // notify author if possible
    if (authorEmail) {
      await sendAuthorNotification({ to: authorEmail, subject: 'Tu publicación fue rechazada', text: `Tu ${type} fue rechazada. Razón: ${reason || 'No especificada'}` })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/moderation/reject] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
