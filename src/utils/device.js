/** Stable touch/mobile detection — evaluated once per page load, never flips mid-session. */
let touchLikeCached = null

export const isTouchLikeDevice = () => {
  if (touchLikeCached === null) {
    if (typeof window === 'undefined') {
      touchLikeCached = true
    } else {
      touchLikeCached = window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
    }
  }
  return touchLikeCached
}
