import Link from "next/link";

export default function NavbarLoginButton() {
  return (
    <Link
      href="/login"
      className="bg-amber-100 text-neutral-800 px-4 py-1 rounded-md font-semibold text-sm hover:opacity-90 transition"
    >
      Ingresar
    </Link>
  );
}
