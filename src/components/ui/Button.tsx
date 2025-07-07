import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  children: ReactNode
  className?: string
}

const Button = ({ href, variant, children, className = '' }: ButtonProps) => {
  const baseStyles = 'px-8 py-3 rounded-full font-bold transition-colors'
  const variants = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'border-2 border-white text-white hover:bg-white hover:text-green-500'
  }

  return (
    <Link 
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}

export default Button