import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Subscription from '@/models/Subscription'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token || !token.sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const sub = await Subscription.findOne({ user: token.sub }).sort({ createdAt: -1 }).lean()
    if (!sub) return NextResponse.json({ ok: true, subscription: null })
    return NextResponse.json({ ok: true, subscription: sub })
  } catch (err) {
    console.error('[api/subscriptions/me] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
