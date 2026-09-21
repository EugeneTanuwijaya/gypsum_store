import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const presentationStyles = readFileSync('src/styles/presentation.css', 'utf8')

describe('slide presentation motion', () => {
  it('does not replay entrance animations when a slide becomes active', () => {
    expect(presentationStyles).not.toContain('animation: deck-enter')
    expect(presentationStyles).not.toContain('@keyframes deck-enter')
  })
})
