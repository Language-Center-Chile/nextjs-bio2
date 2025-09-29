import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import Offer from '@/models/Offer'
import Consultant from '@/models/Consultant'
import User from '@/models/User'
import { sendAuthorNotification } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const secret = url.searchParams.get('secret')
    if (!process.env.MODERATION_SECRET || secret !== process.env.MODERATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    const type = url.searchParams.get('type')
    const id = url.searchParams.get('id')
    if (!type || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    let model: any = null
    if (type === 'product') model = Product
    else if (type === 'offer') model = Offer
    else if (type === 'consultant') model = Consultant
    else return NextResponse.json({ error: 'Unknown type' }, { status: 400 })

    const doc = await model.findById(id)
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    doc.isApproved = true
    await doc.save()

    // notify author if possible
    let authorEmail = null
    if (type === 'product') {
      // seller is an ObjectId
      const sellerId = (doc as any).seller
      if (sellerId) {
        const seller = await User.findById(sellerId).select('email name')
        authorEmail = seller?.email
      }
    } else if (type === 'offer') {
      const authorId = (doc as any).author
      if (authorId) {
        const author = await User.findById(authorId).select('email')
        authorEmail = author?.email
      }
    } else if (type === 'consultant') {
      const userId = (doc as any).user
      if (userId) {
        const user = await User.findById(userId).select('email')
        authorEmail = user?.email
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
