import { slides } from './data/slides'
import DeckNavigation from './components/DeckNavigation'
import Slides from './components/slides/Slides'
import { usePresentation } from './hooks/usePresentation'

export default function App() {
  const presentation = usePresentation(slides)
  return (
    <div id="presentation-shell">
      <main id="presentation" aria-label="Presentasi POS Toko Gypsum">
        <Slides activeId={slides[presentation.activeIndex].id} registerSlide={presentation.registerSlide} />
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
