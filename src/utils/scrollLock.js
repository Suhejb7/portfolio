let lockCount = 0
let savedScrollY = 0

const resetBodyScrollStyles = () => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.documentElement.style.overflow = ''
  document.documentElement.style.height = ''
}

const isScrollLocked = () => document.body.style.position === 'fixed'

/** Current document scroll position — correct even while the menu lock is active. */
export const getScrollLockY = () => (isScrollLocked() ? savedScrollY : window.scrollY)

/** Always clears inline scroll-lock styles — safe on refresh / bfcache restore. */
export const clearScrollLock = () => {
  lockCount = 0
  resetBodyScrollStyles()
  window.scrollTo(0, savedScrollY)
  window.lenis?.start?.()
}

export const lockScroll = () => {
  if (lockCount === 0) {
    savedScrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    window.lenis?.stop?.()
  }

  lockCount += 1
}

export const unlockScroll = () => {
  if (lockCount === 0) return

  lockCount -= 1

  if (lockCount === 0) {
    resetBodyScrollStyles()
    window.scrollTo(0, savedScrollY)
    window.lenis?.start?.()
  }
}

/** Unlock scroll and navigate — used when mobile menu links are tapped. */
export const forceUnlockAndScrollTo = (targetY, { smooth = true } = {}) => {
  lockCount = 0
  resetBodyScrollStyles()
  savedScrollY = targetY

  if (window.lenis) {
    window.lenis.scrollTo(targetY, { duration: smooth ? 1 : 0 })
  } else {
    window.scrollTo({ top: targetY, behavior: smooth ? 'smooth' : 'auto' })
  }

  window.lenis?.start?.()
}
