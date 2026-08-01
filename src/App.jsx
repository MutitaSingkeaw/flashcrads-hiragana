import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Shuffle, Sparkles, Volume2, X } from 'lucide-react'
import { hiraganaData, hiraganaGroups } from './data/hiraganaData'
import { MnemonicArtwork } from './components/MnemonicArtwork'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5)

function App() {
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [deck, setDeck] = useState(hiraganaData)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useLocalStorage('kana-progress-v1', {})

  const filtered = useMemo(
    () => deck.filter((card) => selectedGroup === 'all' || card.group === selectedGroup),
    [deck, selectedGroup],
  )
  const card = filtered[index] ?? filtered[0]
  const knownCount = Object.values(progress).filter(Boolean).length

  const selectGroup = (group) => {
    setSelectedGroup(group)
    setIndex(0)
    setFlipped(false)
  }

  const move = (direction) => {
    setIndex((current) => (current + direction + filtered.length) % filtered.length)
    setFlipped(false)
  }

  const rate = (known) => {
    setProgress((current) => ({ ...current, [card.character]: known }))
    move(1)
  }

  const speak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(`${card.character}。${card.example.word}`)
    utterance.lang = 'ja-JP'
    utterance.rate = 0.75
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target instanceof HTMLButtonElement) return
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault()
        setFlipped((value) => !value)
      }
      if (event.code === 'ArrowLeft') move(-1)
      if (event.code === 'ArrowRight') move(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Kana Kissa หน้าแรก">
          <span className="brand-mark">あ</span>
          <span>Kana Kissa</span>
        </a>
        <div className="progress-pill" aria-label={`จำได้ ${knownCount} จาก 46 ตัว`}>
          <span>{knownCount}/46</span>
          <div className="mini-progress"><i style={{ width: `${(knownCount / 46) * 100}%` }} /></div>
        </div>
      </header>

      <section className="intro" id="top">
        <div>
          <p className="eyebrow"><Sparkles size={15} /> เรียนด้วยภาพ · จำด้วยเรื่องราว</p>
          <h1>ฮิรางานะ<br /><em>จำง่ายกว่าที่คิด</em></h1>
        </div>
        <p className="intro-copy">มองหารูปที่ซ่อนอยู่ในตัวอักษร พลิกการ์ดเพื่อเฉลย แล้วบอกตัวเองว่าจำได้แค่ไหน</p>
      </section>

      <nav className="group-tabs" aria-label="เลือกกลุ่มฮิรางานะ">
        <button className={selectedGroup === 'all' ? 'active' : ''} onClick={() => selectGroup('all')}>ทั้งหมด</button>
        {hiraganaGroups.map((group) => (
          <button key={group.id} className={selectedGroup === group.id ? 'active' : ''} onClick={() => selectGroup(group.id)}>
            {group.label}<small>{group.kana}</small>
          </button>
        ))}
      </nav>

      <section className="study-area" aria-live="polite">
        <div className="side-note left-note">คลิกการ์ด<br />เพื่อดูเฉลย <span>↘</span></div>
        <AnimatePresence mode="wait">
          <motion.div
            className="card-stage"
            key={`${card.character}-${index}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
          >
            <button className={`flashcard ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped((value) => !value)} aria-label={flipped ? 'แสดงภาพช่วยจำ' : 'พลิกดูคำตอบ'}>
              <span className="card-face card-front">
                <span className="card-meta"><b>{String(index + 1).padStart(2, '0')}</b><span>MNEMONIC</span></span>
                <MnemonicArtwork card={card} />
                <span className="mnemonic-copy"><strong>{card.mnemonicTitle}</strong><small>{card.mnemonicDescription}</small></span>
                <span className="flip-hint"><RotateCcw size={15} /> พลิกดูเฉลย</span>
              </span>
              <span className="card-face card-back">
                <span className="card-meta"><b>{String(index + 1).padStart(2, '0')}</b><span>ANSWER</span></span>
                <span className="answer-kana">{card.character}</span>
                <span className="romaji">{card.romaji}</span>
                <span className="example"><b>{card.example.word}</b><span>{card.example.reading}</span><small>{card.example.meaningTh}</small></span>
                <span className="flip-hint"><RotateCcw size={15} /> กลับไปดูภาพ</span>
              </span>
            </button>
          </motion.div>
        </AnimatePresence>
        <div className="side-note right-note"><span>↙</span> กด Space<br />เพื่อพลิก</div>
      </section>

      <section className="controls" aria-label="ควบคุมการ์ด">
        <button className="icon-button" onClick={() => move(-1)} aria-label="การ์ดก่อนหน้า"><ArrowLeft /></button>
        <button className="rate-button retry" onClick={() => rate(false)}><X size={18} /> ทบทวนอีก</button>
        <button className="sound-button" onClick={speak}><Volume2 size={20} /><span>ฟังเสียง</span></button>
        <button className="rate-button known" onClick={() => rate(true)}><Check size={18} /> จำได้แล้ว</button>
        <button className="icon-button" onClick={() => move(1)} aria-label="การ์ดถัดไป"><ArrowRight /></button>
      </section>

      <footer>
        <button className="shuffle-button" onClick={() => { setDeck(shuffle(hiraganaData)); setIndex(0); setFlipped(false) }}><Shuffle size={16} /> สุ่มลำดับใหม่</button>
        <p>เรียนทีละตัว แล้วค่อย ๆ เก่งขึ้น — がんばって!</p>
      </footer>
    </main>
  )
}

export default App
