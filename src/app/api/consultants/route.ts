import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = url && key ? createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          const store = cookies()
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
        },
      },
    }) : null
    const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } }
    if (!data.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const base = request.nextUrl.origin
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''

    // Upsert consultant profile by user
    const record = {
      user: data.user.id,
      rateAmount: body.rateAmount ?? null,
      rateFrequency: body.rateFrequency ?? null,
      degrees: Array.isArray(body.degrees) ? body.degrees : [],
      courses: Array.isArray(body.courses) ? body.courses : [],
      description: body.description ?? null,
      objective: body.objective ?? null,
      skills: Array.isArray(body.skills) ? body.skills : [],
      portfolio: Array.isArray(body.portfolio) ? body.portfolio : [],
      availability: body.availability ?? null,
      isApproved: false,
    }
    const upsert = await supabase!.from('consultants').upsert([record], { onConflict: 'user' }).select('id')
    if (upsert.error) {
      return NextResponse.json({ error: 'DB upsert error', details: upsert.error.message }, { status: 500 })
    }
    // set role in user metadata
    await supabase!.auth.updateUser({ data: { role: 'consultant' } })

    const id = (upsert.data || [])[0]?.id
    const approveUrl = `${base}/api/moderation/approve?type=consultant&id=${id}${secretParam}`
    await sendAdminNotification({ subject: `Perfil de consultor a revisar: ${data.user.id}`, text: `Revisar: ${approveUrl}` })
      if (data.user?.email) await sendAuthorNotification({ to: data.user.email, subject: 'Tu perfil de consultor fue enviado para revisión', text: 'Tu perfil fue actualizado y está pendiente de aprobación.' })

    return NextResponse.json({ ok: true, id })
  } catch (err) {
    console.error('[api/consultants] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
