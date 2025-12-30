import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helper'

export async function POST(request: NextRequest) {
  try {
    const supabase = await dbConnect()
    const token = await getAuthUser(request)
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

    // Construir URL de redirección a Flow (checkout simple)
    const successUrl = `${process.env.NEXTAUTH_URL || ''}/subscriptions/success?sid=${sub.id}`
    const cancelUrl = `${process.env.NEXTAUTH_URL || ''}/subscriptions/cancel?sid=${sub.id}`

    // Ejemplo: enviar al usuario al portal de pago de Flow con los parámetros básicos
    const flowBase = process.env.FLOW_CHECKOUT_URL || 'https://sandbox.flow.cl/app/web/pagar'
    const params = new URLSearchParams({
      planId,
      planName: plan.name,
      amount: String(plan.price),
      currency: 'USD',
      successUrl,
      cancelUrl,
      subscriptionId: String(sub.id),
      userId: token.sub
    })
    const checkoutUrl = `${flowBase}?${params.toString()}`

    return NextResponse.json({ ok: true, checkoutUrl })
  } catch (err: any) {
    console.error('[api/subscriptions/create] error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}