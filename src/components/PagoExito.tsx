import React from 'react'
import { FaCheck } from "react-icons/fa";
import Link from 'next/link';

const PagoExito = () => {
  return (
    <><div className="bg-background-dark text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-[520px] w-full flex flex-col items-center">
        {/* Success Icon Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center success-glow mb-6">
            <span className="material-symbols-outlined text-black !text-6xl font-bold">
              <FaCheck />
            </span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
            ¡Pago Exitoso!
          </h1>
          <p className="text-white/70 text-base md:text-lg text-center max-w-sm leading-relaxed">
            Gracias por sumarte a <span className="text-white font-medium">Biodiversidad.cl</span>. Tu membresía ha sido activada correctamente.
          </p>
        </div>

        {/* Plan Details Card */}
        <div className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl p-6 mb-10 overflow-hidden relative group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 border border-white/5"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOMKU4yX9E0TWE2fSJvLbYdw0uEG28Q-lMyTUlLVJuZVauFGnLd6a2WLCJSG_lsP1aQ-Cye7XuFKYRePdlOMwX4bUGknLBURm31B-nfhWeqry9w_NScaFqPNWSelLs2Mkj6uORR9pFn1ZM_ZJ_eyAORgt5mT_N7Z0liJFkl0dGJyGVf-9USQBl5HJgw4zAgpxkF6G1DAoShDDPD6UWf_S4nuecOAQkN94E8kLTbaQn4iboNBd4IfY7kktUe1QSLKJcJxL5PcyrXvg')"
                }}
              />
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1 text-green-600">Tu suscripción</p>
                <h3 className="text-white text-xl font-bold">Plan Brote</h3>
                <p className="text-white/50 text-sm">Acceso ilimitado a contenidos</p>
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-white font-bold text-lg leading-none mb-1">Activo</p>
              <p className="text-white/40 text-xs uppercase">Desde hoy</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span className="material-symbols-outlined text-green-500 !text-lg">verified</span>
              <span>Recibo enviado a tu correo</span>
            </div>
            <button className="text-white/40 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined !text-base">receipt_long</span>
              Ver Recibo
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <Link href="/perfil" className="w-full text-white h-14 rounded-xl font-bold text-base transition-all transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
            <span className="material-symbols-outlined !text-xl">dashboard</span>
            Ir a mi Panel
          </Link>
          <Link href="/marketplace" className="w-full bg-white/5 hover:bg-white/10 text-white h-14 rounded-xl font-bold text-base transition-all border border-white/10 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined !text-xl">explore</span>
            Explorar Contenido
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-12 text-white/30 text-sm text-center">
          ¿Tienes problemas con tu pago?
          <a className="text-white/50 hover:text-primary underline transition-colors" href="mailto:soporte@biodiversidad.cl">Contactar Soporte</a>
        </p>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-green-600/10 rounded-full blur-[120px]"></div>
      </div>

      <style>{`
        body {
          font-family: 'Public Sans', sans-serif;
          background-color: #121212;
        }
        .success-glow {
          box-shadow: 0 0 30px rgba(0, 168, 89, 0.2);
        }
      `}</style>
    </div>
    </>
  )
}

export default PagoExito