export const MOBILE_LOADER_MS = 2200
export const DESKTOP_LOADER_MS = 4000

const holdMs = () =>
  window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
    ? MOBILE_LOADER_MS
    : DESKTOP_LOADER_MS

const startedAt =
  typeof window !== 'undefined'
    ? (window.__loaderStartedAt ?? Date.now())
    : 0

const deadlineMs = typeof window !== 'undefined' ? holdMs() : MOBILE_LOADER_MS

let timerId = null
let hasRevealed = false
const subscribers = new Set()

export const isLoaderRevealed = () => hasRevealed

const msRemaining = () => Math.max(0, deadlineMs - (Date.now() - startedAt))

const runReveal = () => {
  if (hasRevealed) return
  hasRevealed = true
  if (timerId !== null) {
    clearTimeout(timerId)
    timerId = null
  }
  console.log('Loading finished')
  subscribers.forEach((fn) => fn())
  subscribers.clear()
}

const armDeadline = () => {
  if (hasRevealed || timerId !== null) return
  timerId = window.setTimeout(runReveal, msRemaining())
}

if (typeof window !== 'undefined') {
  armDeadline()
}

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
