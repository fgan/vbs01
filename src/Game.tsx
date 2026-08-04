import { useState } from 'react'
import { nextWord, randomWord, type Word } from './words'

type GameProps = {
  onEnd: (score: number) => void
}

export function Game({ onEnd }: GameProps) {
  const [score, setScore] = useState(0)
  const [word, setWord] = useState<Word>(randomWord)

  // Both answers advance the word; only Correct scores.
  const answer = (correct: boolean) => {
    if (correct) setScore(score + 1)
    setWord(nextWord(word))
  }

  return (
    <>
      <div className="scoreline">
        Score <span className="scoreline-value">{score}</span>
      </div>

      <div className="word" aria-live="polite">
        {word}
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
