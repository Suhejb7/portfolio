let lockCount = 0
let savedScrollY = 0

export const clearScrollLock = () => {
  if (lockCount === 0) return

  lockCount = 0

  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.documentElement.style.overflow = ''

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
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    document.documentElement.style.overflow = ''

    window.scrollTo(0, savedScrollY)
    window.lenis?.start?.()
  }
}
