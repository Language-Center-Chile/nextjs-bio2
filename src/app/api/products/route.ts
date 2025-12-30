import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helper'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'

interface UserToken {
  sub: string
  email?: string
}

interface SellerData {
  id: string
  name: string
  email: string
  avatar: string
}

// POST /api/products - Crear nuevo producto
export async function POST(request: NextRequest) {
  try {
    const supabase = await dbConnect()
    const token = await getAuthUser(request)
    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    }

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const productData = { ...body, seller_id: userId, is_approved: false }
    const insertRes = await supabase.from('products').insert(productData).select('*').single()
    if (insertRes.error) {
      return NextResponse.json({ error: 'Datos de producto inválidos', details: insertRes.error.message }, { status: 400 })
    }
    const product = insertRes.data
    let seller: SellerData | null = null
    const sellerRes = await supabase.from('users').select('id,name,email,avatar').eq('id', userId).single()
    if (!sellerRes.error && sellerRes.data) seller = sellerRes.data as SellerData

    // notify admins
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''
    const approveUrl = `${base}/api/moderation/approve?type=product&id=${product.id}${secretParam}`
    await sendAdminNotification({ subject: `Nuevo producto a revisar: ${product.title}`, text: `Revisar: ${approveUrl}` })
    // optionally notify author
    // If token included email, notify
    if (token && (token as unknown as UserToken).email) {
      await sendAuthorNotification({ to: (token as unknown as UserToken).email!, subject: 'Tu producto fue enviado para revisión', text: `Gracias, tu producto '${product.title}' está pendiente de aprobación.` })
    }

    return NextResponse.json({ ...product, seller }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating product:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}