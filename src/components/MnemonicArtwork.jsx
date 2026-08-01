export function MnemonicArtwork({ card }) {
  return (
    <div className={`mnemonic-art art-${card.group}`} aria-label={`ภาพช่วยจำ ${card.mnemonicTitle}`}>
      <div className="sun-dot" />
      <span className="art-kana" aria-hidden="true">{card.character}</span>
      <span className="art-emoji" aria-hidden="true">{card.emoji}</span>
      <div className="art-shadow" />
    </div>
  )
}
