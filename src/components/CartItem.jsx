import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { success, error } = useToast();

  const handleRemove = () => {
    onRemove(item.id);
    success(`₦{item.name} removed from cart`, 2000);
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
    if (newQuantity > item.quantity) {
      success(`Increased ₦{item.name} quantity to ₦{newQuantity}`, 1500);
    } else if (newQuantity < item.quantity) {
      success(`Decreased ₦{item.name} quantity to ₦{newQuantity}`, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 bg-white rounded-2xl mb-3 shadow-sm"
    >
      <img 
        src={item.image} 
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/100x100?text=Product";
        }}
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
        <p className="text-accent font-bold text-lg">₦{item.price}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-semibold">{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <button
            onClick={handleRemove}
            className="text-red-500 text-sm font-semibold flex items-center gap-1 hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;