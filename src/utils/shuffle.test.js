import { describe, expect, it, vi } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('returns a new array without losing items', () => {
    const original = [1, 2, 3, 4]
    const shuffled = shuffle(original)

    expect(shuffled).not.toBe(original)
    expect(shuffled.toSorted()).toEqual(original)
    expect(original).toEqual([1, 2, 3, 4])
  })

  it('uses Fisher-Yates swaps deterministically when random is mocked', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(shuffle([1, 2, 3])).toEqual([2, 3, 1])
    vi.restoreAllMocks()
  })
})
