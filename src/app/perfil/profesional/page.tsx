
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProfileLayout from '@/components/ProfileLayout'

export default function ProfessionalProfilePage() {
  return (
    <ProfileLayout>
      <ProfessionalForm />
    </ProfileLayout>
  )
}

function ProfessionalForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  
  const [role, setRole] = useState('user')
  const [formData, setFormData] = useState({
    especialidad: '',
    experiencia: '',
    cv_url: '',
    certificaciones: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Cargar rol desde usuarios
      const { data: userData } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('id', user.id)
        .single()
      
      if (userData?.rol) setRole(userData.rol)

      // Cargar datos de consultor si existen
      const { data: consultantData } = await supabase
        .from('consultores')
        .select('*')
        .eq('usuario_id', user.id)
        .single()

      if (consultantData) {
        setFormData({
          especialidad: consultantData.especialidad || '',
          experiencia: consultantData.experiencia || '',
          cv_url: consultantData.cv_url || '',
          certificaciones: consultantData.certificaciones || ''
        })
      }
    } catch (e) {
      console.error('Error loading data', e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      // Usamos la misma ruta de perfil pero le enviamos los datos extra
      // Nota: Necesitaremos actualizar el backend para aceptar estos campos específicos
      // O llamar directamente a Supabase si las reglas RLS lo permiten.
      // Por consistencia con tu error 401 anterior, usaremos un endpoint dedicado o el mismo si lo adaptamos.
      
      // Vamos a usar el endpoint existente adaptado
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          role,
          ...formData
        })
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Error al guardar')
      }

      setMessage('Datos profesionales actualizados correctamente')
      router.refresh()
    } catch (err: any) {
      setMessage(err.message || 'Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-white">Cargando datos...</div>

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-bold text-white mb-4">Datos Profesionales</h2>
      
      {message && (
        <div className={`p-3 rounded text-sm ${message.includes('Error') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Selector de Rol */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Perfil</label>
          <div className="flex gap-4">
            <label className={`flex-1 cursor-pointer p-4 rounded-lg border ${role === 'user' ? 'border-green-500 bg-green-900/20' : 'border-gray-700 bg-gray-800'}`}>
              <input 
                type="radio" 
                name="role" 
                value="user" 
                checked={role === 'user'} 
                onChange={(e) => setRole(e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="font-bold text-white">Usuario / Reclutador</div>
                <div className="text-xs text-gray-400 mt-1">Busco servicios o productos</div>
              </div>
            </label>

            <label className={`flex-1 cursor-pointer p-4 rounded-lg border ${role === 'consultant' ? 'border-green-500 bg-green-900/20' : 'border-gray-700 bg-gray-800'}`}>
              <input 
                type="radio" 
                name="role" 
                value="consultant" 
                checked={role === 'consultant'} 
                onChange={(e) => setRole(e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="font-bold text-white">Consultor</div>
                <div className="text-xs text-gray-400 mt-1">Ofrezco servicios profesionales</div>
              </div>
            </label>
          </div>
        </div>

        {/* Campos específicos de Consultor */}
        {role === 'consultant' && (
          <div className="space-y-4 border-t border-gray-700 pt-6 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-lg font-semibold text-green-400">Información de Consultor</h3>
            
            <div>
              <label className="block text-sm text-gray-300 mb-1">Especialidad Principal</label>
              <input 
                type="text" 
                value={formData.especialidad}
                onChange={e => setFormData({...formData, especialidad: e.target.value})}
                className="w-full px-4 py-2 bg-neutral-800 rounded border border-neutral-700 focus:border-green-500 outline-none text-white"
                placeholder="Ej: Evaluación de Impacto Ambiental"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Experiencia y Biografía Profesional</label>
              <textarea 
                value={formData.experiencia}
                onChange={e => setFormData({...formData, experiencia: e.target.value})}
                className="w-full px-4 py-2 bg-neutral-800 rounded border border-neutral-700 focus:border-green-500 outline-none text-white h-32"
                placeholder="Describe tu experiencia, años de trabajo y áreas de enfoque..."
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">URL de CV o LinkedIn (Opcional)</label>
              <input 
                type="url" 
                value={formData.cv_url}
                onChange={e => setFormData({...formData, cv_url: e.target.value})}
                className="w-full px-4 py-2 bg-neutral-800 rounded border border-neutral-700 focus:border-green-500 outline-none text-white"
                placeholder="https://linkedin.com/in/tu-perfil"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Certificaciones (Opcional)</label>
              <textarea 
                value={formData.certificaciones}
                onChange={e => setFormData({...formData, certificaciones: e.target.value})}
                className="w-full px-4 py-2 bg-neutral-800 rounded border border-neutral-700 focus:border-green-500 outline-none text-white h-24"
                placeholder="Lista tus certificaciones relevantes..."
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}
