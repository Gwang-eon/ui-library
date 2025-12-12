import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import global styles
import '../src/styles/design-tokens.css';
import '../src/styles/base.css';
import '../src/styles/atomic.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
