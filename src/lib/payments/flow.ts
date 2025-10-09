// Helper para interactuar con Flow.cl (placeholder). Ajusta los endpoints según la API real de Flow.

export async function createFlowCheckout(planId: string, successUrl: string, cancelUrl: string, metadata?: Record<string, any>) {
  const base = process.env.FLOW_API_BASE
  const apiKey = process.env.FLOW_API_KEY
  if (!base || !apiKey) {
    throw new Error('FLOW API no configurada. Define FLOW_API_BASE y FLOW_API_KEY en .env')
  }

  // Ejemplo genérico: POST /checkout
  const resp = await fetch(`${base.replace(/\/$/, '')}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({ planId, successUrl, cancelUrl, metadata })
  })

  if (!resp.ok) {
    const text = await resp.text().catch(() => '')
    throw new Error('Flow API error: ' + resp.status + ' ' + text)
  }

  const data = await resp.json()
  // Esperamos que data contenga { checkoutUrl, providerSubscriptionId }
  return data
}

export function verifyFlowWebhook(headers: Headers, rawBody: string) {
  // Implementación sencilla: comparar header X-FLOW-SIGNATURE con FLOW_WEBHOOK_SECRET
  const secret = process.env.FLOW_WEBHOOK_SECRET || ''
  const sig = headers.get('x-flow-signature') || headers.get('x-signature') || ''
  if (!secret) return { ok: false, reason: 'No webhook secret configured' }
  if (!sig) return { ok: false, reason: 'Missing signature header' }
  if (sig !== secret) return { ok: false, reason: 'Invalid signature' }
  try {
    const payload = JSON.parse(rawBody)
    return { ok: true, payload }
  } catch (err) {
    return { ok: false, reason: 'Invalid JSON' }
  }
}
