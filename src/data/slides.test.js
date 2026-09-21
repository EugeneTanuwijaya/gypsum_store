import { describe, expect, it } from 'vitest'
import { slides } from './slides'

describe('slides', () => {
  it('defines 15 unique, URL-safe slide ids', () => {
    expect(slides).toHaveLength(15)
    expect(new Set(slides.map((slide) => slide.id)).size).toBe(15)
    expect(slides.every((slide) => /^[a-z][a-z0-9-]*$/.test(slide.id))).toBe(true)
  })

  it('keeps the required presentation order', () => {
    expect(slides.map((slide) => slide.id)).toEqual([
      'cover', 'overview', 'dashboard', 'pos', 'inventory',
      'gypsum-products', 'damaged-stock', 'purchasing', 'receivables',
      'delivery', 'reports', 'deployment', 'features', 'pricing', 'closing',
    ])
  })
})
