import './index.css'
import './utils/loaderSchedule.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { clearScrollLock } from './utils/scrollLock'

clearScrollLock()

window.addEventListener('pageshow', (event) => {
  if (event.persisted) clearScrollLock()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
