import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('App integration', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', ObserverStub)
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })
    Element.prototype.scrollIntoView = vi.fn()
    window.history.replaceState({}, '', '/')
  })

  it('renders a complete presentation with accessible navigation and hero', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('main', { name: 'Presentasi POS Toko Gypsum' })).toBeInTheDocument()
    expect(container.querySelectorAll('main > section')).toHaveLength(15)
    expect(screen.getByRole('navigation', { name: 'Navigasi slide' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /interior toko material/i })).toHaveAttribute('src', '/images/gypsum-store-hero.webp')
  })

  it('ships the required desktop, mobile and motion CSS contracts', () => {
    const css = readFileSync('src/styles/presentation.css', 'utf8')
    expect(css).toContain('min-height: 100dvh')
    expect(css).toContain('scroll-snap-type: y mandatory')
    expect(css).toContain('scroll-snap-type: y proximity')
    expect(css).toContain('overflow-x: hidden')
    expect(css).toContain('prefers-reduced-motion: reduce')
    expect(css).toMatch(/\.inventory-table\s*\{[^}]*display:\s*none/s)
    expect(css).toMatch(/\.inventory-cards\s*\{[^}]*display:\s*grid/s)
  })

  it('declares an inline favicon so browsers do not request a missing asset', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toContain('rel="icon"')
    expect(html).toContain('data:image/svg+xml')
  })
})
