import { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react'
import SiteContentMobile from './SiteContentMobile'
import { content } from './data/content'
import { subscribeLoaderReveal } from './utils/loaderSchedule'
import { clearScrollLock } from './utils/scrollLock'
import { isTouchLike } from './utils/touchLike'

const SiteContent = lazy(() => import('./SiteContent'))
const Loading = lazy(() => import('./components/Loading'))

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
      <SiteContentMobile
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />
    )
  }

  return (
    <>
      <Suspense fallback={null}>
        <Loading
          isLoading={isLoading}
          content={content}
          currentLanguage={currentLanguage}
        />
      </Suspense>

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
