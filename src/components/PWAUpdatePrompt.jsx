import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';

const PWAUpdatePrompt = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => {
      setShowUpdate(true);
    };

    window.addEventListener('pwaUpdateAvailable', handleUpdateAvailable);
    
    return () => {
      window.removeEventListener('pwaUpdateAvailable', handleUpdateAvailable);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  return (
    <AnimatePresence>
      {showUpdate && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-4 border border-accent/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Update Available</h4>
                <p className="text-xs text-gray-500 mt-1">
                  A new version is available. Please refresh to get the latest features.
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleRefresh}
                    className="bg-accent text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold"
                  >
                    Later
                  </button>
                </div>
              </div>
              <button onClick={handleDismiss} className="flex-shrink-0">
                <X size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAUpdatePrompt;