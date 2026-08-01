import { useEffect } from 'react'

const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [contenteditable="true"]'

export function useStudyKeyboard({ move, toggleCard }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target.closest?.(INTERACTIVE_SELECTOR)) return

      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault()
        toggleCard()
      } else if (event.code === 'ArrowLeft') {
        move(-1)
      } else if (event.code === 'ArrowRight') {
        move(1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move, toggleCard])
}
