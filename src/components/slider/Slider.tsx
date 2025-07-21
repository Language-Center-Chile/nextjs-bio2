'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    
    <header className="relative w-full h-[90vh] overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
      <div className="relative h-full w-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full max-w-4xl px-4">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-poppins" style={{color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
          <span className="text-green-600">Conectamos personas</span> con la biodiversidad
        </h1>
        <p className="text-xl font-bold mb-8" style={{ color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
          Una plataforma sustentable, abierta y humana para el ecosistema verde.
        </p>
          <div className="flex justify-center gap-4">
            <Button href="/marketplace" variant="primary">Explorar</Button>
            <Button href="/login" variant="secondary">Ingresar</Button>
          </div>
        </div>
        <div className="relative h-full w-full"style={{ opacity: "0.4" }}>
          {[1, 2, 3].map((num, index) => (
            <div
              key={num}
              className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={`/assets/slider/biodiversidad${num}.jpg`}
                alt={`Biodiversidad ${num}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {[0, 1, 2].map((num) => (
              <button
                key={num}
                className={`w-3 h-3 rounded-full transition-colors ${currentSlide === num ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                onClick={() => handleDotClick(num)}
                aria-label={`Ir a diapositiva ${num + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Slider