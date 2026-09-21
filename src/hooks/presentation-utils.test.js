import { describe, expect, it } from 'vitest'
import { slides } from '../data/slides'
import { clampIndex, getHashIndex, getNavigationDelta, isInteractiveTarget } from './presentation-utils'

describe('presentation utilities', () => {
  it('resolves valid hashes and falls back safely for invalid or encoded values', () => {
    expect(getHashIndex('#inventory', slides)).toBe(4)
    expect(getHashIndex('#not-a-slide', slides)).toBe(0)
    expect(getHashIndex('#%E0%A4%A', slides)).toBe(0)
  })

  it.each([
    ['ArrowDown', 1], ['PageDown', 1], [' ', 1], ['Spacebar', 1],
    ['ArrowUp', -1], ['PageUp', -1], ['Enter', 0],
  ])('maps %s to navigation delta %i', (key, expected) => {
    expect(getNavigationDelta({ key })).toBe(expected)
  })

  it('recognises controls and editable content as interactive', () => {
    for (const tagName of ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA']) {
      expect(isInteractiveTarget({ tagName, isContentEditable: false })).toBe(true)
    }
    expect(isInteractiveTarget({ tagName: 'DIV', isContentEditable: true })).toBe(true)
    expect(isInteractiveTarget({ tagName: 'DIV', isContentEditable: false })).toBe(false)
  })

  it('clamps slide indexes at both ends', () => {
    expect(clampIndex(-1, 15)).toBe(0)
    expect(clampIndex(20, 15)).toBe(14)
    expect(clampIndex(3, 15)).toBe(3)
  })
})
