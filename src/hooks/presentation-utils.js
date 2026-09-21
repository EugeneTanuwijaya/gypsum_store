export function getHashIndex(hash, items) {
  try {
    const id = decodeURIComponent(String(hash || '').replace(/^#/, ''))
    const index = items.findIndex((item) => item.id === id)
    return index >= 0 ? index : 0
  } catch {
    return 0
  }
}

export function getNavigationDelta(event) {
  if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(event.key)) return 1
  if (['ArrowUp', 'PageUp'].includes(event.key)) return -1
  return 0
}

export function isInteractiveTarget(target) {
  if (!target) return false
  return ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName) || Boolean(target.isContentEditable)
}

export function clampIndex(index, total) {
  return Math.max(0, Math.min(total - 1, index))
}
