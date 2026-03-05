"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaIdBadge, FaUserTie, FaQuestionCircle } from "react-icons/fa";

const landingNavItems = [
  { label: "¿Para quién?", href: "#para-quien", icon: <FaUserTie /> },
  { label: "¿Qué incluye?", href: "#que-incluye", icon: <FaBook /> },
  { label: "Planes", href: "#planes", icon: <FaIdBadge /> },
  { label: "FAQ", href: "#faq", icon: <FaQuestionCircle /> },
];

export default function LandingNavbarLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6 text-md font-medium">
      {landingNavItems.map((item) => {
        // Para enlaces con hash (#), siempre estarán activos en la página landing
        const isActive = pathname === '/landing' || pathname === '/';

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