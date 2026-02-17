import React from 'react'
import { MdError } from "react-icons/md";

const PagoFallido = () => {
    return (
        <><div className="bg-background-dark text-white min-h-screen flex items-center justify-center p-6">
            <div className="max-w-[480px] w-full text-center">
                {/* Error Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 blur-2xl rounded-full bg-red-500/20"></div>
                        <div className="relative flex items-center justify-center w-24 h-24 bg-deep-black border-2 rounded-full border-red-500  ">
                            <span className="material-symbols-outlined text-5xl font-light text-red-500"> <MdError /> </span>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight mb-4">
                    Hubo un problema con tu pago
                </h1>
                <p className="text-white/60 text-base md:text-lg font-normal leading-relaxed mb-8">
                    No pudimos procesar la transacción. Por favor, verifica los datos de tu tarjeta, el saldo disponible o intenta con otro medio de pago.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 w-full">
                    <button className="flex items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-8 bg-green-600 hover:bg-brand-green/90 text-white text-lg font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-brand-green/20">
                        <span className="material-symbols-outlined"></span>
                        <span className="truncate">Reintentar Pago</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-8 border border-white/20 bg-transparent hover:bg-white/5 text-white text-lg font-bold transition-all">
                        <span className="material-symbols-outlined"></span>
                        <span className="truncate">Contactar Soporte</span>
                    </button>
                </div>

                {/* Transaction Details Card */}
                <div className="mt-10 p-6 rounded-xl bg-white/5 border border-white/10 text-left">
                    <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Detalles del Intento</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <p className="text-white/50 text-sm">ID de Transacción</p>
                            <p className="text-white text-sm font-mono font-medium">#BD-99821-2024</p>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <p className="text-white/50 text-sm">Fecha y Hora</p>
                            <p className="text-white text-sm font-medium">24 de Mayo, 2024 - 14:32</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-white/50 text-sm">Monto Intentado</p>
                            <p className="text-white text-sm font-bold">$12.500 CLP</p>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8">
                    <a className="text-white/40 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors" href="#">
                        Volver al inicio
                    </a>
                </div>
            </div>

            <style>{`
        body { font-family: 'Public Sans', sans-serif; background-color: #121212; }
      `}</style>
        </div>
        </>
    )
}

export default PagoFallido