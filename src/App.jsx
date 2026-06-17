import { useState, useEffect, useLayoutEffect } from 'react'
import Loading from './components/Loading'
import SiteContent from './SiteContent'
import { content } from './data/content'
import { subscribeLoaderReveal } from './utils/loaderSchedule'
import { clearScrollLock } from './utils/scrollLock'
import { isTouchLike } from './utils/touchLike'

function App() {
  const [mobile] = useState(() => isTouchLike())
  const [isLoading, setIsLoading] = useState(!mobile)
  const [revealed, setRevealed] = useState(mobile)
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useLayoutEffect(() => {
    clearScrollLock()
    if (mobile) return undefined

    return subscribeLoaderReveal(() => {
      setIsLoading(false)
      setRevealed(true)
      clearScrollLock()
    })
  }, [mobile])

  useEffect(() => {
    const userLanguage = navigator.language || navigator.userLanguage
    if (userLanguage.startsWith('sq')) {
      setCurrentLanguage('sq')
    } else if (userLanguage.startsWith('mk')) {
      setCurrentLanguage('mk')
    } else {
      setCurrentLanguage('en')
    }
  }, [])

  if (mobile) {
    return (
      <SiteContent
        revealed
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />
    )
  }

  return (
    <>
      <Loading
        isLoading={isLoading}
        content={content}
        currentLanguage={currentLanguage}
      />

      {!isLoading && (
        <SiteContent
          revealed={revealed}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />
      )}
    </>
  )
}

export default App
