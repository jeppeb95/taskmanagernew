import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExtraUtilities from './ExtraUtilities.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExtraUtilities />
  </StrictMode>,
)
