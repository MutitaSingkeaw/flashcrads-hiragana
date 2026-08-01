import { describe, expect, it } from 'vitest'
import { hiraganaData } from './hiraganaData'
describe('hiragana content',()=>{it('contains 46 unique basic hiragana',()=>{expect(hiraganaData).toHaveLength(46);expect(new Set(hiraganaData.map(item=>item.character)).size).toBe(46)});it('has complete content',()=>{hiraganaData.forEach(item=>{expect(item.romaji).toBeTruthy();expect(item.mnemonicTitle).toBeTruthy();expect(item.mnemonicDescription).toBeTruthy();expect(item.emoji).toBeTruthy();expect(item.example.word).toBeTruthy();expect(item.example.meaningTh).toBeTruthy()})})})
