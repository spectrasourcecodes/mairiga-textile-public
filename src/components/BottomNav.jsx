import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/products', icon: ShoppingBag, label: 'Products' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 safe-bottom z-50"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' }}
    >
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex-1 flex flex-col items-center justify-center relative"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <Icon 
                  size={24} 
                  className={isActive ? 'text-accent' : 'text-gray-500'}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className={`text-xs mt-1 ${isActive ? 'text-accent font-semibold' : 'text-gray-500'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNav"
                    className="absolute -top-3 w-8 h-1 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;