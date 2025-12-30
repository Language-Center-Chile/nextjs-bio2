'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function ProductForm({ onCreated }: { onCreated?: () => void }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [category, setCategory] = useState('semillas')
  const [country, setCountry] = useState('Chile')
  const [city, setCity] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const images = [] as string[]
      for (const f of files) {
        const b = await fileToBase64(f)
        images.push(b)
      }

      const body = {
        title,
        description,
        price: Number(price),
        category,
        images,
        location: { country, city }
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      })

      if (res.ok) {
        setMessage('Producto creado')
        setTitle('')
        setDescription('')
        setPrice('')
        setFiles([])
        if (onCreated) onCreated()
        router.refresh()
      } else {
        const j = await res.json().catch(() => null)
        setMessage(j?.error || 'Error creando producto')
      }
    } catch (err) {
      setMessage('Error de red')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-800 p-4 rounded space-y-3">
      {message && <div className="text-sm text-green-400">{message}</div>}

      <div>
        <label className="text-sm block mb-1">Título</label>
        <input className="w-full px-3 py-2 rounded bg-neutral-700" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm block mb-1">Descripción</label>
        <textarea className="w-full px-3 py-2 rounded bg-neutral-700" value={description} onChange={e => setDescription(e.target.value)} required rows={4} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm block mb-1">Precio (CLP)</label>
          <input type="number" className="w-full px-3 py-2 rounded bg-neutral-700" value={price} onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))} required />
        </div>

        <div>
          <label className="text-sm block mb-1">Categoría</label>
          <select className="w-full px-3 py-2 rounded bg-neutral-700" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="semillas">Semillas</option>
            <option value="plantas">Plantas</option>
            <option value="herramientas">Herramientas</option>
            <option value="servicios">Servicios</option>
            <option value="otros">Otros</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm block mb-1">País</label>
          <input className="w-full px-3 py-2 rounded bg-neutral-700" value={country} onChange={e => setCountry(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm block mb-1">Ciudad</label>
          <input className="w-full px-3 py-2 rounded bg-neutral-700" value={city} onChange={e => setCity(e.target.value)} required />
        </div>
      </div>

      <div>
        <label className="text-sm block mb-1">Imágenes (opcional)</label>
        <input type="file" accept="image/*" multiple onChange={e => setFiles(Array.from(e.target.files || []))} />
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="bg-green-600 px-4 py-2 rounded font-semibold">{saving ? 'Subiendo...' : 'Agregar producto'}</button>
      </div>
    </form>
  )
}