"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome,FaUserTie,FaIdBadge,FaBook,FaShoppingCart,FaHandsHelping } from "react-icons/fa";

const navItems = [
  { label: "Inicio", href: "/", icon: <FaHome /> },
  // { label: "Marketplace", href: "/marketplace", icon: <FaShoppingCart /> },
  { label: "Consultores", href: "/consultores", icon: <FaUserTie /> },
  // { label: "Educación", href: "/educacion", icon: <FaBook /> },
  // { label: "Campañas", href: "/campanas", icon: <FaHandsHelping /> },
  { label: "Membresías", href: "/membresias", icon: <FaIdBadge /> },
  { label: "Diagnóstico", href: "/landing", icon: <FaBook /> },
  // { label: "¿Para quién?", href: "/#para-quien", icon: <FaUserTie /> },
  // { label: "Qué incluye", href: "/#que-incluye", icon: <FaBook /> },
  // { label: "Planes", href: "/#planes", icon: <FaIdBadge /> },
  // { label: "FAQ", href: "/#faq", icon: <FaBook /> },
];

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6 text-md font-medium">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href} className="flex items-center gap-4">
            {item.icon}
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
