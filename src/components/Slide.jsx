export default function Slide({ id, number, eyebrow, title, active, registerSlide, className = '', children, titleAccent }) {
  const Heading = id === 'cover' ? 'h1' : 'h2'
  return (
    <section
      id={id}
      ref={(node) => registerSlide(id, node)}
      className={`slide slide--${id} ${className}`}
      data-active={active}
      aria-labelledby={`${id}-title`}
    >
      <div className="slide-atmosphere" aria-hidden="true" />
      <div className="slide-inner">
        <div className="slide-kicker reveal">
          <span className="slide-number">{number}</span>
          <span>{eyebrow}</span>
        </div>
        <Heading id={`${id}-title`} className="slide-title reveal">
          {title}{titleAccent && <><br /><em>{titleAccent}</em></>}
        </Heading>
        {children}
      </div>
    </section>
  )
}
