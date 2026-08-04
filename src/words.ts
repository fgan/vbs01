export const WORDS = ['Shamrock', 'Vikings', 'Riverdance'] as const

export type Word = (typeof WORDS)[number]

/** How many times each word has been displayed in the current session. */
export type WordCounts = Record<Word, number>

const SAME_WORD_CHANCE = 0.24
/** Given to the least-displayed word when it isn't the current one. */
const FAVORED_CHANCE = 0.45

export function emptyCounts(): WordCounts {
  return { Shamrock: 0, Vikings: 0, Riverdance: 0 }
}

/** Uniform pick, used to open a session. */
export function randomWord(): Word {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

/**
 * The next word to show. The current word always has a 24% chance of
 * repeating. The other 76% is split by display counts:
 *
 * - If exactly one of the two other words is the least-displayed word of the
 *   session, it gets 45% and the remaining word gets 31%.
 * - Otherwise — the current word is the least-displayed, or the two others are
 *   tied for least — the split is an even 38%/38%.
 *
 * Ties are deliberately not broken: with nothing to distinguish the two
 * candidates, biasing toward either would just be a hidden preference.
 */
export function nextWord(current: Word, counts: WordCounts): Word {
  const roll = Math.random()
  if (roll < SAME_WORD_CHANCE) return current

  const others = WORDS.filter((word) => word !== current)
  const fewest = Math.min(...WORDS.map((word) => counts[word]))
  const starved = others.filter((word) => counts[word] === fewest)

  if (starved.length === 1) {
    const favored = starved[0]
    const third = others[0] === favored ? others[1] : others[0]
    return roll < SAME_WORD_CHANCE + FAVORED_CHANCE ? favored : third
  }

  const remaining = 1 - SAME_WORD_CHANCE
  const midpoint = SAME_WORD_CHANCE + remaining / 2
  return roll < midpoint ? others[0] : others[1]
}
