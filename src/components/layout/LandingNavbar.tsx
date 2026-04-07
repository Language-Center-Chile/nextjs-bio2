"use client";

import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import LandingNavbarLinks from "./LandingNavbarLinks";
import MobileLandingMenu from "./MobileLandingMenu";
import { HiMenu, HiX } from "react-icons/hi";

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 text-white px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50 relative">
      <NavbarLogo />

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <LandingNavbarLinks />
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          aria-label="Toggle menu"
          className="p-2 hover:bg-white/10 rounded transition-colors"
        >
          {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 w-full">
          <MobileLandingMenu onClose={() => setMobileOpen(false)} />
        </div>
      )}
    </nav>
  );
}