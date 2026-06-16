export const clearScrollLock = () => {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.documentElement.style.overflow = ''
  document.documentElement.style.height = ''
  window.lenis?.start?.()
}

export const lockScroll = () => {
  document.documentElement.style.overflow = 'hidden'
  document.documentElement.style.height = '100%'
  document.body.style.overflow = 'hidden'
  window.lenis?.stop?.()
}
