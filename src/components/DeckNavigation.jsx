function ArrowIcon({ direction = 'down' }) {
  return (
    <svg className={`nav-arrow nav-arrow--${direction}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M6.5 13.5 12 19l5.5-5.5" />
    </svg>
  )
}

export default function DeckNavigation({
  activeIndex, total, progress, onPrevious, onNext, onPresent, isFullscreen, onSelect,
}) {
  const counter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
  return (
    <>
      <div className="mobile-progress" aria-label="Progres presentasi" style={{ '--progress': `${progress}%` }}>
        <span />
      </div>

      <aside className="deck-nav" aria-label="Navigasi slide">
        <button className="nav-button" onClick={onPrevious} disabled={activeIndex === 0} aria-label="Slide sebelumnya">
          <ArrowIcon direction="up" />
        </button>
        <span className="slide-counter" aria-live="polite">{counter}</span>
        <div className="nav-dots">
          {Array.from({ length: total }, (_, index) => (
            <button
              key={index}
              className="nav-dot"
              aria-label={`Buka slide ${index + 1}`}
              aria-current={index === activeIndex ? 'step' : undefined}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
        <button className="nav-button" onClick={onNext} disabled={activeIndex === total - 1} aria-label="Slide berikutnya">
          <ArrowIcon />
        </button>
        <button className="present-button" onClick={onPresent} aria-label={isFullscreen ? 'Keluar dari presentasi' : 'Mulai presentasi'}>
          <span className="present-icon" aria-hidden="true">⌗</span>
          {isFullscreen ? 'Exit' : 'Present'}
        </button>
      </aside>

      <div className="mobile-nav" aria-label="Navigasi slide mobile">
        <button onClick={onPrevious} disabled={activeIndex === 0} aria-label="Slide sebelumnya"><ArrowIcon direction="up" /></button>
        <span>{counter}</span>
        <button onClick={onNext} disabled={activeIndex === total - 1} aria-label="Slide berikutnya"><ArrowIcon /></button>
      </div>
    </>
  )
}
