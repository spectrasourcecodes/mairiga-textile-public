import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const ProductCard = ({ product, onQuickAdd, onPreview }) => {
  const { success } = useToast();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onQuickAdd(product);
    success(`${product.name} added to cart!`, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onPreview(product)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x600?text=Product";
          }}
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-accent font-bold text-lg">₦{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">₦s{product.originalPrice}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>{product.rating}</span>
          </div>
          <span>Terjual {product.sold}</span>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleQuickAdd}
          className="w-full bg-primary text-white py-2 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Quick Add
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;