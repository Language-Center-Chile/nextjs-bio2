import Link from 'next/link'

export const NavLinks = () => {
  const links = [
    { href: '/', text: 'Inicio' },
    { href: '/marketplace', text: 'Marketplace' },
    { href: '/consultores', text: 'Consultores' },
    { href: '/educacion', text: 'Educación' },
    { href: '/campanas', text: 'Campañas' },
    { href: '/membresias', text: 'Membresías' },
  ]

  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.text}</Link>
        </li>
      ))}
    </>
  )
}