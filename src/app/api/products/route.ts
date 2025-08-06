import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

// GET /api/products - Obtener productos con filtros
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const country = searchParams.get('country')
    const city = searchParams.get('city')

    // Construir filtros
    const filters: any = { isActive: true }
    
    if (category && category !== 'all') {
      filters.category = category
    }
    
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (country) filters['location.country'] = country
    if (city) filters['location.city'] = city

    // Paginación
    const skip = (page - 1) * limit

    // Consulta con población del vendedor
    const products = await Product.find(filters)
      .populate('seller', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalProducts = await Product.countDocuments(filters)
    const totalPages = Math.ceil(totalProducts / limit)

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}

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
