import { NextRequest, NextResponse } from 'next/server'
// POST /api/products - Crear nuevo producto
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const product = new Product(body)
    await product.save()

    // Poblar el seller antes de retornar
    await product.populate('seller', 'name email avatar')

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
