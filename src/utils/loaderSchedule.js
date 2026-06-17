export const MOBILE_LOADER_MS = 2200
export const DESKTOP_LOADER_MS = 4000
export const LOADER_ROOT_ID = 'portfolio-loading-screen'

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
let latestRevealCallback = null

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

  const callbacks = new Set(subscribers)
  if (latestRevealCallback) callbacks.add(latestRevealCallback)
  callbacks.forEach((fn) => fn())
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
  latestRevealCallback = onReveal

  if (hasRevealed) {
    onReveal()
    return () => {
      if (latestRevealCallback === onReveal) latestRevealCallback = null
    }
  }

  subscribers.add(onReveal)

  if (msRemaining() === 0) {
    runReveal()
  }

  return () => {
    subscribers.delete(onReveal)
    if (latestRevealCallback === onReveal) latestRevealCallback = null
  }
}
