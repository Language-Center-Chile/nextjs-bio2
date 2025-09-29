'use client'

import { useState } from 'react'
import ProfileForm from '@/components/ProfileForm'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import ProductForm from '@/components/ProductForm'
import JobOfferForm from '@/components/JobOfferForm'
import ConsultantProfileForm from '@/components/ConsultantProfileForm'

export default function ProfileLayout() {
  const { data: session } = useSession()
  const [editing, setEditing] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [showJobOfferForm, setShowJobOfferForm] = useState(false)
  const [showConsultantForm, setShowConsultantForm] = useState(false)

  function handleEditClick() {
    const next = !editing
    setEditing(next)
    if (next) {
      setShowProductForm(false)
      setShowJobOfferForm(false)
      setShowConsultantForm(false)
    }
  }

  function handleAddProductClick() {
    const next = !showProductForm
    setShowProductForm(next)
    if (next) {
      setEditing(false)
      setShowJobOfferForm(false)
      setShowConsultantForm(false)
    }
  }

  function handleJobOfferClick() {
    const next = !showJobOfferForm
    setShowJobOfferForm(next)
    if (next) {
      setEditing(false)
      setShowProductForm(false)
      setShowConsultantForm(false)
    }
  }

  function handleConsultantClick() {
    const next = !showConsultantForm
    setShowConsultantForm(next)
    if (next) {
      setEditing(false)
      setShowProductForm(false)
      setShowJobOfferForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white py-6 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="bg-neutral-800 p-4 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            {session?.user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={session.user.image} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-neutral-700 grid place-items-center text-white">U</div>
            )}

            <div className="text-lg font-semibold">{session?.user?.name}</div>
            <div className="text-sm text-gray-400">{session?.user?.email}</div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleEditClick}
              className={`w-full py-2 rounded font-semibold ${editing ? 'bg-amber-400 text-black' : 'bg-amber-500 text-black'}`}
            >
              Editar Perfil
            </button>

            <button
              onClick={handleAddProductClick}
              className={`block w-full text-center mt-2 py-2 rounded font-semibold ${showProductForm ? 'bg-green-500' : 'bg-green-600'}`}
            >
              Agregar Producto
            </button>

            <button
              onClick={handleJobOfferClick}
              className={`block w-full text-center mt-2 py-2 rounded font-semibold ${showJobOfferForm ? 'bg-blue-500' : 'bg-blue-600'}`}
            >
              Buscamos Consultores
            </button>

            <button
              onClick={handleConsultantClick}
              className={`block w-full text-center mt-2 py-2 rounded font-semibold ${showConsultantForm ? 'bg-purple-500' : 'bg-purple-600'}`}
            >
              Mi Perfil de Consultor
            </button>

            <div className="mt-4 text-sm text-gray-400">
              Aquí puedes editar tu perfil, agregar productos o publicar/registrarte como consultor.
            </div>
          </div>
        </aside>

        <main className="md:col-span-3">
          {showProductForm ? (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Agregar producto</h2>
              <ProductForm onCreated={() => setShowProductForm(false)} />
            </div>
          ) : showJobOfferForm ? (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Publicar oferta (Buscamos Consultores)</h2>
              <JobOfferForm onCreated={() => setShowJobOfferForm(false)} />
            </div>
          ) : showConsultantForm ? (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Publicar mi perfil de consultor</h2>
              <ConsultantProfileForm onSaved={() => setShowConsultantForm(false)} />
            </div>
          ) : (
            <ProfileForm editing={editing} onEditingChange={setEditing} />
          )}
        </main>
      </div>
    </div>
  )
}
