"use client";

import Link from "next/link";
import { FaLeaf } from "react-icons/fa";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Consultores", href: "/consultores" },
  { label: "Educación", href: "/educacion" },
  { label: "Campañas", href: "/campanas" },
  { label: "Membresías", href: "/membresias" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  return (
    <nav className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center text-green-500 text-xl font-bold">
        <FaLeaf className="mr-2" />
        <span>Biodiversidad.cl</span>
      </div>

      {/* Links */}
      <ul className="flex items-center gap-6 text-md font-medium">
        {navItems.map((item) => (
          <li key={item.href} >
            <Link
              href={item.href}
              className="hover:text-green-600 transition-colors duration-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/login"
            className="bg-amber-100 text-neutral-800 px-4 py-1 rounded-md font-semibold text-md hover:opacity-90 transition"
          >
            Ingresar
          </Link>
        </li>
      </ul>
    </nav>
  );
}
