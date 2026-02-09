import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getAuthUser, getBearerToken } from '@/lib/auth-helper'

export async function POST(req: NextRequest) {
  try {
    const token = await getAuthUser(req)
    const accessToken = getBearerToken(req)

    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, address, postalCode, bio, role, especialidad, experiencia, cv_url, certificaciones } = body
    const supabase = await dbConnect(accessToken)

    // Preparar objeto de actualización
    // Usamos upsert para crear el usuario si no existe (sincronización auth -> public)
    const updates: any = { 
      id: userId,
      email: token?.email,
      updated_at: new Date().toISOString()
    }

    // Función para limpiar valores vacíos
    const clean = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v);

    // Mapeo seguro de roles a valores permitidos por la constraint
    const ROLE_MAP: Record<string, string> = {
      'Usuario': 'usuario_regular',
      'Consultor': 'consultor',
      'user': 'usuario_regular',
      'consultant': 'consultor',
      'usuario_regular': 'usuario_regular',
      'reclutador': 'reclutador',
      'consultor': 'consultor',
      'admin': 'admin'
    }

    let safeRole: string | undefined = undefined // ← declarar fuera

    // Solo actualizamos campos si vienen definidos
    if (name !== undefined) updates.name = clean(name)
    if (address !== undefined) updates.address = clean(address)
    // Removed postalCode and bio from usuarios table as they are not in the schema
    if (role !== undefined) {
      safeRole = ROLE_MAP[role] || 'usuario_regular' // ← asignar aquí
      updates.tipo_usuario = clean(safeRole)
    }

    const { data, error } = await supabase
      .from('usuarios')
      .upsert(updates, { onConflict: 'email' }) // ← clave: conflicto sobre email
      .select('id, email, name')
      .single()
    
    if (error) {
      console.error('DB Error updating usuarios table:', error)
      return NextResponse.json({ error: 'DB error', details: error.message }, { status: 500 })
    }
    if (!data) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Si el rol es consultor, asegurar que exista en la tabla consultores
    if (safeRole === 'consultor') {
      const { data: existing, error: searchError } = await supabase
        .from('consultores')
        .select('id')
        .eq('usuario_id', userId)
        .single()
      
      if (searchError && searchError.code !== 'PGRST116') { // PGRST116 es "no rows returned"
         console.error('Error searching consultant:', searchError)
      }

      // Obtener imagen_perfil del usuario para copiarla a consultores
      const { data: userData } = await supabase
        .from('usuarios')
        .select('imagen_perfil')
        .eq('id', userId)
        .single();

      // Datos a guardar en consultores
      const consultantData = {
        usuario_id: userId,
        especialidad: especialidad || 'General',
        experiencia: experiencia || bio || 'Perfil de consultor',
        cv_url: cv_url || '',
        certificaciones: certificaciones || '',
        imagen: userData?.imagen_perfil || '', // ← copiar imagen
        verificado: false
      }

      if (!existing) {
        // Crear nuevo
        const { error: insertError } = await supabase.from('consultores').insert(consultantData)

        if (insertError) {
          console.error('Error creating consultant profile:', insertError)
          return NextResponse.json({ error: 'Error creating consultant', details: insertError.message }, { status: 500 })
        }
      } else {
        // Actualizar existente
        // Solo actualizamos si vienen datos específicos, para no sobrescribir con valores por defecto
        const updateData: any = {}
        if (especialidad) updateData.especialidad = especialidad
        if (experiencia) updateData.experiencia = experiencia
        if (cv_url !== undefined) updateData.cv_url = cv_url
        if (certificaciones !== undefined) updateData.certificaciones = certificaciones

        if (Object.keys(updateData).length > 0) {
          const { error: updateError } = await supabase
            .from('consultores')
            .update(updateData)
            .eq('id', existing.id)
          
          if (updateError) {
             console.error('Error updating consultant profile:', updateError)
             return NextResponse.json({ error: 'Error updating consultant', details: updateError.message }, { status: 500 })
          }
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error updating profile:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
