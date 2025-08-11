'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import UserAvatar from '@/components/ui/UserAvatar';
import { useEffect } from "react";

type Props = { onClose: () => void };

export default function MobileMenu({ onClose }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const go = (href: string) => {
    router.push(href);
    onClose();
  };
  useEffect(() => {
  const onResize = () => {
    // Solo cerrar si se cruza el breakpoint de md (768px)
    if (window.innerWidth >= 1024) {
      onClose();
    }
  };
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] bg-black/60" onClick={onClose}>
      <aside
        className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-neutral-900 p-4 space-y-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header usuario */}
        {session ? (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <UserAvatar src={session.user?.image} name={session.user?.name ?? 'Usuario'} size={44} />
            <div className="min-w-0">
              <div className="font-semibold truncate">
                {session.user?.name ?? 'Usuario'}
              </div>
              <div className="text-xs text-white/60">Colaborador</div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn('google', { callbackUrl: pathname || '/' })}
            className="w-full bg-amber-100 text-neutral-900 font-semibold px-4 py-2 rounded-md"
          >
            Ingresar
          </button>
        )}

        {/* Navegación */}
        <nav className="flex flex-col gap-1">
          <MobileLink label="Inicio" href="/" go={go} active={pathname === '/'} />
          <MobileLink label="Marketplace" href="/marketplace" go={go} active={pathname?.startsWith('/marketplace')} />
          <MobileLink label="Consultores" href="/consultores" go={go} active={pathname?.startsWith('/consultores')} />
          <MobileLink label="Educación" href="/educacion" go={go} active={pathname?.startsWith('/educacion')} />
          <MobileLink label="Campañas" href="/campanas" go={go} active={pathname?.startsWith('/campanas')} />
          <MobileLink label="Membresías" href="/membresias" go={go} active={pathname?.startsWith('/membresias')} />
          <MobileLink label="Contacto" href="/contacto" go={go} active={pathname?.startsWith('/contacto')} />
        </nav>

        {/* Sección de cuenta (solo si hay sesión) */}
        {session && (
          <>
            <div className="my-2 h-px bg-white/10" />
            <div className="text-xs uppercase tracking-wide text-white/50 px-1">Cuenta</div>
            <MenuBtn label="Editar nombre" onClick={() => go('/perfil/editar-nombre')} />
            <MenuBtn label="Cambiar foto" onClick={() => go('/perfil/cambiar-foto')} />
            <MenuBtn label="Mis publicaciones" onClick={() => go('/mis-publicaciones')} />
            <MenuBtn label="Mi membresía" onClick={() => go('/membresia')} />

            <div className="my-2 h-px bg-white/10" />
            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="mt-3 w-full rounded-lg px-4 py-2
                 bg-neutral-800 hover:bg-neutral-700
                 text-white font-semibold
                border border-white/10 transition cursor-pointer"
                    >
                    Cerrar sesión
            </button>

            <div className="mt-2 px-2 text-[10px] leading-4 text-white/50">
              Privacidad · Condiciones · Publicidad · Más
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function MobileLink({
  href,
  label,
  go,
  active,
}: {
  href: string;
  label: string;
  go: (h: string) => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={() => go(href)}
      className={`text-left px-3 py-2 rounded ${
        active ? 'bg-white/10 text-emerald-400' : 'hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}

function MenuBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm"
    >
      {label}
    </button>
  );
}
