import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { inject } from '@vercel/analytics';

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

// Initialize Vercel Web Analytics
inject();

createRoot(document.getElementById('root')!).render(<App />);
