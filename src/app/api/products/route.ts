import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import User from '@/models/User'
import { getToken } from 'next-auth/jwt'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'

// POST /api/products - Crear nuevo producto
export async function POST(request: NextRequest) {
  try {
    // DEBUG: imprimir cabecera cookie para diagnosticar
    console.log('[api/products] cookies header:', request.headers.get('cookie'))

    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    console.log('[api/products] getToken result:', token)

    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    }

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const body = await request.json()
    // Asegurar seller desde token / fallback
    const productData = { ...body, seller: userId, isApproved: false }

    const product = new Product(productData)
    await product.save()

    // Poblar el seller antes de retornar
    // Evitar populate por posibles diferencias de instancia mongoose en tiempo de ejecución.
    const sellerDoc = await User.findById(userId).select('name email avatar')
    const productObj = product.toObject()
    productObj.seller = sellerDoc

    // notify admins
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''
    const approveUrl = `${base}/api/moderation/approve?type=product&id=${product._id}${secretParam}`
    await sendAdminNotification({ subject: `Nuevo producto a revisar: ${product.title}`, text: `Revisar: ${approveUrl}` })
    // optionally notify author
    // If token included email, notify
    if (token && (token as any).email) {
      await sendAuthorNotification({ to: (token as any).email, subject: 'Tu producto fue enviado para revisión', text: `Gracias, tu producto '${product.title}' está pendiente de aprobación.` })
    }

    return NextResponse.json(product, { status: 201 })

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
