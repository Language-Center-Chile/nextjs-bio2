'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

type Props = {
  editing?: boolean
  onEditingChange?: (v: boolean) => void
}

export default function ProfileForm({ editing: editingProp, onEditingChange }: Props = {}) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const [editingInternal, setEditingInternal] = useState(false)
  const editing = typeof editingProp === 'boolean' ? editingProp : editingInternal

  useEffect(() => {
    if (typeof editingProp === 'boolean') setEditingInternal(editingProp)
  }, [editingProp])

  function setEditing(v: boolean) {
    if (onEditingChange) onEditingChange(v)
    setEditingInternal(v)
  }

  const [form, setForm] = useState({
    name: '',
    address: '',
    postalCode: '',
    bio: ''
  })

  useEffect(() => {
    const supabase = supabaseClient
    let mounted = true
    const init = async () => {
      if (!supabase) return
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(data.user ?? null)
      const displayName = (data.user?.user_metadata?.name || data.user?.user_metadata?.full_name || data.user?.email?.split('@')[0] || '')
      setForm({
        name: displayName,
        address: '',
        postalCode: '',
        bio: displayName ? `Hola, soy ${displayName}` : ''
      })
      setPreview((data.user?.user_metadata?.avatar_url as string) ?? null)
    }
    init()
    return () => { mounted = false }
  }, [])

  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Avatar state
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setMessage('Perfil actualizado')
        setEditing(false)
        router.refresh()
      } else {
        setMessage('Error al guardar')
      }
    } catch (err) {
      setMessage('Error de red')
    } finally {
      setIsSaving(false)
    }
  }

  // Convierte archivo a base64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await fileToBase64(file)
    setPreview(dataUrl)
  }

  async function handleUploadAvatar() {
    if (!preview) return
    setUploading(true)
    setMessage('')

    try {
      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ image: preview })
      })

      if (res.ok) {
        setMessage('Avatar actualizado')
        router.refresh()
      } else {
        const j = await res.json().catch(() => null)
        setMessage(j?.error || 'Error al subir avatar')
      }
    } catch (err) {
      setMessage('Error de red al subir avatar')
    } finally {
      setUploading(false)
    }
  }

  function onCancel() {
    setForm({
      name: (user?.user_metadata?.name as string) || (user?.user_metadata?.full_name as string) || (user?.email?.split('@')[0] || ''),
      address: (user?.user_metadata as any)?.address || '',
      postalCode: (user?.user_metadata as any)?.postalCode || '',
      bio: (user?.user_metadata as any)?.bio || (((user?.user_metadata?.name as string) || (user?.user_metadata?.full_name as string)) ? `Hola, soy ${(user?.user_metadata?.name as string) || (user?.user_metadata?.full_name as string)}` : '')
    })
    setPreview(((user?.user_metadata?.avatar_url as string) ?? null))
    setMessage('')
    setEditing(false)
  }

  // Vista de solo lectura
  if (!editing) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <div>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-neutral-700 grid place-items-center text-white">U</div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{form.name || '—'}</div>
                    <div className="text-sm text-gray-400">{user?.email}</div>
              </div>
              <div>
                <button onClick={() => setEditing(true)} className="bg-amber-500 text-black px-3 py-1 rounded">Editar</button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-300">
              <div><span className="text-gray-400">Dirección: </span>{form.address || '—'}</div>
              <div><span className="text-gray-400">Código postal: </span>{form.postalCode || '—'}</div>
              <div><span className="text-gray-400">Descripción: </span>{form.bio || '—'}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">Para cambiar la foto o los datos, pulsa "Editar".</div>
      </div>
    )
  }

  // Modo edición (el formulario existente)
  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow space-y-4">
      {message && <div className="text-sm text-green-400">{message}</div>}

      {/* Avatar */}
      <div id="avatar" className="flex items-center gap-4">
        <div>
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-neutral-700 grid place-items-center text-white">U</div>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm text-gray-300 mb-1">Foto de perfil</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-gray-300" />
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={handleUploadAvatar} disabled={uploading || !preview} className="bg-green-600 px-3 py-1 rounded text-white text-sm disabled:opacity-50">
              {uploading ? 'Subiendo...' : 'Subir foto'}
            </button>
            <button type="button" onClick={() => { setPreview((user?.user_metadata?.avatar_url as string) ?? null); setMessage('') }} className="bg-neutral-800 px-3 py-1 rounded text-white text-sm">
              Restaurar
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Si iniciaste sesión con Google, puedes usar la imagen de Google o subir una nueva.</p>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-300 block mb-1">Nombre</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 bg-neutral-800 rounded" />
      </div>

      <div>
        <label className="text-sm text-gray-300 block mb-1">Dirección</label>
        <input name="address" value={form.address} onChange={handleChange} className="w-full px-4 py-2 bg-neutral-800 rounded" />
      </div>

      <div>
        <label className="text-sm text-gray-300 block mb-1">Código postal</label>
        <input name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full px-4 py-2 bg-neutral-800 rounded" />
      </div>

      <div>
        <label className="text-sm text-gray-300 block mb-1">Descripción / Portada</label>
        <textarea name="bio" value={form.bio} onChange={handleChange} className="w-full px-4 py-2 bg-neutral-800 rounded" rows={4} />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="bg-neutral-700 px-4 py-2 rounded text-white">Cancelar</button>
        <button type="submit" disabled={isSaving} className="bg-green-600 px-4 py-2 rounded text-white">{isSaving ? 'Guardando...' : 'Guardar cambios'}</button>
      </div>
    </form>
  )
}
