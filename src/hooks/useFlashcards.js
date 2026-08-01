import { useCallback, useMemo, useState } from 'react'
import { hiraganaData } from '../data/hiraganaData'
import { shuffle } from '../utils/shuffle'
import { useLocalStorage } from './useLocalStorage'

const ALL_GROUPS = 'all'

export function useFlashcards() {
  const [selectedGroup, setSelectedGroup] = useState(ALL_GROUPS)
  const [deck, setDeck] = useState(hiraganaData)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useLocalStorage('kana-progress-v1', {})

  const cards = useMemo(
    () => deck.filter((card) => selectedGroup === ALL_GROUPS || card.group === selectedGroup),
    [deck, selectedGroup],
  )
  const card = cards[index]
  const knownCount = useMemo(
    () => hiraganaData.filter(({ id, character }) => (
      progress[id] === true || progress[character] === true
    )).length,
    [progress],
  )

  const selectGroup = useCallback((group) => {
    setSelectedGroup(group)
    setIndex(0)
    setFlipped(false)
  }, [])

  const move = useCallback((direction) => {
    setIndex((current) => (current + direction + cards.length) % cards.length)
    setFlipped(false)
  }, [cards.length])

  const toggleCard = useCallback(() => setFlipped((value) => !value), [])

  const rate = useCallback((known) => {
    setProgress((current) => ({
      ...current,
      [card.id]: known,
      [card.character]: known,
    }))
    move(1)
  }, [card.character, card.id, move, setProgress])

  const shuffleDeck = useCallback(() => {
    setDeck((current) => shuffle(current))
    setIndex(0)
    setFlipped(false)
  }, [])

  return {
    card,
    cards,
    flipped,
    index,
    knownCount,
    move,
    rate,
    selectedGroup,
    selectGroup,
    shuffleDeck,
    toggleCard,
  }
}
