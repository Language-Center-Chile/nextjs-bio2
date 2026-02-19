"use client";

import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarLoginButton from "./NavbarLoginButton";
import MobileMenu from "./MobileMenu";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 text-white px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <NavbarLogo />

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <NavbarLinks />
        <NavbarLoginButton />
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </nav>
  );
}
