import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }) => children,
  motion: { div: ({ children, ...props }) => <div {...props}>{children}</div> },
}))

describe('progress', () => {
  beforeEach(() => localStorage.clear())

  it('counts a remembered card in the vowels group', () => {
    const { container } = render(<App />)
    fireEvent.click(container.querySelectorAll('.group-tabs button')[1])
    fireEvent.click(container.querySelector('.rate-button.known'))
    expect(screen.getByText('1/46')).toBeInTheDocument()
  })

  it('can update progress saved with the legacy character key', () => {
    localStorage.setItem('kana-progress-v1', JSON.stringify({ '\u3042': true }))
    const { container } = render(<App />)

    expect(screen.getByText('1/46')).toBeInTheDocument()
    fireEvent.click(container.querySelector('.rate-button.retry'))
    expect(screen.getByText('0/46')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'การ์ดก่อนหน้า' }))
    fireEvent.click(container.querySelector('.rate-button.known'))
    expect(screen.getByText('1/46')).toBeInTheDocument()
  })
})
