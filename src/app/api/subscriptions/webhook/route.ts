import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Webhook placeholder: siempre responde OK
    // Si en el futuro Flow envía eventos, implementa aquí la lógica
    const body = await request.json().catch(() => ({}))
    console.log('[subscriptions/webhook] event received:', body)

    const supabase = await dbConnect()

    // Ejemplo básico: actualizar estado si viene providerId y tipo
    const { type, data } = body as { type: string, data: any }
    if (type === 'subscription.activated' || type === 'subscription.paid') {
      const providerId = data?.id
      if (providerId) {
        const update: { status: string; startedAt?: string; currentPeriodEnd?: string } = { status: 'active' }
        if (data.start_at) update.startedAt = new Date(data.start_at).toISOString()
        if (data.current_period_end) update.currentPeriodEnd = new Date(data.current_period_end).toISOString()
        await supabase.from('subscriptions').update(update).eq('providerId', providerId)
      }
    } else if (type === 'subscription.cancelled' || type === 'subscription.expired') {
      const providerId = data?.id
      if (providerId) {
        const status = type === 'subscription.expired' ? 'expired' : 'cancelled'
        await supabase.from('subscriptions').update({ status }).eq('providerId', providerId)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('[subscriptions/webhook] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}