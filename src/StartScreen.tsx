import type { GameResult } from './scores'

type StartScreenProps = {
  scores: GameResult[]
  onStart: () => void
  onClear: () => void
}

const formatPlayedAt = (playedAt: number) =>
  new Date(playedAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

export function StartScreen({ scores, onStart, onClear }: StartScreenProps) {
  return (
    <>
      <div className="panel">
        <h2>Recent scores</h2>

        {scores.length === 0 ? (
          <p className="empty">No games played yet.</p>
        ) : (
          <ol className="scores">
            {scores.map((result) => (
              <li key={result.playedAt} className="score-row">
                <span className="score-value">{result.score}</span>
                <span className="score-when">
                  {formatPlayedAt(result.playedAt)}
                </span>
              </li>
            ))}
          </ol>
        )}

        {scores.length > 0 && (
          <button type="button" className="clear" onClick={onClear}>
            Clear all scores
          </button>
        )}
      </div>

      <button type="button" className="start" onClick={onStart}>
        Start
      </button>
    </>
  )
}
