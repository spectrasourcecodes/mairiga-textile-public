import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const FilterChips = ({ categories, selectedCategory, onSelect }) => {
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === category.id
              ? 'bg-accent text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200'
          }`}
        >
          {getIcon(category.icon)}
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterChips;