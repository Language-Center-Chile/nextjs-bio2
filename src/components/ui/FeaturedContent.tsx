import Card from './Card'
import Button from './Button'
import Image from 'next/image'

const FeaturedContent = () => {
  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <span className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
          Contenido destacado
        </span>
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative min-h-[300px]">
              <Image 
                src="/assets/featured/chakana.jpg" 
                alt="Chakana o Cruz Andina"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Arte, Cultura y Patrimonio
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Chakana o Cruz Andina, el símbolo que recuerda volver a los equilibrios en tiempos de polarización
              </h2>
              <p className="text-gray-600 mb-6">
                En las sociedades andinas, la Chakana, o Cruz Andina, es un símbolo muy importante, representante de la unión entre lo bajo y lo alto, la tierra y el sol, y la conexión del ser humano con lo superior junto a su equilibrio ancestral. Durante el paso de los años, ha pasado por muchos cambios y desafíos, causando un cambio exponencial en su significado.
              </p>
              <Button 
                href="#"
                variant="primary"
                className="inline-block"
              >
                Leer artículo
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default FeaturedContent