export const isTouchLike = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
}
