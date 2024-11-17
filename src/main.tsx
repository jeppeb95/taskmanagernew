import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ExtraUtilities from './ExtraUtilities';
import DarkMode from './DarkMode';  

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ExtraUtilities />
      <DarkMode />
    </StrictMode>,
  );
} else {
  console.error("Root element not found!");
}
