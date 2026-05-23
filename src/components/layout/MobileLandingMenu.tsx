'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

const landingNavItems = [
  { label: "Inicio", href: "https://biodiversidad.cl" },
  { label: "¿Para quién?", href: "/landing#para-quien" },
  { label: "¿Qué incluye?", href: "/landing#que-incluye" },
  { label: "Planes", href: "/landing#planes" },
  { label: "FAQ", href: "/landing#faq" },
];

export default function MobileLandingMenu({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <div className="absolute top-full left-0 w-full bg-neutral-900 text-white flex flex-col items-start p-6 gap-4 z-50 border-t border-neutral-800 shadow-lg">
      {landingNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="text-md hover:text-green-500 transition w-full py-2 px-3 rounded hover:bg-white/5"
        >
          {item.label}
        </Link>
      ))}
      
      {/* Login button for mobile */}
      <button
        onClick={() => {
          router.push('/login');
          onClose();
        }}
        className="mt-4 bg-amber-100 text-neutral-800 px-4 py-2 rounded-md font-semibold text-sm hover:opacity-90 transition w-full"
      >
        Ingresar
      </button>
    </div>
  );
}