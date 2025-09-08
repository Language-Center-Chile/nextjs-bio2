'use client'

import { useState } from 'react'

interface Props {
  onCreated?: () => void
}

export default function JobOfferForm({ onCreated }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [salaryMin, setSalaryMin] = useState<number | undefined>(undefined)
  const [salaryMax, setSalaryMax] = useState<number | undefined>(undefined)
  const [currency, setCurrency] = useState('USD')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [modality, setModality] = useState<'presencial'|'remoto'|'híbrido'>('remoto')
  const [employmentType, setEmploymentType] = useState<'full-time'|'part-time'|'contract'|'freelance'|'other'>('freelance')
  const [contact, setContact] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = {
      title,
      description,
      requirements,
      salaryMin,
      salaryMax,
      currency,
      location: { country, city },
      modality,
      employmentType,
      contact,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    const res = await fetch('/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    })

    if (res.ok) {
      setTitle('')
      setDescription('')
      setRequirements('')
      setSalaryMin(undefined)
      setSalaryMax(undefined)
      setCountry('')
      setCity('')
      setTags('')
      if (onCreated) onCreated()
      alert('Oferta publicada')
    } else {
      const data = await res.json()
      alert('Error: ' + (data?.error || 'No se pudo crear la oferta'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" required />
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" rows={5} />
      </div>

      <div>
        <label className="block text-sm font-medium">Requisitos</label>
        <textarea value={requirements} onChange={e=>setRequirements(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" rows={4} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Salario mínimo</label>
          <input type="number" value={salaryMin ?? ''} onChange={e=>setSalaryMin(e.target.value ? Number(e.target.value) : undefined)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
        </div>
        <div>
          <label className="block text-sm font-medium">Salario máximo</label>
          <input type="number" value={salaryMax ?? ''} onChange={e=>setSalaryMax(e.target.value ? Number(e.target.value) : undefined)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">País</label>
          <input value={country} onChange={e=>setCountry(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
        </div>
        <div>
          <label className="block text-sm font-medium">Ciudad</label>
          <input value={city} onChange={e=>setCity(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Modalidad</label>
          <select value={modality} onChange={e=>setModality(e.target.value as any)} className="w-full mt-1 p-2 rounded bg-neutral-800">
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="híbrido">Híbrido</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select value={employmentType} onChange={e=>setEmploymentType(e.target.value as any)} className="w-full mt-1 p-2 rounded bg-neutral-800">
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Contact</label>
        <input value={contact} onChange={e=>setContact(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
      </div>

      <div>
        <label className="block text-sm font-medium">Tags (coma separadas)</label>
        <input value={tags} onChange={e=>setTags(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" placeholder="ej: manejo de proyectos, SEO" />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 rounded">Publicar</button>
        <button type="button" onClick={()=>{ if (onCreated) onCreated() }} className="px-4 py-2 bg-neutral-700 rounded">Cancelar</button>
      </div>
    </form>
  )
}
