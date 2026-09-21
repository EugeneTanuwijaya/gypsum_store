import { useCallback, useEffect, useRef, useState } from 'react'
import { clampIndex, getHashIndex, getNavigationDelta, isInteractiveTarget } from './presentation-utils'

export function usePresentation(items, fullscreenTarget = null) {
  const startupIndex = useRef(getHashIndex(window.location.hash, items))
  const initialScrollComplete = useRef(false)
  const [activeIndex, setActiveIndex] = useState(startupIndex.current)
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement))
  const nodes = useRef(new Map())
  const observer = useRef(null)

  const registerSlide = useCallback((id, node) => {
    const oldNode = nodes.current.get(id)
    if (oldNode && observer.current) observer.current.unobserve?.(oldNode)
    if (!node) {
      nodes.current.delete(id)
      return
    }
    node.dataset.slideIndex = String(items.findIndex((item) => item.id === id))
    nodes.current.set(id, node)
    observer.current?.observe(node)
    if (!initialScrollComplete.current && items[startupIndex.current]?.id === id) {
      initialScrollComplete.current = true
      queueMicrotask(() => node.scrollIntoView({
        behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      }))
    }
  }, [items])

  const goTo = useCallback((index) => {
    const next = clampIndex(index, items.length)
    const node = nodes.current.get(items[next].id)
    node?.scrollIntoView({
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [items])

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    observer.current = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveIndex(Number(visible.target.dataset.slideIndex))
    }, { threshold: [0.2, 0.4, 0.6, 0.8] })
    nodes.current.forEach((node) => observer.current.observe(node))
    return () => observer.current?.disconnect()
  }, [])

  useEffect(() => {
    const id = items[activeIndex]?.id
    if (id && window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }, [activeIndex, items])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (isInteractiveTarget(event.target)) return
      const delta = getNavigationDelta(event)
      if (!delta) return
      event.preventDefault()
      goTo(activeIndex + delta)
    }
    const onHashChange = () => goTo(getHashIndex(window.location.hash, items))
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [activeIndex, goTo, items])

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen?.()
      } else {
        const target = fullscreenTarget || document.getElementById('presentation-shell')
        await target?.requestFullscreen?.()
      }
    } catch {
      setIsFullscreen(false)
    }
  }, [fullscreenTarget])

  return {
    activeIndex,
    progress: ((activeIndex + 1) / items.length) * 100,
    goTo,
    goNext,
    goPrevious,
    isFullscreen,
    toggleFullscreen,
    registerSlide,
  }
}
