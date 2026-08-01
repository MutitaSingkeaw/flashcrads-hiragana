import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, RotateCcw, Shuffle, Volume2, X } from 'lucide-react'
import { hiraganaGroups } from '../data/hiraganaData'
import { MnemonicArtwork } from './MnemonicArtwork'

export function Header({ knownCount }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Kana Kissa หน้าแรก">
        <span className="brand-mark">あ</span><span>Kana Kissa</span>
      </a>
      <div className="progress-pill" aria-label={`จำได้ ${knownCount} จาก 46 ตัว`}>
        <span>{knownCount}/46</span>
        <div className="mini-progress"><i style={{ width: `${(knownCount / 46) * 100}%` }} /></div>
      </div>
    </header>
  )
}

export function GroupTabs({ selectedGroup, onSelect }) {
  return (
    <nav className="group-tabs" aria-label="เลือกกลุ่มฮิรางานะ">
      <button className={selectedGroup === 'all' ? 'active' : ''} onClick={() => onSelect('all')}>ทั้งหมด</button>
      {hiraganaGroups.map((group) => (
        <button key={group.id} className={selectedGroup === group.id ? 'active' : ''} onClick={() => onSelect(group.id)}>
          {group.label}<small>{group.kana}</small>
        </button>
      ))}
    </nav>
  )
}

export function Flashcard({ card, cardNumber, flipped, onFlip, onMove }) {
  return (
    <section className="study-area" aria-live="polite">
      <div className="side-note left-note">คลิกการ์ด<br />เพื่อดูเฉลย <span>↘</span></div>
      <button className="card-arrow card-arrow-left" onClick={() => onMove(-1)} aria-label="การ์ดก่อนหน้า"><ArrowLeft /></button>
      <AnimatePresence mode="wait">
        <motion.div className="card-stage" key={card.character} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
          <button className={`flashcard ${flipped ? 'is-flipped' : ''}`} onClick={onFlip} aria-label={flipped ? 'แสดงภาพช่วยจำ' : 'พลิกดูคำตอบ'} aria-pressed={flipped}>
            <span className="card-face card-front">
              <span className="card-meta"><b>{String(cardNumber).padStart(2, '0')}</b><span>MNEMONIC</span></span>
              <MnemonicArtwork card={card} />
              <span className="mnemonic-copy"><strong>{card.mnemonicTitle}</strong><small>{card.mnemonicDescription}</small></span>
              <span className="flip-hint"><RotateCcw size={15} /> พลิกดูเฉลย</span>
            </span>
            <span className="card-face card-back">
              <span className="card-meta"><b>{String(cardNumber).padStart(2, '0')}</b><span>ANSWER</span></span>
              <span className="answer-kana">{card.character}</span>
              <span className="romaji">{card.romaji}</span>
              <span className="example"><b>{card.example.word}</b><span>{card.example.reading}</span><small>{card.example.meaningTh}</small></span>
              <span className="flip-hint"><RotateCcw size={15} /> กลับไปดูภาพ</span>
            </span>
          </button>
        </motion.div>
      </AnimatePresence>
      <button className="card-arrow card-arrow-right" onClick={() => onMove(1)} aria-label="การ์ดถัดไป"><ArrowRight /></button>
      <div className="side-note right-note"><span>↙</span> กด Space<br />เพื่อพลิก</div>
    </section>
  )
}

export function StudyControls({ onRate, onSpeak }) {
  return (
    <section className="controls" aria-label="ควบคุมการ์ด">
      <button className="rate-button retry" onClick={() => onRate(false)}><X size={18} /><span className="rate-label"><span className="desktop-label">ทบทวนอีก</span><span className="mobile-label">ทบทวน</span></span></button>
      <button className="sound-button" onClick={onSpeak}><Volume2 size={20} /><span>ฟังเสียง</span></button>
      <button className="rate-button known" onClick={() => onRate(true)}><Check size={18} /><span className="rate-label"><span className="desktop-label">จำได้แล้ว</span><span className="mobile-label">จำได้</span></span></button>
    </section>
  )
}

export function Footer({ onShuffle }) {
  return (
    <footer>
      <button className="shuffle-button" onClick={onShuffle}><Shuffle size={16} /> สุ่มลำดับใหม่</button>
      <p>เรียนทีละตัว แล้วค่อย ๆ เก่งขึ้น — がんばって!</p>
    </footer>
  )
}
