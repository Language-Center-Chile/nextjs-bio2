import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import User from '@/models/User'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const users = await User.insertMany([
      {
        name: "María González",
        email: "maria@example.com",
        role: "consultant",
        bio: "Especialista en plantas nativas chilenas"
      },
      {
        name: "Carlos Ruiz",
        email: "carlos@example.com", 
        role: "user",
        bio: "Apasionado por la jardinería sustentable"
      },
      {
        name: "Ana Silva",
        email: "ana@example.com",
        role: "consultant",
        bio: "Bióloga especializada en biodiversidad"
      }
    ])

    // Crear productos de ejemplo
    const products = await Product.insertMany([
      {
        title: "Semillas de Quillay Nativo",
        description: "Semillas certificadas de Quillay (Quillaja saponaria), árbol nativo chileno ideal para reforestación y jardines sustentables.",
        price: 5500,
        category: "semillas",
        images: [],
        seller: users[0]._id,
        location: {
          country: "Chile",
          city: "Santiago"
        }
      },
      {
        title: "Planta de Lavanda Orgánica",
        description: "Lavanda cultivada orgánicamente, perfecta para jardines aromáticos y usos medicinales. Incluye maceta biodegradable.",
        price: 12000,
        category: "plantas",
        images: [],
        seller: users[1]._id,
        location: {
          country: "Chile",
          city: "Valparaíso"
        }
      },
      {
        title: "Kit de Herramientas de Bambú",
        description: "Set completo de herramientas de jardinería hechas de bambú sustentable. Incluye pala, rastrillo y transplantador.",
        price: 25000,
        category: "herramientas",
        images: [],
        seller: users[2]._id,
        location: {
          country: "Chile",
          city: "Concepción"
        }
      },
      {
        title: "Asesoría en Huerto Urbano",
        description: "Consultoría personalizada para diseñar y mantener tu huerto urbano. Incluye plan de cultivo estacional.",
        price: 45000,
        category: "servicios",
        images: [],
        seller: users[0]._id,
        location: {
          country: "Chile",
          city: "Santiago"
        }
      },
      {
        title: "Semillas de Tomate Cherry Heirloom",
        description: "Variedad ancestral de tomate cherry, ideal para cultivo en macetas. Semillas orgánicas certificadas.",
        price: 3500,
        category: "semillas",
        images: [],
        seller: users[1]._id,
        location: {
          country: "Chile",
          city: "La Serena"
        }
      },
      {
        title: "Planta Suculenta Mix",
        description: "Colección de 5 suculentas diferentes, perfectas para principiantes. Resistentes y de bajo mantenimiento.",
        price: 18000,
        category: "plantas",
        images: [],
        seller: users[2]._id,
        location: {
          country: "Chile",
          city: "Antofagasta"
        }
      }
    ])

    return NextResponse.json({
      message: 'Datos de ejemplo creados exitosamente',
      users: users.length,
      products: products.length
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Error al poblar la base de datos', details: error.message }, 
      { status: 500 }
    )
  }
}
