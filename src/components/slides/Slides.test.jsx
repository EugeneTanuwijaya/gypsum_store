import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { slides } from '../../data/slides'
import Slides from './Slides'

describe('Slides', () => {
  it('renders all 15 semantic sections in the required order', () => {
    const { container } = render(<Slides activeId="cover" registerSlide={() => {}} />)
    const sections = [...container.querySelectorAll('section')]
    expect(sections).toHaveLength(15)
    expect(sections.map((section) => section.id)).toEqual(slides.map((slide) => slide.id))
  })

  it('uses one cover heading and a level-two heading for each following slide', () => {
    render(<Slides activeId="cover" registerSlide={() => {}} />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(14)
  })

  it('contains the required inventory, pricing and closing copy', () => {
    render(<Slides activeId="cover" registerSlide={() => {}} />)
    expect(screen.getAllByText('Gypsum Knauf').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Gypsum Jayaboard').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Hollow 4 × 4').length).toBeGreaterThan(0)
    expect(screen.getByText('Rp6.000.000 – Rp8.000.000')).toBeInTheDocument()
    expect(screen.getByText('Simple First.')).toBeInTheDocument()
    expect(screen.getByText('Grow When Needed.')).toBeInTheDocument()
  })
})
