import Link from 'next/link'
import { NavLinks } from '../ui/NavLinks'
import { NavLogo } from '../ui/NavLogo'
import { AuthButtons } from '../ui/AuthButtons'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLogo />
      <ul className="nav-links">
        <NavLinks />
        <AuthButtons />
      </ul>
    </nav>
  )
}