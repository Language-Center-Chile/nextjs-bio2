import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  images: string[]
  seller_id: string
  created_at: string
  is_approved: boolean
  country?: string
  city?: string
}

interface Seller {
  id: string
  name: string
  email: string
  avatar: string
  bio?: string
}

// GET /api/products/[id] - Obtener producto específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await dbConnect()
    const res = await supabase.from('products').select('*').eq('id', id).single()
    if (res.error && res.error.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 })
    }
    const product = res.data as Product | null

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' }, 
        { status: 404 }
      )
    }

    let seller: Seller | null = null
    if (product && product.seller_id) {
      const sellerRes = await supabase.from('users').select('id,name,email,avatar,bio').eq('id', product.seller_id).single()
      if (!sellerRes.error && sellerRes.data) seller = sellerRes.data as Seller
    }

    return NextResponse.json(product ? { ...product, seller } : null)

  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Actualizar producto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await dbConnect()
    const body = await request.json()
    const updateRes = await supabase.from('products').update(body).eq('id', id).select('*').single()
    if (updateRes.error) {
      return NextResponse.json({ error: 'Datos de producto inválidos', details: updateRes.error.message }, { status: 400 })
    }
    const product = updateRes.data as Product | null
    let seller: Seller | null = null
    if (product && product.seller_id) {
      const sellerRes = await supabase.from('users').select('id,name,email,avatar').eq('id', product.seller_id).single()
      if (!sellerRes.error && sellerRes.data) seller = sellerRes.data as Seller
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ ...product, seller })

  } catch (error: any) {
    console.error('Error updating product:', error)
    
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Eliminar producto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await dbConnect()
    const delRes = await supabase.from('products').delete().eq('id', id)
    if (delRes.error) {
      return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 })
    }
    const count = delRes.count ?? null

    if (count === 0) {
      return NextResponse.json(
        { error: 'Producto no encontrado' }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Producto eliminado exitosamente' })

  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}