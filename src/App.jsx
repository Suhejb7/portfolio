import { useState, useEffect, useLayoutEffect } from 'react'
import Loading from './components/Loading'
import SiteContent from './SiteContent'
import { content } from './data/content'
import { subscribeLoaderReveal } from './utils/loaderSchedule'
import { clearScrollLock } from './utils/scrollLock'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useEffect(() => {
    console.log('App mounted')
  }, [])

  useLayoutEffect(() => {
    clearScrollLock()

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
