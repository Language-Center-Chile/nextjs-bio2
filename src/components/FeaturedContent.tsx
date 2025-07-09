import Card from './ui/Card'

const FeaturedContent = () => {
  return (
    <section className="mb-12">
      <div className="container mx-auto px-4">
        <span className="inline-block bg-white text-black px-4 py-1 rounded-full text-sm font-medium mb-6">
          Contenido destacado
        </span>
        <Card
          imageSrc="/assets/featured/chakana.jpg"
          title="Chakana o Cruz Andina, el símbolo que recuerda volver a los equilibrios en tiempos de polarización"
          description="En las sociedades andinas, la Chakana, o Cruz Andina, es un símbolo muy importante, representante de la unión entre lo bajo y lo alto, la tierra y el sol, y la conexión del ser humano con lo superior junto a su equilibrio ancestral. Durante el paso de los años, ha pasado por muchos cambios y desafíos, causando un cambio exponencial en su significado."
          href="#"
        >
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
            <div className="md:w-1/2">
              <img 
                src="/assets/featured/chakana.jpg" 
                alt="Chakana o Cruz Andina"
                className="w-full h-full object-cover"
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
              <a 
                href="#"
                className="inline-block px-4 py-2 text-green-600 hover:underline"
              >
                Leer artículo
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default FeaturedContent