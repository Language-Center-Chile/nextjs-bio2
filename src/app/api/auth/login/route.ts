import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validar que se proporcionaron email y password
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Conectar a MongoDB
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();

    try {
      const db = client.db();
      const usersCollection = db.collection('users');

      // Buscar usuario por email
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return NextResponse.json(
          { error: 'Usuario no encontrado' },
          { status: 401 }
        );
      }

      // En un entorno real, deberías verificar la contraseña con bcrypt
      // Por ahora, solo verificamos que exista el usuario
      
      return NextResponse.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          password: user.password
        }
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}