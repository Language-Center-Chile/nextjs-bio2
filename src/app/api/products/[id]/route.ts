import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'

// GET /api/products/[id] - Obtener producto específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await dbConnect()
    const res = await supabase.from('products').select('*').eq('id', params.id).single()
    if (res.error && res.error.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 })
    }
    const product = res.data

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' }, 
        { status: 404 }
      )
    }

    let seller: any = null
    if (product && (product as any).seller_id) {
      const sellerRes = await supabase.from('users').select('id,name,email,avatar,bio').eq('id', (product as any).seller_id).single()
      if (!sellerRes.error) seller = sellerRes.data
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
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await dbConnect()
    const body = await request.json()
    const updateRes = await supabase.from('products').update(body).eq('id', params.id).select('*').single()
    if (updateRes.error) {
      return NextResponse.json({ error: 'Datos de producto inválidos', details: updateRes.error.message }, { status: 400 })
    }
    const product = updateRes.data
    let seller: any = null
    if (product && (product as any).seller_id) {
      const sellerRes = await supabase.from('users').select('id,name,email,avatar').eq('id', (product as any).seller_id).single()
      if (!sellerRes.error) seller = sellerRes.data
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
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await dbConnect()
    const delRes = await supabase.from('products').delete().eq('id', params.id)
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
