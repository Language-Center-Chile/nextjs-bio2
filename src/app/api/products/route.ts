import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Product from '@/models/Product'
import User from '@/models/User'

export async function GET() {
  try {
    await dbConnect()
    
    const products = await Product.find({ status: 'ACTIVE' })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .lean()
    
    // Convertir ObjectId a string y ocultar información sensible
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      createdBy: product.createdBy ? {
        name: (product.createdBy as any).name,
        // No incluimos el email por seguridad
      } : null,
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }))
    
    return NextResponse.json(serializedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { name, description, price, category, image, location, createdBy } = body
    
    if (!name || !description || !price || !category || !createdBy) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben estar presentes' },
        { status: 400 }
      )
    }
    
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      location,
      createdBy,
    })
    
    const populatedProduct = await Product.findById(product._id)
      .populate('createdBy', 'name email')
      .lean()
    
    const serializedProduct = {
      ...populatedProduct,
      _id: populatedProduct!._id.toString(),
      createdBy: populatedProduct!.createdBy ? {
        name: (populatedProduct!.createdBy as any).name,
      } : null,
      createdAt: populatedProduct!.createdAt?.toISOString(),
      updatedAt: populatedProduct!.updatedAt?.toISOString(),
    }
    
    return NextResponse.json(serializedProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    )
  }
}
