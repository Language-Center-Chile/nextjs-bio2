import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { sendAuthorNotification } from '@/lib/email'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const secret = url.searchParams.get('secret')
    if (!process.env.MODERATION_SECRET || secret !== process.env.MODERATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const type = url.searchParams.get('type')
    const id = url.searchParams.get('id')
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

    const upd = await supabase.from(table).update({ isApproved: true }).eq('id', id).select('*').single()
    if (upd.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const doc = upd.data

    // notify author if possible
    let authorEmail = null
    if (type === 'product') authorEmail = (doc as any).seller_email ?? null
    else if (type === 'offer') authorEmail = (doc as any).author_email ?? null
    else if (type === 'consultant') authorEmail = null

    if (authorEmail) {
      await sendAuthorNotification({ to: authorEmail, subject: 'Tu publicación fue aprobada', text: `Tu ${type} ha sido aprobado y ya es visible en la plataforma.` })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/moderation/approve] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
