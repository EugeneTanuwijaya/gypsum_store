import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { slides } from '../data/slides'
import { usePresentation } from './usePresentation'

class ObserverStub {
  constructor(callback) { this.callback = callback }
  observe() {}
  disconnect() {}
}

describe('usePresentation', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', ObserverStub)
    window.history.replaceState({}, '', '/#inventory')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    window.history.replaceState({}, '', '/')
  })

  it('starts from a valid hash and clamps next/previous navigation', () => {
    const { result } = renderHook(() => usePresentation(slides))
    expect(result.current.activeIndex).toBe(4)

    const first = document.createElement('section')
    const last = document.createElement('section')
    first.scrollIntoView = vi.fn()
    last.scrollIntoView = vi.fn()
    act(() => {
      result.current.registerSlide('cover', first)
      result.current.registerSlide('closing', last)
      result.current.goTo(-5)
      result.current.goTo(99)
    })
    expect(first.scrollIntoView).toHaveBeenCalled()
    expect(last.scrollIntoView).toHaveBeenCalled()
  })

  it('scrolls to the startup hash when its section registers', async () => {
    const { result } = renderHook(() => usePresentation(slides))
    const inventory = document.createElement('section')
    inventory.scrollIntoView = vi.fn()
    act(() => result.current.registerSlide('inventory', inventory))
    await waitFor(() => expect(inventory.scrollIntoView).toHaveBeenCalledOnce())
  })

  it('ignores keyboard navigation from interactive controls', () => {
    const { result } = renderHook(() => usePresentation(slides))
    const next = document.createElement('section')
    next.scrollIntoView = vi.fn()
    act(() => result.current.registerSlide('gypsum-products', next))
    fireKey('ArrowDown', document.createElement('button'))
    expect(next.scrollIntoView).not.toHaveBeenCalled()
    fireKey('ArrowDown', document.body)
    expect(next.scrollIntoView).toHaveBeenCalledOnce()
  })

  it('handles a rejected fullscreen request without breaking state', async () => {
    const requestFullscreen = vi.fn().mockRejectedValue(new Error('blocked'))
    document.body.requestFullscreen = requestFullscreen
    const { result } = renderHook(() => usePresentation(slides, document.body))
    await act(async () => result.current.toggleFullscreen())
    expect(requestFullscreen).toHaveBeenCalledOnce()
    expect(result.current.isFullscreen).toBe(false)
  })
})

function fireKey(key, target) {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}
