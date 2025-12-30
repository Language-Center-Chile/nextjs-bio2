import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Offer from '@/models/Offer'
import Consultant from '@/models/Consultant'
    import User from '@/models/User'
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

    let model: any = null
    if (type === 'product') model = null
    else if (type === 'offer') model = Offer
    else if (type === 'consultant') model = Consultant
    else return NextResponse.json({ error: 'Unknown type' }, { status: 400 })

    let authorId: any = null
    if (type === 'product') {
      const sel = await supabase.from('products').select('seller_id').eq('id', id).single()
      if (sel.error) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      authorId = sel.data?.seller_id ? String(sel.data.seller_id) : null
      const del = await supabase.from('products').delete().eq('id', id)
      if (del.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
    } else {
      const doc = await model.findById(id)
      if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      authorId = type === 'offer' ? (doc as any).author : (doc as any).user
      await doc.remove()
    }

    // notify author if possible
    let authorEmail = null
    if (authorId) {
      if (type === 'product') {
        const user = await supabase.from('users').select('email').eq('id', String(authorId)).single()
        authorEmail = user.data?.email || null
      } else {
        const user = await User.findById(authorId).select('email')
        authorEmail = user?.email
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
