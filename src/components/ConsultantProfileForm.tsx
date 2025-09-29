'use client'

import { useState } from 'react'

interface Props {
  onSaved?: () => void
}

export default function ConsultantProfileForm({ onSaved }: Props) {
  const [rateAmount, setRateAmount] = useState<number | undefined>(undefined)
  const [rateFrequency, setRateFrequency] = useState<'hour'|'day'|'month'>('hour')
  const [degrees, setDegrees] = useState('')
  const [courses, setCourses] = useState('')
  const [description, setDescription] = useState('')
  const [objective, setObjective] = useState('')
  const [skills, setSkills] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [availability, setAvailability] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = {
      rateAmount,
      rateFrequency,
      degrees: degrees.split(',').map(s=>s.trim()).filter(Boolean),
      courses: courses.split(',').map(s=>({ name: s.trim() })).filter(Boolean),
      description,
      objective,
      skills: skills.split(',').map(s=>s.trim()).filter(Boolean),
      portfolio: portfolio.split(',').map(s=>s.trim()).filter(Boolean),
      availability
    }

    const res = await fetch('/api/consultants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    })

    if (res.ok) {
      if (onSaved) onSaved()
      alert('Perfil de consultor guardado')
    } else {
      const data = await res.json()
      alert('Error: ' + (data?.error || 'No se pudo guardar'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Tarifa</label>
          <input type="number" value={rateAmount ?? ''} onChange={e=>setRateAmount(e.target.value ? Number(e.target.value) : undefined)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
        </div>
        <div>
          <label className="block text-sm font-medium">Frecuencia</label>
          <select value={rateFrequency} onChange={e=>setRateFrequency(e.target.value as any)} className="w-full mt-1 p-2 rounded bg-neutral-800">
            <option value="hour">Hora</option>
            <option value="day">Día</option>
            <option value="month">Mes</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Grados (coma separados)</label>
        <input value={degrees} onChange={e=>setDegrees(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
      </div>

      <div>
        <label className="block text-sm font-medium">Cursos (coma separados)</label>
        <input value={courses} onChange={e=>setCourses(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción profesional</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" rows={4} />
      </div>

      <div>
        <label className="block text-sm font-medium">Objetivo / Oferta</label>
        <textarea value={objective} onChange={e=>setObjective(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" rows={3} />
      </div>

      <div>
        <label className="block text-sm font-medium">Habilidades (coma separadas)</label>
        <input value={skills} onChange={e=>setSkills(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
      </div>

      <div>
        <label className="block text-sm font-medium">Portfolio (links, coma separados)</label>
        <input value={portfolio} onChange={e=>setPortfolio(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
      </div>

      <div>
        <label className="block text-sm font-medium">Disponibilidad</label>
        <input value={availability} onChange={e=>setAvailability(e.target.value)} className="w-full mt-1 p-2 rounded bg-neutral-800" />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-purple-600 rounded">Guardar</button>
        <button type="button" onClick={()=>{ if (onSaved) onSaved() }} className="px-4 py-2 bg-neutral-700 rounded">Cancelar</button>
      </div>
    </form>
  )
}
