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

export default function NavbarLinks() {
  return (
    <ul className="flex items-center gap-6 text-md font-medium">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="hover:text-green-500 transition-colors text-md"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
