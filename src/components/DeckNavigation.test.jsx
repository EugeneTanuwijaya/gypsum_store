import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DeckNavigation from './DeckNavigation'

const baseProps = {
  activeIndex: 2,
  total: 15,
  progress: 20,
  onPrevious: vi.fn(),
  onNext: vi.fn(),
  onPresent: vi.fn(),
  isFullscreen: false,
  onSelect: vi.fn(),
}

describe('DeckNavigation', () => {
  it('shows the counter, progress and active slide indicator', () => {
    render(<DeckNavigation {...baseProps} />)
    expect(screen.getAllByText('03 / 15').length).toBeGreaterThan(0)
    expect(screen.getByLabelText('Progres presentasi')).toHaveStyle('--progress: 20%')
    expect(screen.getByRole('button', { name: 'Buka slide 3' })).toHaveAttribute('aria-current', 'step')
  })

  it('disables navigation at deck boundaries', () => {
    const { rerender } = render(<DeckNavigation {...baseProps} activeIndex={0} />)
    expect(screen.getAllByRole('button', { name: 'Slide sebelumnya' })[0]).toBeDisabled()
    rerender(<DeckNavigation {...baseProps} activeIndex={14} />)
    expect(screen.getAllByRole('button', { name: 'Slide berikutnya' })[0]).toBeDisabled()
  })

  it('forwards navigation and presentation actions', () => {
    const next = vi.fn()
    const present = vi.fn()
    render(<DeckNavigation {...baseProps} onNext={next} onPresent={present} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Slide berikutnya' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'Mulai presentasi' }))
    expect(next).toHaveBeenCalledOnce()
    expect(present).toHaveBeenCalledOnce()
  })
})
