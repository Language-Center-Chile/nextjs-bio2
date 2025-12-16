import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'
import { createServerClient } from '@supabase/ssr'

// POST /api/products - Crear nuevo producto
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
    const userId = data.user?.id

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const sellerName = (data.user?.user_metadata?.name || data.user?.user_metadata?.full_name || data.user?.email?.split('@')[0] || 'Usuario')
    const sellerAvatar = (data.user?.user_metadata?.avatar_url as string) || undefined
    const record = {
      title: body.title,
      description: body.description,
      price: Number(body.price ?? 0),
      category: body.category,
      images: Array.isArray(body.images) ? body.images : [],
      seller: userId,
      seller_name: sellerName,
      seller_avatar: sellerAvatar,
      country: body.location?.country ?? null,
      city: body.location?.city ?? null,
      isActive: true,
      isApproved: false,
    }
    const insert = await supabase!.from('products').insert([record]).select('id,title')
    if (insert.error) {
      return NextResponse.json({ error: 'DB insert error', details: insert.error.message }, { status: 500 })
    }
    const inserted = (insert.data || [])[0]

    // notify admins
    const base = request.nextUrl.origin
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''
    const approveUrl = `${base}/api/moderation/approve?type=product&id=${inserted.id}${secretParam}`
    await sendAdminNotification({ subject: `Nuevo producto a revisar: ${record.title}`, text: `Revisar: ${approveUrl}` })
    // optionally notify author
    if (data.user?.email) {
      await sendAuthorNotification({ to: data.user.email, subject: 'Tu producto fue enviado para revisión', text: `Gracias, tu producto '${record.title}' está pendiente de aprobación.` })
    }

    return NextResponse.json({ ok: true, id: inserted.id }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating product:', error)
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Datos de producto inválidos', details: error.errors }, 
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}
