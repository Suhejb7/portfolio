import { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react'
import Loading from './components/Loading'
import { content } from './data/content'
import { subscribeLoaderReveal, isLoaderRevealed } from './utils/loaderSchedule'
import { clearScrollLock } from './utils/scrollLock'

const SiteContent = lazy(() => import('./SiteContent'))

function App() {
  const [isLoading, setIsLoading] = useState(() => !isLoaderRevealed())
  const [revealed, setRevealed] = useState(() => isLoaderRevealed())
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useLayoutEffect(() => {
    clearScrollLock()
    import('./SiteContent')

    const revealSite = () => {
      console.log('revealed = true')
      setIsLoading(false)
      setRevealed(true)
      clearScrollLock()
    }

    return subscribeLoaderReveal(revealSite)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      console.log('Site content visible')
    }
  }, [isLoading])

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

  return (
    <>
      <Loading
        isLoading={isLoading}
        content={content}
        currentLanguage={currentLanguage}
      />

      {!isLoading && (
        <Suspense fallback={null}>
          <SiteContent
            revealed={revealed}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />
        </Suspense>
      )}
    </>
  )
}

export default App
