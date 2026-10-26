import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure window.fetch is writable and configurable in all contexts
try {
  const target = window as unknown as Record<string, unknown>;
  const orig = target.fetch;
  let currentFetch = orig;
  try {
    Object.defineProperty(window, 'fetch', {
      get: () => currentFetch,
      set: (fn) => { currentFetch = fn; },
      configurable: true,
      enumerable: true,
    });
  } catch {
    try {
      Object.defineProperty(window, 'fetch', {
        value: orig,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    } catch {}
  }
} catch {}

createRoot(document.getElementById('root')!).render(<App />);
