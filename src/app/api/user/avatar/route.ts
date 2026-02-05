import { NextResponse, NextRequest } from 'next/server'
import { getAuthUser, getBearerToken } from '@/lib/auth-helper'
import dbConnect from '../../../../lib/db'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const token = await getAuthUser(req)
    if (!token || !token.sub) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    const accessToken = getBearerToken(req)
    const supabase = await dbConnect(accessToken)

    // 1. Subir archivo a Storage (bucket 'avatars')
    // Nombre de archivo único: userId + timestamp
    const fileExt = file.name.split('.').pop()
    const fileName = `${token.sub}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // Convertir File a ArrayBuffer para subirlo
    const fileBuffer = await file.arrayBuffer()

    const { error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: true
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json({ error: 'Error uploading file', details: uploadError.message }, { status: 500 })
    }

    // 2. Obtener URL pública
    const { data: { publicUrl } } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath)

    // 3. Actualizar base de datos
    const { data, error: dbError } = await supabase
      .from('usuarios')
      .update({ imagen_perfil: publicUrl })
      .eq('id', token.sub)
      .select('id')
      .single()
    
    if (dbError) {
      console.error('DB update error:', dbError)
      return NextResponse.json({ error: 'DB error', details: dbError.message }, { status: 500 })
    }
    
    if (!data) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (err) {
    console.error('Avatar upload error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
