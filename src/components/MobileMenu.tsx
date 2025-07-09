import Link from "next/link";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Consultores", href: "/consultores" },
  { label: "Educación", href: "/educacion" },
  { label: "Campañas", href: "/campanas" },
  { label: "Información", href: "/informacion" },
  { label: "Membresías", href: "/membresias" },
  { label: "Contacto", href: "/contacto" },
];

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 w-full bg-neutral-900 text-white flex flex-col items-start p-6 gap-4 z-40">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="text-md hover:text-green-500 transition"
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/login"
        onClick={onClose}
        className="bg-amber-100 text-neutral-800 px-4 py-2 rounded-md font-semibold text-sm hover:opacity-90 transition"
      >
        Ingresar
      </Link>
    </div>
  );
}
