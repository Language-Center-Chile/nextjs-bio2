import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { supabase } from '@/lib/supabase'
import { sendAuthorNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, id, secret, reason } = body
    if (!process.env.MODERATION_SECRET || secret !== process.env.MODERATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!type || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const supabase = await dbConnect()

    if (!['product', 'offer', 'consultant'].includes(type)) {
      return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
    }

    let authorId: any = null
    if (type === 'product') {
      const sel = await supabase.from('products').select('seller_id').eq('id', id).single()
      if (sel.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      authorId = sel.data?.seller_id ? String(sel.data.seller_id) : null
      const del = await supabase.from('products').delete().eq('id', id)
      if (del.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
    } else if (type === 'offer') {
      const sel = await supabase.from('offers').select('author').eq('id', id).single()
      if (sel.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      authorId = sel.data?.author ? String(sel.data.author) : null
      const del = await supabase.from('offers').delete().eq('id', id)
      if (del.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
    } else if (type === 'consultant') {
      const sel = await supabase.from('consultants').select('user').eq('id', id).single()
      if (sel.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      authorId = sel.data?.user ? String(sel.data.user) : null
      const del = await supabase.from('consultants').delete().eq('id', id)
      if (del.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

    // notify author if possible
    let authorEmail = null
    if (authorId) {
      if (type === 'product') {
        const user = await supabase.from('users').select('email').eq('id', String(authorId)).single()
        authorEmail = user.data?.email || null
      } else if (type === 'offer' || type === 'consultant') {
        const user = await supabase.from('users').select('email').eq('id', String(authorId)).single()
        authorEmail = user.data?.email || null
      }
    }

    if (authorEmail) {
      await sendAuthorNotification({ to: authorEmail, subject: 'Tu publicación fue rechazada', text: `Tu ${type} fue rechazada. Razón: ${reason || 'No especificada'}` })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/moderation/reject] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
