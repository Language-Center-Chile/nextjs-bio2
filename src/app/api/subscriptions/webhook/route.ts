import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { verifyFlowWebhook } from '@/lib/payments/flow'

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text()
    const verification = verifyFlowWebhook(request.headers, raw)
    if (!verification.ok) return NextResponse.json({ error: 'Invalid webhook signature: ' + verification.reason }, { status: 401 })

    const event = verification.payload
    const supabase = await dbConnect()

    // Manejar eventos esperados (placeholder names)
    // Ejemplos: event.type = 'subscription.created' | 'subscription.activated' | 'subscription.cancelled'
    const type = event.type
    const data = event.data || {}

    if (type === 'subscription.created') {
      const sid = data.metadata?.subscriptionId
      if (sid) {
        await supabase
          .from('subscriptions')
          .update({ providerId: data.id })
          .eq('id', sid)
      }
    } else if (type === 'subscription.activated' || type === 'subscription.paid') {
      const providerId = data.id
      const update: any = { status: 'active' }
      if (data.start_at) update.startedAt = new Date(data.start_at).toISOString()
      if (data.current_period_end) update.currentPeriodEnd = new Date(data.current_period_end).toISOString()
      await supabase
        .from('subscriptions')
        .update(update)
        .eq('providerId', providerId)
    } else if (type === 'subscription.cancelled' || type === 'subscription.expired') {
      const providerId = data.id
      await supabase
        .from('subscriptions')
        .update({ status: type === 'subscription.expired' ? 'expired' : 'cancelled' })
        .eq('providerId', providerId)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/subscriptions/webhook] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
