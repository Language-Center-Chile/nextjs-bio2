'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function NavbarLoginButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md font-semibold text-sm transition"
    >
      Cerrar sesión
    </button>
  ) : (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="bg-amber-100 text-neutral-800 px-4 py-1 rounded-md font-semibold text-sm hover:opacity-90 transition"
    >
      Ingresar
    </button>
  );
}
