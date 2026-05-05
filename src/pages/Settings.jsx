import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Globe, Smartphone, ChevronRight } from 'lucide-react';

const Settings = () => {
  const settingsOptions = [
    { icon: Bell, label: "Notifications", type: "toggle" },
    { icon: Moon, label: "Dark Mode", type: "toggle" },
    { icon: Globe, label: "Language", value: "English" },
    { icon: Smartphone, label: "App Version", value: "1.0.0" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      <h1 className="text-2xl font-bold text-primary mb-6">Settings</h1>
      
      <div className="space-y-3">
        {settingsOptions.map((option, idx) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-accent" />
                <span className="font-medium text-gray-800">{option.label}</span>
              </div>
              {option.type === 'toggle' ? (
                <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{option.value}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Settings;