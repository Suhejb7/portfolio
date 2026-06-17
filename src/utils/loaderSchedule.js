export const MOBILE_LOADER_MS = 2200
export const DESKTOP_LOADER_MS = 4000

const holdMs = () =>
  window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
    ? MOBILE_LOADER_MS
    : DESKTOP_LOADER_MS

/** Captured once when this module first loads — before React mounts. */
const deadlineMs = holdMs()
const startedAt = Date.now()

let timerId = null
let hasRevealed = false
const subscribers = new Set()

const msRemaining = () => Math.max(0, deadlineMs - (Date.now() - startedAt))

const runReveal = () => {
  if (hasRevealed) return
  hasRevealed = true
  if (timerId !== null) {
    clearTimeout(timerId)
    timerId = null
  }
  subscribers.forEach((fn) => fn())
  subscribers.clear()
}

const armDeadline = () => {
  if (hasRevealed || timerId !== null) return
  timerId = window.setTimeout(runReveal, msRemaining())
}

// Hard timeout starts at JS parse time, not when React subscribes.
if (typeof window !== 'undefined') {
  armDeadline()
}

/** Subscribe to the fixed 2200ms (mobile) deadline. Timer is never reset. */
export const subscribeLoaderReveal = (onReveal) => {
  if (hasRevealed) {
    onReveal()
    return () => {}
  }

  subscribers.add(onReveal)

  if (msRemaining() === 0) {
    runReveal()
  }

  return () => {
    subscribers.delete(onReveal)
  }
}
