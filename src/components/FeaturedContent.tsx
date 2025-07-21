
import ContentCard from './ui/ContentCard'


const FeaturedContent = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto w-full ">
          <ContentCard
            image="/assets/featured/llamas.jpg"
            alt="Chakana o Cruz Andina"
            title="Chakana o Cruz Andina, el símbolo que recuerda volver a los equilibrios en tiempos de polarización"
            description="En las sociedades andinas, la Chakana, o Cruz Andina, es un símbolo muy importante, representante de la unión entre lo bajo y lo alto, la tierra y el sol, y la conexión del ser humano con lo superior junto a su equilibrio ancestral. Durante el paso de los años, ha pasado por muchos cambios y desafíos, causando un cambio exponencial en su significado."
            link="#"
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedContent