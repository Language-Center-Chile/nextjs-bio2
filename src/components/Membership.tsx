'use client'

import Link from 'next/link'
import { HiCheck, HiX } from 'react-icons/hi'
import { LuSprout, LuTrees } from 'react-icons/lu'

type Feature = {label:string; available:boolean}
type Plan = {  id: string
  title: string
  subtitle?: string
  price: string
  period: string
  cta: string
  highlight?: boolean
  icon?: 'seed' | 'sprout' | 'forest'
  features: Feature[] 
}
const plans: Plan[] = [
  {
    id: 'semilla',
    title: 'Semilla',
    subtitle: 'Para entusiastas que comienzan su viaje.',
    price: 'Gratis',
    period: '/siempre',
    cta: 'Empezar Ahora',
    icon: 'seed',
    features: [
      { label: 'Acceso a mapas de distribución básicos', available: true },
      { label: 'Boletín mensual de descubrimientos', available: true },
      { label: 'Acceso a la comunidad pública', available: false },
      { label: 'Sin acceso a datos crudos', available: false }
    ]
  },
  {
    id: 'brote',
    title: 'Brote',
    subtitle: 'Herramientas avanzadas para colaboradores activos.',
    price: '$5.700',
    period: '/mes',
    cta: 'Seleccionar Brote',
    highlight: true,
    icon: 'sprout',
    features: [
      { label: 'Todo lo incluido en Semilla', available: true },
      { label: 'Descarga de datos avanzados (CSV/JSON)', available: true },
      { label: 'Navegación sin publicidad', available: true },
      { label: 'Insignia de colaborador verificada', available: true },
      { label: 'Soporte técnico prioritario', available: true }
    ]
  },
  {
    id: 'bosque',
    title: 'Bosque',
    subtitle: 'Para organizaciones y patrocinadores serios.',
    price: '$10.000',
    period: '/mes',
    cta: 'Contribuir',
    icon: 'forest',
    features: [
      { label: 'Acceso completo a API REST', available: true },
      { label: 'Reportes de impacto exclusivos', available: true },
      { label: 'Contacto directo con investigadores', available: true },
      { label: 'Menciones en publicaciones anuales', available: true },
      { label: 'Licencia para uso comercial de datos', available: true }
    ]
  }
]

function PlanIcon({ type }: { type?: 'seed' | 'sprout' | 'forest' }) {
  if (type === 'sprout') return <LuSprout className="text-green-400" />
  if (type === 'forest') return <LuTrees className="text-green-400" />
  return <LuSprout className="text-green-400" />
}

function Membership() {
    return (
        <section className="py-16 bg-[#0f1e12]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-white md:text-5xl font-extrabold tracking-tight">
            Elige tu impacto en la <span className="text-green-500">biodiversidad</span>
          </h2>
          <p className="text-white/70 mt-3 max-w-2xl mx-auto">
            Únete a nuestra misión de proteger el planeta. Desde estudiantes curiosos hasta grandes instituciones, tenemos un plan para potenciar tu contribución.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div
              key={p.id}
              className={`rounded-2xl border p-6 shadow-2xl ${
                p.highlight ? 'border-green-600 bg-green-900/10' : 'border-green-700/40 bg-[#0d1a10]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80">
                  <PlanIcon type={p.icon} />
                  <span className="uppercase tracking-wide">{p.title}</span>
                </div>
                {p.highlight && (
                  <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">Recomendado</span>
                )}
              </div>
              <div className="mt-3 text-white/70 text-sm">{p.subtitle}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <div className="text-4xl text-white font-extrabold">{p.price}</div>
                <div className="text-sm text-white/60">{p.period}</div>
              </div>
              <Link
                href="/membresia"
                className={`mt-6 block w-full text-center rounded-lg px-4 py-3 font-semibold transition ${
                  p.highlight
                    ? 'bg-green-500 hover:bg-green-600 text-black'
                    : 'bg-green-800/40 hover:bg-green-700/50 text-white'
                }`}
              >
                {p.cta}
              </Link>
              <ul className="mt-6 space-y-3">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {f.available ? (
                      <div className="w-6 h-6 rounded-full bg-green-600/20 grid place-items-center">
                        <HiCheck className="text-green-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white/10 grid place-items-center">
                        <HiX className="text-white/40" />
                      </div>
                    )}
                    <span className={`text-sm ${f.available ? 'text-white/90' : 'text-white/60'}`}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>


    )
}

export default Membership