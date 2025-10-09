import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Subscription from '@/models/Subscription'
import { verifyFlowWebhook } from '@/lib/payments/flow'

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text()
    const verification = verifyFlowWebhook(request.headers, raw)
    if (!verification.ok) return NextResponse.json({ error: 'Invalid webhook signature: ' + verification.reason }, { status: 401 })

    const event = verification.payload
    await dbConnect()

    // Manejar eventos esperados (placeholder names)
    // Ejemplos: event.type = 'subscription.created' | 'subscription.activated' | 'subscription.cancelled'
    const type = event.type
    const data = event.data || {}

    if (type === 'subscription.created') {
      // guardar providerId if present
      const sub = await Subscription.findOne({ _id: data.metadata?.subscriptionId })
      if (sub) {
        sub.providerId = data.id || sub.providerId
        await sub.save()
      }
    } else if (type === 'subscription.activated' || type === 'subscription.paid') {
      // activar suscripción
      const providerId = data.id
      const sub = await Subscription.findOne({ providerId })
      if (sub) {
        sub.status = 'active'
        sub.startedAt = new Date(data.start_at || Date.now())
        if (data.current_period_end) sub.currentPeriodEnd = new Date(data.current_period_end)
        await sub.save()
      }
    } else if (type === 'subscription.cancelled' || type === 'subscription.expired') {
      const providerId = data.id
      const sub = await Subscription.findOne({ providerId })
      if (sub) {
        sub.status = 'cancelled'
        await sub.save()
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/subscriptions/webhook] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
