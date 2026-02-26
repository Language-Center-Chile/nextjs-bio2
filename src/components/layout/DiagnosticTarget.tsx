import { FaUserCheck, FaCheck } from 'react-icons/fa';
import Link from 'next/link';

export default function DiagnosticTarget() {
  return (
    <section id="para-quien" className="py-20 bg-[#0F1115] text-white">
      <div className="container mx-auto px-6">
        
        {/* Top Section - Target Audience */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center border border-green-800/50">
              <FaUserCheck className="text-green-500 text-2xl" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            ¿Para quién es este diagnóstico?
          </h2>
          
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Para empresas que necesitan claridad y orden rápido en su cumplimiento ambiental.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Pymes y proveedores", "Empresas que licitan", "Riesgo reputacional", "Sin área ambiental interna"].map((tag, index) => (
              <span key={index} className="px-5 py-2.5 bg-green-900/20 text-green-400 font-medium rounded-full text-sm border border-green-800/50 hover:bg-green-900/30 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-neutral-500 text-sm italic">
            Si tuviste una fiscalización o requerimiento, te ayudamos a priorizar correcciones y evidencias.
          </p>
        </div>

        {/* Bottom Section - Two Cards Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Left Card - What you achieve */}
          <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-3">
              Lo que vas a lograr en menos de una semana
            </h3>
            <p className="text-neutral-400 mb-10 text-lg">
              Resultados prácticos para decidir y ejecutar, sin burocracia.
            </p>
            
            <ul className="space-y-6">
              {[
                { title: "Visibilidad total", desc: "qué tienes, qué falta y qué es crítico." },
                { title: "Prioridades claras", desc: "foco en lo que reduce riesgo primero." },
                { title: "Evidencias ordenadas", desc: "estructura mínima para auditorías y proveedores." },
                { title: "Plan ejecutable", desc: "tareas concretas, responsables y plazos (30 días)." }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 rounded-full p-1.5 flex-shrink-0">
                    <FaCheck className="text-green-500 text-xs" />
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    <span className="font-bold text-white block mb-1">{item.title}:</span>
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card - Process */}
          <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col h-full">
            <h3 className="text-2xl font-bold text-white mb-3">
              Proceso simple, sin fricción
            </h3>
            <p className="text-neutral-400 mb-10 text-lg">
              4 pasos. Avanzas con lo disponible y definimos el mínimo crítico.
            </p>
            
            <ol className="space-y-8 mb-10 flex-grow">
              {[
                "Completa el formulario (5 minutos)",
                "Pagas y agendas (link automático)",
                "Revisión + reunión de levantamiento",
                "Recibes tus entregables y el plan 30 días"
              ].map((step, index) => (
                <li key={index} className="flex gap-4 items-baseline">
                  <span className="font-bold text-neutral-600 font-mono">{index + 1}.</span>
                  <span className="text-white font-medium text-lg">{step}</span>
                </li>
              ))}
            </ol>
            
            <div className="mt-auto pt-8 border-t border-neutral-800">
              <p className="text-sm text-neutral-500 mb-6 flex items-center gap-2">
                <span className="font-bold text-neutral-400">Agenda 15 min:</span> si necesitas aclarar el plan antes de pagar.
              </p>
              <Link 
                href="/consultores" 
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 rounded-xl transition-colors text-center shadow-lg hover:shadow-orange-500/20 text-lg"
              >
                Abrir agenda (reemplazar link)
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
