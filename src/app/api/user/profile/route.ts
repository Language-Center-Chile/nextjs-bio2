import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { getToken } from 'next-auth/jwt'
import { MongoClient } from 'mongodb'

export async function POST(req: NextRequest) {
  try {
    // DEBUG: mostrar cookies y token para investigar 401
    console.log('[api/user/profile] cookies header:', req.headers.get('cookie'))

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    console.log('[api/user/profile] getToken result:', token)

    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    } else {
      // Fallback: si se usa MongoDB adapter, buscar la sesión por session-token en la colección `sessions`
      const cookieHeader = req.headers.get('cookie') || ''
      const match = cookieHeader.match(/(?:__Secure-)?next-auth.session-token=([^;\s]+)/) || cookieHeader.match(/next-auth.session-token=([^;\s]+)/)
      const sessionToken = match ? decodeURIComponent(match[1]) : null
      console.log('[api/user/profile] extracted sessionToken:', sessionToken)

      if (sessionToken && process.env.MONGODB_URI) {
        const client = new MongoClient(process.env.MONGODB_URI)
        await client.connect()
        try {
          const db = client.db()
          const sessionsCol = db.collection('sessions')
          const sess = await sessionsCol.findOne({ sessionToken })
          console.log('[api/user/profile] session from db:', sess)
          if (sess && (sess as any).userId) userId = String((sess as any).userId)
        } finally {
          await client.close()
        }
      }
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
