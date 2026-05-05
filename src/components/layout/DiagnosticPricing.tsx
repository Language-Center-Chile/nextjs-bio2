"use client";

import { useState } from 'react';
import { FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function DiagnosticPricing() {
  return (
    <section className="py-20 bg-[#0F1115] text-white">
      <div  id="planes" className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Planes y precios</h2>
            <p className="text-neutral-400 text-lg">
              Elige el plan que mejor se adapte a las necesidades de monitoreo de biodiversidad de tu proyecto.
            </p>
          </div>
          <button className="border border-neutral-700 hover:border-neutral-500 text-white px-6 py-3 rounded-lg transition-colors text-sm font-medium">
            Ver comparativa completa
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
          
          {/* Starter Card */}
          <div className="bg-[#0E1A27] rounded-2xl p-8 border border-neutral-800 flex flex-col">
            <h3 className="text-xl font-bold mb-4">Starter</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-sm font-bold text-neutral-500">UF</span>
              <span className="text-4xl font-bold">4.5</span>
              <span className="text-sm text-neutral-500">/mes</span>
            </div>
            
            <button className="w-full mt-8 mb-8 py-3 rounded-lg bg-[#162231] border border-[#2A3B55] hover:bg-[#1c2b3e] transition-colors font-medium">
              Comenzar Starter
            </button>
            
            <ul className="space-y-4 flex-grow">
              {[
                "Monitoreo básico",
                "2 horas sesión en línea",
                "Reportes mensuales",
                "Soporte por email"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#FF6A1A]"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Card */}
          <div className="bg-[#0E1A27] rounded-2xl p-8 border border-[#FF6A1A] relative flex flex-col shadow-[0_0_30px_rgba(255,106,26,0.1)] transform md:-translate-y-4 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6A1A] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider">
              RECOMENDADO
            </div>
            
            <h3 className="text-xl font-bold mb-4">Pro</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-sm font-bold text-neutral-500">UF</span>
              <span className="text-4xl font-bold">12.5</span>
              <span className="text-sm text-neutral-500">/mes</span>
            </div>
            
            <button className="w-full mt-8 mb-8 py-3 rounded-lg bg-[#FF6A1A] hover:bg-[#e55a10] transition-colors font-bold text-white shadow-lg shadow-[#FF6A1A]/20">
              Obtener Pro
            </button>
            
            <ul className="space-y-4 flex-grow">
              {[
                "Monitoreo avanzado",
                "6 horas sesión en línea",
                "Reportes en tiempo real",
                "Análisis de datos IA",
                "Soporte prioritario"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#FF6A1A] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Business Card */}
          <div className="bg-[#0E1A27] rounded-2xl p-8 border border-neutral-800 flex flex-col">
            <h3 className="text-xl font-bold mb-4">Business</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-sm font-bold text-neutral-500">UF</span>
              <span className="text-4xl font-bold">19.9</span>
              <span className="text-sm text-neutral-500">/mes</span>
            </div>
            
            <button className="w-full mt-8 mb-8 py-3 rounded-lg bg-[#162231] border border-[#2A3B55] hover:bg-[#1c2b3e] transition-colors font-medium">
              Contactar Business
            </button>
            
            <ul className="space-y-4 flex-grow">
              {[
                "Monitoreo renovable",
                "Paquete full",
                "API personalizada",
                "Consultoría experta",
                "Soporte 24/7"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#FF6A1A]"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <FaqItem 
              question="¿Cómo se realizan los cobros?" 
              answer="Los cobros se realizan mensualmente mediante tarjeta de crédito o transferencia bancaria automatizada. Recibirás tu factura detallada los primeros días de cada mes." 
            />
            <FaqItem 
              question="¿Puedo cambiar de plan en cualquier momento?" 
              answer="Sí, puedes subir o bajar de nivel de plan en cualquier momento desde tu panel de configuración. Los cambios se aplicarán al inicio del próximo ciclo de facturación."
              defaultOpen={true}
            />
            <FaqItem 
              question="¿Ofrecen descuentos para ONGs?" 
              answer="Sí, ofrecemos un 20% de descuento permanente para ONGs certificadas y fundaciones sin fines de lucro dedicadas a la conservación." 
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function FaqItem({ question, answer, defaultOpen = false }: { question: string, answer: string, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#0E1A27] border border-neutral-800 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-[#132030] transition-colors"
      >
        <span className="font-medium text-white">{question}</span>
        {isOpen ? <FaChevronUp className="text-neutral-400 text-sm" /> : <FaChevronDown className="text-neutral-400 text-sm" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 text-neutral-400 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
