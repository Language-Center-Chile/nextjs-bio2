import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getToken } from 'next-auth/jwt'
import { createFlowCheckout } from '@/lib/payments/flow'

export async function POST(request: NextRequest) {
  try {
    const supabase = await dbConnect()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token || !token.sub) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { planId } = body
    if (!planId) return NextResponse.json({ error: 'Missing planId' }, { status: 400 })

    // Mapear planes locales a precio/nombre
    const PLAN_MAP: Record<string, { name: string, price: number }> = {
      basic: { name: 'Plan Básico', price: 5 },
      standard: { name: 'Plan Standard', price: 10 },
      pro: { name: 'Plan Pro', price: 15 }
    }

    const plan = PLAN_MAP[planId]
    if (!plan) return NextResponse.json({ error: 'Unknown planId' }, { status: 400 })

    // Crear suscripción local pendiente
    const insertRes = await supabase
      .from('subscriptions')
      .insert({ user: token.sub, planId, planName: plan.name, price: plan.price, currency: 'USD', status: 'pending' })
      .select('*')
      .single()
    if (insertRes.error) {
      return NextResponse.json({ error: 'Datos inválidos', details: insertRes.error.message }, { status: 400 })
    }
    const sub = insertRes.data

    // Crear checkout en Flow
    const successUrl = `${process.env.NEXTAUTH_URL || ''}/subscriptions/success?sid=${sub.id}`
    const cancelUrl = `${process.env.NEXTAUTH_URL || ''}/subscriptions/cancel?sid=${sub.id}`

    const flowResp = await createFlowCheckout(planId, successUrl, cancelUrl, { subscriptionId: String(sub.id), userId: token.sub })

    // Guardar providerId si viene
    if (flowResp.providerSubscriptionId) {
      const updateRes = await supabase
        .from('subscriptions')
        .update({ providerId: flowResp.providerSubscriptionId })
        .eq('id', sub.id)
      if (updateRes.error) {
        console.error('[api/subscriptions/create] providerId update error', updateRes.error)
      }
    }

    return NextResponse.json({ ok: true, checkoutUrl: flowResp.checkoutUrl })
  } catch (err: any) {
    console.error('[api/subscriptions/create] error', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
