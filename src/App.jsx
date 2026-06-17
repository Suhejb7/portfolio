import { useState, useEffect, useLayoutEffect } from 'react'
import Loading, { isTouchLike } from './components/Loading'
import SiteContent from './SiteContent'
import { content } from './data/content'
import { subscribeLoaderReveal } from './utils/loaderSchedule'
import { clearScrollLock } from './utils/scrollLock'

const skipLoader = typeof window !== 'undefined' && isTouchLike()

function App() {
  const [isLoading, setIsLoading] = useState(!skipLoader)
  const [revealed, setRevealed] = useState(skipLoader)
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useLayoutEffect(() => {
    clearScrollLock()

    if (skipLoader) return undefined

    return subscribeLoaderReveal(() => {
      setIsLoading(false)
      setRevealed(true)
      clearScrollLock()
    })
  }, [])

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

  const showContent = skipLoader || !isLoading

  return (
    <>
      {!skipLoader && (
        <Loading
          isLoading={isLoading}
          content={content}
          currentLanguage={currentLanguage}
        />
      )}

      {showContent && (
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
