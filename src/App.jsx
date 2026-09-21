import { slides } from './data/slides'

export default function App() {
  return (
    <main id="presentation" aria-label="Presentasi POS Toko Gypsum">
      {slides.map((slide) => (
        <section id={slide.id} key={slide.id} className="slide">
          <span>{slide.number}</span>
          <h2>{slide.label}</h2>
        </section>
      ))}
    </main>
  )
}
