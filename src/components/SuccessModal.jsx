import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingBag, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message, type = 'login' }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const icons = {
    login: <CheckCircle size={48} className="text-green-500" />,
    register: <ShoppingBag size={48} className="text-accent" />
  };

  const titles = {
    login: 'Welcome Back!',
    register: 'Account Created Successfully!'
  };

  const messages = {
    login: 'You have successfully logged into your account.',
    register: 'Your account has been created. Welcome to Mairiga Textile!'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={onClose}
          />
          
          {/* Modal Container - Proper centering */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative p-6 text-center">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center">
                      {icons[type]}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {title || titles[type]}
                  </h3>
                  
                  {/* Message */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {message || messages[type]}
                  </p>

                  {/* Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;