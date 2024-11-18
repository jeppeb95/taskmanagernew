import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ExtraUtilities from './components/ExtraUtilities';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ExtraUtilities />
    </StrictMode>,
  );
} else {
  console.error("Root element not found!");
}
