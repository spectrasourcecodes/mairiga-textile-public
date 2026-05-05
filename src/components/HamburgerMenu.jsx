import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FolderOpen, Package, Settings, HelpCircle, LayoutDashboard } from 'lucide-react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { path: '/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/orders', icon: Package, label: 'Orders' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/help', icon: HelpCircle, label: 'Help' }
  ];

  const handleNavigation = (path) => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <Menu size={20} className="text-gray-800" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />
        )}
      </AnimatePresence>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl"
          >
            <div className="p-6 pt-16">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>
              
              <div className="mb-8 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutDashboard size={28} className="text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Menu</h2>
                </div>
                <p className="text-gray-500 text-sm mt-1">Browse options</p>
              </div>
              
              <div className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <Icon size={24} className="text-accent" />
                      <span className="text-gray-800 font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;