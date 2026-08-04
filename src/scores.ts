export type GameResult = {
  score: number
  /** Epoch ms — also the list key, since sessions can't end simultaneously. */
  playedAt: number
}

/** Only the most recent five are kept; older results are dropped on save. */
export const MAX_SCORES = 5

export function addResult(
  scores: GameResult[],
  result: GameResult,
): GameResult[] {
  return [result, ...scores].slice(0, MAX_SCORES)
}
