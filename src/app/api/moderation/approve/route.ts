import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { sendAuthorNotification } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const secret = url.searchParams.get('secret')
    if (!process.env.MODERATION_SECRET || secret !== process.env.MODERATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await dbConnect()
    const type = url.searchParams.get('type')
    const id = url.searchParams.get('id')
    if (!type || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    if (!['product', 'offer', 'consultant'].includes(type)) {
      return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
    }

    let sellerId: string | null = null
    let doc: any = null
    if (type === 'product') {
      const res = await supabase.from('products').update({ is_approved: true }).eq('id', id).select('seller_id').single()
      if (res.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      sellerId = res.data?.seller_id ? String(res.data.seller_id) : null
    } else if (type === 'offer') {
      const res = await supabase.from('offers').update({ isApproved: true }).eq('id', id).select('author').single()
      if (res.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      doc = res.data
    } else if (type === 'consultant') {
      const res = await supabase.from('consultants').update({ isApproved: true }).eq('id', id).select('user').single()
      if (res.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      doc = res.data
    }

    // notify author if possible
    let authorEmail = null
    if (type === 'product') {
      if (sellerId) {
        const seller = await supabase.from('users').select('email').eq('id', sellerId).single()
        authorEmail = seller.data?.email || null
      }
    } else if (type === 'offer') {
      const authorId = (doc as any).author
      if (authorId) {
        const author = await supabase.from('users').select('email').eq('id', String(authorId)).single()
        authorEmail = author.data?.email || null
      }
    } else if (type === 'consultant') {
      const userId = (doc as any).user
      if (userId) {
        const user = await supabase.from('users').select('email').eq('id', String(userId)).single()
        authorEmail = user.data?.email || null
      }
    }

    if (authorEmail) {
      await sendAuthorNotification({ to: authorEmail, subject: 'Tu publicación fue aprobada', text: `Tu ${type} ha sido aprobado y ya es visible en la plataforma.` })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/moderation/approve] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
