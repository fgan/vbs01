import { useState } from 'react'
import { nextWord, randomWord, type Word } from './words'

type GameProps = {
  onEnd: (score: number) => void
}

export function Game({ onEnd }: GameProps) {
  const [score, setScore] = useState(0)
  const [word, setWord] = useState<Word>(randomWord)
  // Increments on every answer, including ones that reroll the same word. Used
  // as the word's key so React remounts it and the animation always replays.
  const [round, setRound] = useState(0)

  // Both answers advance the word; only Correct scores.
  const answer = (correct: boolean) => {
    if (correct) setScore(score + 1)
    setWord(nextWord(word))
    setRound(round + 1)
  }

  return (
    <>
      <div className="scoreline">
        Score <span className="scoreline-value">{score}</span>
      </div>

      {/* aria-live sits on the stable wrapper; the keyed child is what remounts. */}
      <div className="word" aria-live="polite">
        <span key={round} className="word-text">
          {word}
        </span>
      </div>

      <div className="answers">
        <button
          type="button"
          className="answer correct"
          onClick={() => answer(true)}
        >
          Correct
        </button>
        <button
          type="button"
          className="answer incorrect"
          onClick={() => answer(false)}
        >
          Incorrect
        </button>
      </div>

      <button type="button" className="end" onClick={() => onEnd(score)}>
        End game
      </button>
    </>
  )
}
