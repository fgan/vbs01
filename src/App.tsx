import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import './App.css'

type Player = {
  id: string
  name: string
  score: number
}

// Placeholder feature so the persistence wiring is visible end to end.
// Replace this with the actual helper for the game.
function App() {
  const [players, setPlayers, resetPlayers] = useLocalStorage<Player[]>(
    'players',
    [],
  )
  const [draftName, setDraftName] = useState('')

  const addPlayer = () => {
    const name = draftName.trim()
    if (!name) return
    setPlayers([...players, { id: crypto.randomUUID(), name, score: 0 }])
    setDraftName('')
  }

  const adjustScore = (id: string, delta: number) => {
    setPlayers(
      players.map((p) => (p.id === id ? { ...p, score: p.score + delta } : p)),
    )
  }

  return (
    <>
      <h1>vbs01</h1>
      <p className="subtitle">Game helper</p>

      <div className="panel">
        <h2>Players</h2>

        <form
          className="tracker-add"
          onSubmit={(e) => {
            e.preventDefault()
            addPlayer()
          }}
        >
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="Add a player"
            aria-label="Player name"
          />
          <button type="submit">Add</button>
        </form>

        {players.length === 0 ? (
          <p className="empty">No players yet.</p>
        ) : (
          <ul className="tracker-list">
            {players.map((player) => (
              <li key={player.id} className="tracker-row">
                <span className="tracker-name">{player.name}</span>
                <button type="button" onClick={() => adjustScore(player.id, -1)}>
                  −
                </button>
                <span className="tracker-score">{player.score}</span>
                <button type="button" onClick={() => adjustScore(player.id, 1)}>
                  +
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {players.length > 0 && (
        <button type="button" onClick={resetPlayers}>
          Reset
        </button>
      )}

      <p className="footnote">
        State is saved in this browser only — nothing is sent to a server.
      </p>
    </>
  )
}

export default App
