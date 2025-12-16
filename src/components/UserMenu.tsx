 'use client';
 
 import { useEffect, useRef, useState } from 'react';
 import { HiChevronDown } from 'react-icons/hi';
 import { useRouter } from 'next/navigation';
 import UserAvatar from './ui/UserAvatar';
 import Link from 'next/link';
 import { supabaseClient } from '@/lib/supabaseClient';
 import type { User } from '@supabase/supabase-js';
 
 export default function UserMenu() {
   const [user, setUser] = useState<User | null>(null);
   const [open, setOpen] = useState(false);
   const ref = useRef<HTMLDivElement>(null);
   const router = useRouter();
 
   useEffect(() => {
     function onClick(e: MouseEvent) {
       if (!ref.current) return;
       if (!ref.current.contains(e.target as Node)) setOpen(false);
     }
     window.addEventListener('click', onClick);
     return () => window.removeEventListener('click', onClick);
   }, []);
 
   useEffect(() => {
     const supabase = supabaseClient;
     let mounted = true;
     const init = async () => {
       if (!supabase) return;
       const { data } = await supabase.auth.getUser();
       if (mounted) setUser(data.user ?? null);
       supabase.auth.onAuthStateChange((_event, session) => {
         setUser(session?.user ?? null);
       });
     };
     init();
     return () => { mounted = false; };
   }, []);
 
   if (!user) {
     return (
       <button
         onClick={() => router.push('/login')}
         className="bg-amber-100 text-neutral-800 px-4 py-1 rounded-md font-semibold text-sm hover:opacity-90 transition"
       >
         Ingresar
       </button>
     );
   }
 
   const name = (user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario') as string;
   const image = (user.user_metadata?.avatar_url || null) as string | null;
 
   const handleSignOut = async () => {
     const supabase = supabaseClient;
     if (!supabase) return;
     await supabase.auth.signOut();
     router.push('/');
     router.refresh();
   };
 
   return (
     <div ref={ref} className="relative">
       <button
         onClick={() => setOpen(v => !v)}
         className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-white/5 transition"
         aria-haspopup="menu"
         aria-expanded={open}
       >
         <UserAvatar src={image} name={name} size={36} />
         <span className="hidden sm:block text-sm">{name}</span>
         <HiChevronDown className="size-4 opacity-70" />
       </button>
 
       {open && (
         <div
           role="menu"
           className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur p-2 shadow-2xl z-[60]"
         >
           <div className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-white/5">
             <UserAvatar src={image} name={name} size={44} />
             <div className="min-w-0">
               <div className="font-semibold truncate">{name}</div>
               <div className="text-xs text-white/60 truncate">Colaborador</div>
             </div>
           </div>
 
           <div className="my-2 h-px bg-white/10" />
 
           <MenuItem href="/perfil" label="Perfil" />
           <MenuItem href="/perfil#avatar" label="Cambiar foto" />
           <MenuItem href="/mis-publicaciones" label="Mis publicaciones" />
           <MenuItem href="/membresia" label="Mi membresía" />
 
           <div className="my-2 h-px bg-white/10" />
 
           <button
             onClick={handleSignOut}
             className="mt-3 w-full rounded-lg px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold border border-white/10 transition"
           >
             Cerrar sesión
           </button>
 
           <div className="mt-2 px-3 pb-1 text-[10px] leading-4 text-white/50">
             Privacidad · Condiciones · Publicidad · Más
           </div>
         </div>
       )}
     </div>
   );
 }

function MenuItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
      onClick={(e) => {
        if (href === '#') e.preventDefault(); // solo visual por ahora
      }}
    >
      {label}
    </Link>
  );
}
