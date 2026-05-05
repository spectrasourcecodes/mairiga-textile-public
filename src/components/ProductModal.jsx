import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { success } = useToast();

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

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    success(`Added ${quantity} × ${product.name} to cart`, 2500);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50"
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="relative">
              {/* Handle bar */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4"></div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <X size={18} />
              </button>
              
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x600?text=Product";
                  }}
                />
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">Terjual {product.sold}+</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-accent">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through ml-2">${product.originalPrice}</span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={22} />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;