'use client'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-neutral-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-semibold">Ocurrió un error</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Intenta recargar. Si persiste, vuelve más tarde.
          </p>
          <p className="mt-4 max-w-full break-words rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-xs text-neutral-300">
            {error.message}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold tracking-wider text-black"
          >
            REINTENTAR
          </button>
        </div>
      </body>
    </html>
  )
}

