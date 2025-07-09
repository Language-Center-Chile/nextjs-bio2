"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Consultores", href: "/consultores" },
  { label: "Educación", href: "/educacion" },
  { label: "Campañas", href: "/campanas" },
  { label: "Membresías", href: "/membresias" },
  { label: "Contacto", href: "/contacto" },
];

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6 text-md font-medium">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`transition-colors ${
                isActive ? "text-green-500 font-semibold" : "hover:text-green-400"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
