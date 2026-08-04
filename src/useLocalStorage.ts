import { useCallback, useEffect, useState } from 'react'

/**
 * useState that persists to localStorage. There is no backend, so this is where
 * game state lives between reloads.
 *
 * Keys are namespaced so unrelated apps on github.io can't collide with us.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const storageKey = `vbs01:${key}`

  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      return stored === null ? initialValue : (JSON.parse(stored) as T)
    } catch {
      // Corrupt JSON or storage blocked (private mode) — fall back to memory.
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value))
    } catch {
      // Quota exceeded or storage blocked — state still works for this session.
    }
  }, [storageKey, value])

  const reset = useCallback(() => {
    setValue(initialValue)
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      // ignore
    }
  }, [storageKey, initialValue])

  return [value, setValue, reset] as const
}
