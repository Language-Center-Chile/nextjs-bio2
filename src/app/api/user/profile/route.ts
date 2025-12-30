import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
  try {
    // DEBUG: mostrar cookies y token para investigar 401
    console.log('[api/user/profile] cookies header:', req.headers.get('cookie'))

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    console.log('[api/user/profile] getToken result:', token)

    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, address, postalCode, bio } = body

    await dbConnect()

    const updated = await User.findByIdAndUpdate(userId, {
      $set: {
        name,
        address,
        postalCode,
        bio
      }
    }, { new: true })

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error updating profile:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
