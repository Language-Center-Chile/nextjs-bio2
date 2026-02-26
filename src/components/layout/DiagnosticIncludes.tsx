import { FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

export default function DiagnosticIncludes() {
  return (
    <section id="que-incluye" className="py-20 bg-[#0F1115] text-white">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-green-900/30 flex items-center justify-center border border-green-800/50 rotate-3">
              <FaBoxOpen className="text-green-500 text-3xl" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            ¿Qué incluye el Diagnóstico Express?
          </h2>
          
          <p className="text-xl text-neutral-400">
            Entregables concretos, listos para ejecutar.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          
          {/* Left Card */}
          <div className="bg-neutral-900 rounded-2xl p-8 md:p-10 border border-neutral-800/50 hover:border-neutral-700 transition-colors shadow-2xl shadow-black/50">
            <ul className="space-y-6">
              {[
                "Revisión inicial (formulario + documentos base)",
                "Reunión de levantamiento (45-60 min)",
                "Checklist de cumplimiento aplicable (MVP)",
                "Matriz de riesgos y brechas (priorizada)"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-neutral-300 text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card */}
          <div className="bg-neutral-900 rounded-2xl p-8 md:p-10 border border-neutral-800/50 hover:border-neutral-700 transition-colors shadow-2xl shadow-black/50">
            <ul className="space-y-6">
              {[
                "Plan de acción 30 días (tareas + plazos + evidencias)",
                "Reunión de cierre (30-45 min)",
                "Recomendación de ruta: Starter / Pro / Business",
                "Resguardo de información (NDA si lo requieres)"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-neutral-300 text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-neutral-500 italic text-lg max-w-2xl mx-auto">
            No necesitas tener todo perfecto; trabajamos con lo disponible y definimos el mínimo crítico.
          </p>
        </div>

      </div>
    </section>
  );
}
