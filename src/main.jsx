import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    import('./utils/pwaUtils').then(({ registerServiceWorker }) => {
      registerServiceWorker();
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);