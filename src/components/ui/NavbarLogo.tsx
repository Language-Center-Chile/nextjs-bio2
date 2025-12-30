import Image from 'next/image'

export default function NavbarLogo() {
  return (
    <div className="flex items-center text-green-500 text-xl font-bold">
      <span className="flex items-center relative h-8 md:h-12 lg:h-16 w-32 md:w-48">
        <Image
          src="/assets/LogotipoBlanco.png"
          alt="Logo Biodiversidad.cl"
          fill
          className="object-contain"
          priority
        />
      </span>
    </div>  
  );
}