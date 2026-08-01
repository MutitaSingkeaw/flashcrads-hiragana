export function speakJapanese(card) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return false

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(`${card.character}。${card.example.word}`)
  utterance.lang = 'ja-JP'
  utterance.rate = 0.75
  window.speechSynthesis.speak(utterance)
  return true
}
