import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { categories } from '../mock/categories';
import * as Icons from 'lucide-react';

const Categories = () => {
  const navigate = useNavigate();

  const getCategoryIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={48} className="text-accent" /> : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      <h1 className="text-2xl font-bold text-primary mb-6">Categories</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.filter(c => c.id !== 'all').map((category, idx) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/products?category=${category.id}`)}
            className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center mb-3">
              {getCategoryIcon(category.icon)}
            </div>
            <h3 className="font-semibold text-gray-800">{category.name}</h3>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;