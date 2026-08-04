import { Sparkles } from 'lucide-react'
import { Flashcard, Footer, GroupTabs, Header, StudyControls } from './components/StudyUi'
import { useFlashcards } from './hooks/useFlashcards'
import { useStudyKeyboard } from './hooks/useStudyKeyboard'
import { speakJapanese } from './utils/speech'
import './App.css'
import './responsive.css'

function App() {
  const study = useFlashcards()
  useStudyKeyboard({ move: study.move, toggleCard: study.toggleCard })

  return (
    <main className="app-shell">
      <Header knownCount={study.knownCount} />

      <section className="intro" id="top">
        <div>
          <p className="eyebrow"><Sparkles size={15} /> เรียนด้วยภาพ · จำด้วยเรื่องราว</p>
          <h1>Hiragana<br /><em>จำง่ายกว่าที่คิด</em></h1>
        </div>
        <p className="intro-copy">มองหารูปที่ซ่อนอยู่ในตัวอักษร พลิกการ์ดเพื่อเฉลย แล้วบอกตัวเองว่าจำได้แค่ไหน</p>
        <div className="intro-credit">
          <p>ผู้จัดทำ นางสาวมุธิตา สิงห์แก้ว รหัสนักศึกษา B6609535 เลขที่ 26 sec 2</p>
          <p className="intro-credit-sub">เป็นส่วนหนึ่งของรายวิชา JAPANESE 1 รหัสวิชาวิชา IST30 1401-1 </p>
        </div>
      </section>

      <GroupTabs selectedGroup={study.selectedGroup} onSelect={study.selectGroup} />
      <Flashcard card={study.card} cardNumber={study.index + 1} flipped={study.flipped} onFlip={study.toggleCard} onMove={study.move} />
      <StudyControls onRate={study.rate} onSpeak={() => speakJapanese(study.card)} />
      <Footer onShuffle={study.shuffleDeck} />
    </main>
  )
}

export default App
