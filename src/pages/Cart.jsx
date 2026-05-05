import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, removeItem, updateItemQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <ShoppingCart size={80} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-center">Add some products to your cart</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-accent text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          Browse Products <ArrowRight size={18} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-primary">My Cart ({cart.length})</h1>
        </div>
      </div>

      {/* Cart Items with padding for bottom button */}
      <div className="px-4 pb-32 mb-20">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateItemQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 mb-20 shadow-lg z-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Total:</span>
            <span className="text-2xl font-bold text-accent">₦{cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;