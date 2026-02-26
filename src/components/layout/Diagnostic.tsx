import { FaCheck, FaLeaf, FaUserCheck, FaFileAlt, FaBalanceScale } from 'react-icons/fa';
import Link from 'next/link';

export default function Diagnostic() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] bg-[#0F1115] overflow-hidden flex items-center">
      {/* Decorative leaf background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none">
        <FaLeaf className="text-green-600 text-[40rem] ml-[-45rem] rotate-45" />
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Diagnóstico <span className="text-green-600">Express</span> de<br />
            Cumplimiento<br />
            Ambiental
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl">
            En 48–72 horas te entregamos un diagnóstico claro, una matriz de riesgos y un plan de acción de 30 días para ordenar tu cumplimiento y reducir exposición a sanciones.
          </p>

          {/* Bullet points */}
          <ul className="space-y-4 mb-10">
            {[
              "Checklist + levantamiento rápido de evidencias",
              "Matriz de riesgos y brechas priorizadas",
              "Plan 30 días + reunión de cierre"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                  <FaCheck className="text-green-600 text-sm" />
                </div>
                <span className="text-white font-medium">{item}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link 
              href="/diagnostico/start" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition-colors shadow-lg text-center flex items-center justify-center"
            >
              Quiero mi Diagnóstico Express
            </Link>
            
            <Link 
              href="/consultores" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-colors shadow-lg text-center flex items-center justify-center"
            >
              Hablar con un consultor (15 min)
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-neutral-700 shadow-sm border border-neutral-200">
              <FaUserCheck className="text-green-600" />
              <span>Red de consultores verificados</span>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-neutral-700 shadow-sm border border-neutral-200">
              <FaFileAlt className="text-green-600" />
              <span>Entregables claros</span>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-neutral-700 shadow-sm border border-neutral-200">
              <FaBalanceScale className="text-green-600" />
              <span>Sponsor legal: Benoit & Asociados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
