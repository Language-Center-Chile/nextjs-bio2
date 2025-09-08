import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
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

    await dbConnect()

    let model: any = null
    if (type === 'product') model = Product
    else if (type === 'offer') model = Offer
    else if (type === 'consultant') model = Consultant
    else return NextResponse.json({ error: 'Unknown type' }, { status: 400 })

    const doc = await model.findById(id)
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // capture author id before removal
    let authorId: any = null
    if (type === 'product') authorId = (doc as any).seller
    else if (type === 'offer') authorId = (doc as any).author
    else if (type === 'consultant') authorId = (doc as any).user

    await doc.remove()

    // notify author if possible
    let authorEmail = null
    if (authorId) {
      const user = await User.findById(authorId).select('email')
      authorEmail = user?.email
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
