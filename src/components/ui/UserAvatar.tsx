'use client';

import Image from 'next/image';

type Props = {
  src?: string | null;
  name?: string | null;
  size?: number; // px
  className?: string;
};

export default function UserAvatar({ src, name = 'Usuario', size = 36, className = '' }: Props) {
  const initials = name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase())
    .join('') || 'U';

  // Si hay imagen de Google (session.user.image) la usamos; si no, fallback con iniciales
  return src ? (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={`rounded-full object-cover ring-1 ring-white/10 ${className}`}
    />
  ) : (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-neutral-700 text-white grid place-items-center text-xs font-semibold ring-1 ring-white/10 ${className}`}
      aria-label={name}
    >
      {initials}
    </div>
  );
}