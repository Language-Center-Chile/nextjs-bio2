import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = url && key ? createServerClient(url, key, {
      cookies: {
        async getAll() {
          return (await cookies()).getAll()
        },
        async setAll(cookiesToSet) {
          const store = await cookies()
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
        },
      },
    }) : null
    const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } }
    const userId = data.user?.id
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const record = {
      title: body.title,
      description: body.description,
      requirements: body.requirements,
      salaryMin: body.salaryMin ?? null,
      salaryMax: body.salaryMax ?? null,
      currency: body.currency ?? 'USD',
      country: body.location?.country ?? null,
      city: body.location?.city ?? null,
      modality: body.modality ?? 'remoto',
      employmentType: body.employmentType ?? 'freelance',
      contact: body.contact ?? null,
      tags: Array.isArray(body.tags) ? body.tags : [],
      attachments: Array.isArray(body.attachments) ? body.attachments : [],
      author: userId,
      author_email: data.user?.email ?? null,
      isApproved: false,
    }
    const insert = await supabase!.from('offers').insert([record]).select('id,title')
    if (insert.error) {
      return NextResponse.json({ error: 'DB insert error', details: insert.error.message }, { status: 500 })
    }
    const inserted = (insert.data || [])[0]

    // notify admins to review
    const base = request.nextUrl.origin
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''
    const approveUrl = `${base}/api/moderation/approve?type=offer&id=${inserted.id}${secretParam}`
    await sendAdminNotification({
      subject: `Nueva oferta por aprobar: ${record.title}`,
      text: `Se creó una nueva oferta: ${record.title}\nRevisar y aprobar: ${approveUrl}`
    })

    // optionally notify author
    if (data.user?.email) {
      await sendAuthorNotification({ to: data.user.email, subject: 'Tu oferta fue enviada para revisión' , text: `Gracias, tu oferta '${record.title}' fue enviada y está pendiente de aprobación por un administrador.` })
    }

    return NextResponse.json({ ok: true, id: inserted.id })
  } catch (err) {
    console.error('[api/offers] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
