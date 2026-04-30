import Diagnostic from "@/components/layout/Diagnostic";
import DiagnosticTarget from "@/components/layout/DiagnosticTarget";
import DiagnosticIncludes from "@/components/layout/DiagnosticIncludes";
import DiagnosticPricing from "@/components/layout/DiagnosticPricing";
import DiagnosticForm from "@/components/layout/DiagnosticForm";

export default function LandingPage() {
  const testimonials = [
    {
      name: "María González",
      role: "Jefa de Medio Ambiente",
      company: "Empresa de Ingeniería",
      text: "El diagnóstico nos permitió ordenar prioridades y avanzar con evidencias claras para el proyecto."
    },
    {
      name: "Carlos Rojas",
      role: "Gerente de Operaciones",
      company: "Servicios Industriales",
      text: "El proceso fue rápido y entendible. Recibimos recomendaciones accionables para reducir riesgos."
    },
    {
      name: "Valentina Soto",
      role: "Coordinadora de Sustentabilidad",
      company: "Constructora",
      text: "Nos ayudó a definir el plan correcto y a preparar la documentación sin fricción."
    }
  ];

  return (
    <>
      <Diagnostic/>
      <DiagnosticTarget/>
      <DiagnosticIncludes/>
      <DiagnosticPricing/>
      <section className="py-20 bg-[#0F1115] text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Testimonios</h2>
            <p className="text-neutral-400 text-lg">
              Experiencias reales de equipos que ya iniciaron su diagnóstico.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={`${t.name}-${t.company}`} className="bg-[#0E1A27] rounded-2xl p-8 border border-neutral-800">
                <p className="text-neutral-200 leading-relaxed mb-6">{t.text}</p>
                <div className="text-sm">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-neutral-400">{t.role} · {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <DiagnosticForm/>
    </>
  );
}
