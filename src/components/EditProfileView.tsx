'use client'

import Image from 'next/image'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type FormState = {
  name: string
  address: string
  postalCode: string
  bio: string
  role: string
  especialidad: string
  experiencia: string
  cv_url: string
  certificaciones: string
}

type UserMetadata = {
  name?: string
  full_name?: string
  avatar_url?: string
  picture?: string
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const inputClassName =
  'w-full rounded-lg border border-neutral-800 bg-neutral-950/40 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-emerald-600/60 focus:ring-2 focus:ring-emerald-600/30'

const labelClassName = 'mb-2 block text-[11px] font-medium tracking-wider text-neutral-400 uppercase'

function Card({
  title,
  subtitle,
  children
}: {
  title?: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur">
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h2 className="text-sm font-semibold text-neutral-100">{title}</h2>}
          {subtitle && <p className="mt-1 text-xs text-neutral-400">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  )
}

export default function EditProfileView() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [loading, setLoading] = useState(true)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [preview, setPreview] = useState<string | null>(null)
  const [avatarBusy, setAvatarBusy] = useState(false)

  const [form, setForm] = useState<FormState>({
    name: '',
    address: '',
    postalCode: '',
    bio: '',
    role: 'Usuario',
    especialidad: '',
    experiencia: '',
    cv_url: '',
    certificaciones: ''
  })

  const [initialForm, setInitialForm] = useState<FormState | null>(null)
  const [initialPreview, setInitialPreview] = useState<string | null>(null)

  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string>('')

  const [newCert, setNewCert] = useState('')

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData.session
      if (!active) return
      if (!session) {
        router.push('/login')
        return
      }

      setSessionToken(session.access_token)
      setUserEmail(session.user.email ?? '')

      const metadata = (session.user.user_metadata || {}) as UserMetadata
      const initialAvatar = null // Will be set after dbUser fetch
      setPreview(initialAvatar)
      setInitialPreview(initialAvatar)

      const displayName = metadata.name || metadata.full_name || ''

      const base: FormState = {
        name: displayName,
        address: '',
        postalCode: '',
        bio: '',
        role: 'Usuario',
        especialidad: '',
        experiencia: '',
        cv_url: '',
        certificaciones: ''
      }

      const { data: dbUser } = await supabase
        .from('usuarios')
        .select('name,address,tipo_usuario,imagen_perfil')
        .eq('id', session.user.id)
        .single()

      if (!active) return

      const dbAvatar = dbUser?.imagen_perfil ?? metadata.avatar_url ?? metadata.picture ?? null
      setPreview(dbAvatar)
      setInitialPreview(dbAvatar)

      const role = dbUser?.tipo_usuario ?? base.role
      const merged: FormState = {
        ...base,
        name: dbUser?.name ?? base.name,
        address: dbUser?.address ?? base.address,
        role
      }

      if (role === 'Consultor') {
        const { data: consultant } = await supabase
          .from('consultores')
          .select('especialidad,experiencia,cv_url,certificaciones')
          .eq('usuario_id', session.user.id)
          .single()

        if (!active) return

        merged.especialidad = consultant?.especialidad ?? ''
        merged.experiencia = consultant?.experiencia ?? ''
        merged.bio = consultant?.experiencia ?? '' // Use experiencia as bio for consultants
        merged.cv_url = consultant?.cv_url ?? ''
        merged.certificaciones = consultant?.certificaciones ?? ''
      }

      setForm(merged)
      setInitialForm(merged)
      setLoading(false)
    })()

    return () => {
      active = false
    }
  }, [router])

  const completion = useMemo(() => {
    const required = [
      form.name?.trim(),
      userEmail?.trim(),
      form.especialidad?.trim() || form.address?.trim(),
      form.bio?.trim(),
      form.certificaciones?.trim() || form.experiencia?.trim()
    ]
    const filled = required.filter(Boolean).length
    return clamp(Math.round((filled / required.length) * 100), 0, 100)
  }, [form.address, form.bio, form.certificaciones, form.especialidad, form.experiencia, form.name, userEmail])

  const certifications = useMemo(() => {
    return form.certificaciones
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
  }, [form.certificaciones])

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) {
      setMessage('El nombre completo es obligatorio')
      return
    }

    setIsSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {})
        },
        credentials: 'include',
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const j = await res.json().catch(() => null)
        setMessage(j?.error || 'Error al guardar')
        return
      }

      setMessage('Cambios guardados')
      setInitialForm(form)
      router.refresh()
    } catch {
      setMessage('Error de red')
    } finally {
      setIsSaving(false)
    }
  }

  function handleCancel() {
    if (!initialForm) return
    setForm(initialForm)
    setPreview(initialPreview)
    setMessage('')
    setNewCert('')
  }

  async function handlePickAvatar() {
    fileInputRef.current?.click()
  }

  async function handleAvatarSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    const dataUrl = await fileToBase64(file)
    setPreview(dataUrl)
    setAvatarBusy(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        headers: {
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {})
        },
        credentials: 'include',
        body: formData
      })

      if (!res.ok) {
        const j = await res.json().catch(() => null)
        setMessage(j?.error || 'Error al subir foto')
        return
      }

      setMessage('Foto actualizada')
      router.refresh()
    } catch {
      setMessage('Error de red al subir foto')
    } finally {
      setAvatarBusy(false)
    }
  }

  function handleRemoveAvatar() {
    setPreview(null)
  }

  function handleAddCertification() {
    const value = newCert.trim()
    if (!value) return
    const next = [...certifications, value]
    updateField('certificaciones', next.join('\n'))
    setNewCert('')
  }

  function handleRemoveCertification(idx: number) {
    const next = certifications.filter((_, i) => i !== idx)
    updateField('certificaciones', next.join('\n'))
  }

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-12 text-center text-neutral-300">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-100">Editar Perfil</h1>
          <p className="mt-1 text-sm text-neutral-400">Personaliza tu información pública dentro de la red de consultores.</p>
        </header>

        <form onSubmit={handleSave} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="h-28 w-28 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="avatar"
                        width={112}
                        height={112}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-2xl font-semibold text-neutral-300">
                        {(form.name || userEmail || 'U')[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-emerald-600 text-[10px] font-semibold text-black">
                    ✓
                  </div>
                </div>

                <div className="mt-4 text-sm font-semibold text-neutral-100">Foto de perfil</div>
                <p className="mt-1 max-w-[26ch] text-xs text-neutral-400">
                  Recomendación: JPG o PNG de al menos 400×400px.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarSelected}
                />

                <button
                  type="button"
                  onClick={handlePickAvatar}
                  disabled={avatarBusy}
                  className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold tracking-wider text-black disabled:opacity-60"
                >
                  {avatarBusy ? 'SUBIENDO...' : 'SUBIR NUEVA FOTO'}
                </button>
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="mt-3 text-xs font-semibold text-red-400 hover:text-red-300"
                >
                  ELIMINAR
                </button>
              </div>
            </Card>

            <Card title="Estado de Perfil" subtitle="">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="text-neutral-400">Visibilidad</div>
                  <div className="rounded-full bg-neutral-800 px-2 py-0.5 font-medium text-neutral-200">Público</div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="text-neutral-400">Completado</div>
                  <div className="font-medium text-neutral-200">{completion}%</div>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-8">
            <Card>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClassName}>Nombre completo</label>
                  <input
                    className={inputClassName}
                    name="name"
                    value={form.name}
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className={labelClassName}>Correo electrónico</label>
                  <input className={inputClassName} value={userEmail} readOnly />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClassName}>Tipo de Perfil</label>
                  <select
                    className={inputClassName}
                    name="role"
                    value={form.role}
                    onChange={e => updateField('role', e.target.value)}
                  >
                    <option className="bg-neutral-950" value="Usuario">Usuario / Reclutador</option>
                    <option className="bg-neutral-950" value="Consultor">Consultor</option>
                  </select>
                  <p className="mt-2 text-xs text-neutral-400">
                    Si eliges "Consultor", aparecerás en la red de profesionales y podrás ofrecer servicios.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClassName}>Especialidad</label>
                  <input
                    className={inputClassName}
                    value={form.especialidad}
                    onChange={e => updateField('especialidad', e.target.value)}
                    placeholder="Especialización o área principal"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClassName}>Descripción biográfica</label>
                  <textarea
                    className={`${inputClassName} resize-none`}
                    rows={5}
                    value={form.bio}
                    onChange={e => updateField('bio', e.target.value)}
                    placeholder="Cuéntanos sobre tu experiencia, enfoque y logros."
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-neutral-800 bg-neutral-900 px-5 py-2 text-xs font-semibold tracking-wider text-neutral-200 hover:bg-neutral-800"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold tracking-wider text-black disabled:opacity-60"
                >
                  {isSaving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                </button>
              </div>

              {message && <div className="mt-4 text-sm text-emerald-300">{message}</div>}
            </Card>

            <Card
              title="Certificaciones y Logros"
              subtitle="Acredita tu experiencia con certificaciones oficiales."
            >
              <div className="flex items-center justify-between gap-4">
                <div className="w-full max-w-md">
                  <input
                    className={inputClassName}
                    value={newCert}
                    onChange={e => setNewCert(e.target.value)}
                    placeholder="Ej: Certificación SEA — 2019"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="shrink-0 rounded-lg border border-emerald-600/40 bg-emerald-600/10 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-600/15"
                >
                  + Agregar Nuevo
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {certifications.length === 0 ? (
                  <div className="text-sm text-neutral-400">Aún no agregas certificaciones.</div>
                ) : (
                  certifications.map((c, idx) => (
                    <div
                      key={`${c}-${idx}`}
                      className="flex items-start justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4"
                    >
                      <div>
                        <div className="text-sm font-medium text-neutral-100">{c}</div>
                        <div className="mt-1 text-xs text-neutral-500">Certificación</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(idx)}
                        className="text-xs font-semibold text-neutral-400 hover:text-neutral-200"
                      >
                        Quitar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
