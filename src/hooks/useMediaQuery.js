import { useState, useEffect } from 'react'

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 1023px)')

export const useIsTouchDevice = () => useMediaQuery('(pointer: coarse)')

export const usePreferReducedEffects = () => {
  const isMobile = useIsMobile()
  const isTouch = useIsTouchDevice()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  return isMobile || isTouch || reducedMotion
}
