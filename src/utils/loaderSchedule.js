export const MOBILE_LOADER_MS = 2200
export const DESKTOP_LOADER_MS = 4000
export const LOADER_ROOT_ID = 'portfolio-loading-screen'

const holdMs = () =>
  window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
    ? MOBILE_LOADER_MS
    : DESKTOP_LOADER_MS

/** Earliest possible t0 — set in index.html before the JS bundle loads. */
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

export const hideLoadingScreenDom = () => {
  document.getElementById(LOADER_ROOT_ID)?.remove()
}

const runReveal = () => {
  if (hasRevealed) return
  hasRevealed = true
  if (timerId !== null) {
    clearTimeout(timerId)
    timerId = null
  }
  hideLoadingScreenDom()
  console.log('Loading timeout finished')
  subscribers.forEach((fn) => fn())
  subscribers.clear()
}

const armDeadline = () => {
  if (hasRevealed || timerId !== null) return
  const remaining = msRemaining()
  console.log('Loading timeout started', { remainingMs: remaining, deadlineMs })
  timerId = window.setTimeout(runReveal, remaining)
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
