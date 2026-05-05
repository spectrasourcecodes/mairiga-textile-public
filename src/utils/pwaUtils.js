// PWA Installation helpers
export const checkPWASupport = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

export const isPWAInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
};

export const getPWADisplayMode = () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  }
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui';
  }
  if (window.navigator.standalone === true) {
    return 'ios-standalone';
  }
  return 'browser';
};

// Register Service Worker
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    
    console.log('Service Worker registered with scope:', registration.scope);
    
    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      console.log('Service Worker update found!');
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('Update available! Please refresh.');
          // Show update notification to user
          const event = new CustomEvent('pwaUpdateAvailable');
          window.dispatchEvent(event);
        }
      });
    });
    
    return true;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return false;
  }
};

// Subscribe to push notifications
export const subscribeToPush = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
    });
    
    console.log('Push subscription successful:', subscription);
    return subscription;
  } catch (error) {
    console.error('Push subscription failed:', error);
    return null;
  }
};

// Helper function for VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Check for app updates
export const checkForUpdates = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
    });
  }
};