export const MOBILE_LOADER_MS = 2200
export const DESKTOP_LOADER_MS = 4000

const holdMs = () =>
  window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
    ? MOBILE_LOADER_MS
    : DESKTOP_LOADER_MS

let timerId = null
let hasRevealed = false
const subscribers = new Set()

const runReveal = () => {
  if (hasRevealed) return
  hasRevealed = true
  timerId = null
  subscribers.forEach((fn) => fn())
  subscribers.clear()
}

const ensureTimer = () => {
  if (hasRevealed || timerId !== null) return
  timerId = window.setTimeout(runReveal, holdMs())
}

/** One hard deadline per page load. Timer is never reset by React remounts. */
export const subscribeLoaderReveal = (onReveal) => {
  if (hasRevealed) {
    onReveal()
    return () => {}
  }

  subscribers.add(onReveal)
  ensureTimer()

  return () => {
    subscribers.delete(onReveal)
  }
}
