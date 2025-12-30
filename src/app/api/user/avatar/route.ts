import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import dbConnect from '../../../../lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { image } = body
  if (!image) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token || !token.sub) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  await dbConnect()

  try {
    const supabase = await dbConnect()
    const { data, error } = await supabase
      .from('users')
      .update({ avatar: image })
      .eq('id', token.sub)
      .select('id')
      .single()
    if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
    if (!data) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
