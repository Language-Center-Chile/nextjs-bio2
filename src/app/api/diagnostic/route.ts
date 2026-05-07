import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const n8nWebhookUrl = process.env.N8N_DIAGNOSTIC_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: 'N8N_DIAGNOSTIC_WEBHOOK_URL no configurada' },
        { status: 500 }
      )
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: {
          ...body,
          timestamp: new Date().toISOString()
        }
      })
    })

    if (!n8nResponse.ok) {
      console.error('[api/diagnostic] n8n error:', n8nResponse.status)
      return NextResponse.json(
        { error: 'Error al enviar a n8n' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    console.error('[api/diagnostic] error')
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
