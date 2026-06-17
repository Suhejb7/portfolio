import { isTouchLike } from './touchLike'

export const MOBILE_LOADER_MS = 2200
export const DESKTOP_LOADER_MS = 4000

const holdMs = () =>
  isTouchLike() ? MOBILE_LOADER_MS : DESKTOP_LOADER_MS

const startedAt =
  typeof window !== 'undefined'
    ? (window.__loaderStartedAt ?? Date.now())
    : 0

const deadlineMs = typeof window !== 'undefined' ? holdMs() : MOBILE_LOADER_MS

let timerId = null
let hasRevealed = false
let revealHandler = null

export const isLoaderRevealed = () => hasRevealed

const msRemaining = () => Math.max(0, deadlineMs - (Date.now() - startedAt))

const invokeReveal = () => {
  revealHandler?.()
}

const runReveal = () => {
  if (hasRevealed) return
  hasRevealed = true
  if (timerId !== null) {
    clearTimeout(timerId)
    timerId = null
  }
  invokeReveal()
}

const armDeadline = () => {
  if (hasRevealed || timerId !== null) return
  timerId = window.setTimeout(runReveal, msRemaining())
}

if (typeof window !== 'undefined' && !isTouchLike()) {
  armDeadline()
}

export const subscribeLoaderReveal = (onReveal) => {
  revealHandler = onReveal

  if (hasRevealed) {
    onReveal()
    return () => {
      if (revealHandler === onReveal) revealHandler = null
    }
  }

  if (msRemaining() === 0) {
    runReveal()
  }

  return () => {
    if (revealHandler === onReveal) revealHandler = null
  }
}
