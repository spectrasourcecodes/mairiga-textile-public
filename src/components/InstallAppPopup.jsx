import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, X, Zap, Clock, Gift, AlertCircle } from 'lucide-react';

const InstallAppPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [dismissCount, setDismissCount] = useState(0);
  const [showManualInstructions, setShowManualInstructions] = useState(false); // THIS WAS MISSING

  useEffect(() => {
    // Check if app is already installed (standalone mode)
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches || 
                          window.navigator.standalone === true;
    
    setIsInstalled(isAppInstalled);
    
    if (isAppInstalled) {
      return;
    }

    // Get dismiss count
    const count = parseInt(localStorage.getItem('installPopupDismissCount') || '0');
    setDismissCount(count);
    
    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      localStorage.removeItem('installPopupDismissCount');
      localStorage.removeItem('installPopupLastDismiss');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsVisible(false);
        localStorage.removeItem('installPopupDismissCount');
        localStorage.removeItem('installPopupLastDismiss');
      } else {
        const newCount = dismissCount + 1;
        setDismissCount(newCount);
        localStorage.setItem('installPopupDismissCount', newCount.toString());
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowManualInstructions(true);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    const newCount = dismissCount + 1;
    setDismissCount(newCount);
    localStorage.setItem('installPopupDismissCount', newCount.toString());
    
    if (newCount >= 5 && newCount % 3 === 0) {
      setShowReminder(true);
    }
  };

  const handleNeverShow = () => {
    setShowReminder(false);
    localStorage.setItem('installPopupDismissCount', '999');
    localStorage.setItem('installPopupLastDismiss', Date.now().toString());
  };

  const handleInstallFromReminder = async () => {
    setShowReminder(false);
    await handleInstall();
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Manual Installation Instructions Modal */}
      <AnimatePresence>
        {showManualInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Smartphone size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Install Mairiga Textile App</h3>
                <p className="text-gray-600 text-sm">
                  Follow these steps to install our app on your device
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Chrome / Edge</p>
                    <p className="text-sm text-gray-600">Tap the menu (⋮) → "Install App" or "Add to Home Screen"</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Safari (iOS)</p>
                    <p className="text-sm text-gray-600">Tap Share → "Add to Home Screen" → "Add"</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Firefox / Samsung Internet</p>
                    <p className="text-sm text-gray-600">Look for "Install" or "Add to Home Screen" in menu</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowManualInstructions(false)}
                className="w-full bg-accent text-white py-3 rounded-xl font-bold shadow-lg"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Install Popup */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-accent/30">
              {dismissCount > 0 && (
                <div className="absolute top-3 left-3 bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
                  Dismissed {dismissCount} time{dismissCount !== 1 ? 's' : ''}
                </div>
              )}
              
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <X size={16} className="text-gray-600" />
              </button>

              <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Smartphone size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Install Our App! 🚀</h3>
                    <p className="text-xs opacity-90">Better experience, faster shopping</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">2x Faster Shopping</p>
                    <p className="text-xs text-gray-500">Optimized for mobile devices</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Gift size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Exclusive Discounts</p>
                    <p className="text-xs text-gray-500">10% off first app purchase</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">One-Tap Access</p>
                    <p className="text-xs text-gray-500">Launch from home screen instantly</p>
                  </div>
                </div>
              </div>

              {dismissCount >= 3 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mx-4 mb-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-yellow-600" />
                    <p className="text-xs text-yellow-800">
                      You've dismissed this {dismissCount} times. Installing the app gives you a much better experience!
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="p-4 pt-0 flex gap-3">
                <motion.button
                  onClick={handleInstall}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-accent text-white py-3 rounded-xl font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download size={18} />
                  Install Now
                </motion.button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  {dismissCount >= 3 ? "I'll Think About It" : "Maybe Later"}
                </button>
              </div>

              <div className="px-4 pb-4 text-center">
                <p className="text-xs text-gray-400">
                  💡 Install once, enjoy forever • No ads • Fast checkout
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Reminder Dialog */}
      <AnimatePresence>
        {showReminder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl"
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Smartphone size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Don't Miss Out! 🎁</h3>
                <p className="text-gray-600 text-sm">
                  You've dismissed this {dismissCount} times. The app version is much better!
                </p>
              </div>
              
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Save payment methods</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Instant notifications</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🎁</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Exclusive app deals</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleInstallFromReminder}
                  className="flex-1 bg-accent text-white py-3 rounded-xl font-bold shadow-lg"
                >
                  Install Now
                </button>
                <button
                  onClick={handleNeverShow}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold"
                >
                  No Thanks
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InstallAppPopup;