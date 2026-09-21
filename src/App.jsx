import { slides } from './data/slides'
import DeckNavigation from './components/DeckNavigation'
import { usePresentation } from './hooks/usePresentation'

export default function App() {
  const presentation = usePresentation(slides)
  return (
    <div id="presentation-shell">
      <main id="presentation" aria-label="Presentasi POS Toko Gypsum">
        {slides.map((slide, index) => (
          <section
            id={slide.id}
            key={slide.id}
            ref={(node) => presentation.registerSlide(slide.id, node)}
            className="slide"
            data-active={presentation.activeIndex === index}
          >
            <span>{slide.number}</span>
            <h2>{slide.label}</h2>
          </section>
        ))}
      </main>
      <DeckNavigation
        activeIndex={presentation.activeIndex}
        total={slides.length}
        progress={presentation.progress}
        onPrevious={presentation.goPrevious}
        onNext={presentation.goNext}
        onPresent={presentation.toggleFullscreen}
        isFullscreen={presentation.isFullscreen}
        onSelect={presentation.goTo}
      />
    </div>
  )
}
