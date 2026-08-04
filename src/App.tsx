import { useState } from 'react'
import { Game } from './Game'
import { StartScreen } from './StartScreen'
import { addResult, type GameResult } from './scores'
import { useLocalStorage } from './useLocalStorage'
import './App.css'

function App() {
  const [scores, setScores, clearScores] = useLocalStorage<GameResult[]>(
    'scores',
    [],
  )
  const [playing, setPlaying] = useState(false)

  const endGame = (score: number) => {
    setScores(addResult(scores, { score, playedAt: Date.now() }))
    setPlaying(false)
  }

  return (
    <>
      <h1>Shamrock, Vikings, Riverdance</h1>

      {playing ? (
        <Game onEnd={endGame} />
      ) : (
        <StartScreen
          scores={scores}
          onStart={() => setPlaying(true)}
          onClear={clearScores}
        />
      )}
    </>
  )
}

export default App
