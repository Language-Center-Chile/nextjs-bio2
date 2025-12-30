import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helper'

export async function GET(request: NextRequest) {
  try {
    const supabase = await dbConnect()
    const token = await getAuthUser(request)
    if (!token || !token.sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user', token.sub)
      .order('created_at', { ascending: false })
      .limit(1)
    if (error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
    const sub = data && data.length > 0 ? data[0] : null
    return NextResponse.json({ ok: true, subscription: sub })
  } catch (err) {
    console.error('[api/subscriptions/me] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
