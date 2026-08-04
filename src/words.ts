export const WORDS = ['Shamrock', 'Vikings', 'Riverdance'] as const

export type Word = (typeof WORDS)[number]

const SAME_WORD_CHANCE = 0.24

/** Uniform pick, used to open a session. */
export function randomWord(): Word {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

/**
 * The next word to show. 24% chance of repeating the current word, 38% each
 * for the two others.
 */
export function nextWord(current: Word): Word {
  const roll = Math.random()
  if (roll < SAME_WORD_CHANCE) return current

  const others = WORDS.filter((word) => word !== current)
  const remaining = 1 - SAME_WORD_CHANCE
  const midpoint = SAME_WORD_CHANCE + remaining / 2
  return roll < midpoint ? others[0] : others[1]
}
