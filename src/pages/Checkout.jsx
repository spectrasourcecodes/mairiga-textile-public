import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItem from '../components/CartItem';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, removeItem, updateItemQuantity, emptyCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleConfirmOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      emptyCart();
      navigate('/orders');
    }, 2000);
  };

  const handleChangeAddress = () => {
    // Navigate to profile page with address section highlighted
    navigate('/profile', { state: { highlightSection: 'deliveryAddress' } });
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-screen px-4"
      >
        <CheckCircle size={80} className="text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 text-center">Thank you for your purchase</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/cart')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-primary">Checkout</h1>
        </div>
      </div>

      {/* Content with bottom padding for button */}
      <div className="px-4 pb-32">
        {/* Delivery Details */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm mt-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={20} className="text-accent" />
            <h3 className="font-semibold text-gray-800">Delivery Address</h3>
          </div>
          <p className="text-gray-600 text-sm">{user.deliveryAddress}</p>
          <button
            onClick={handleChangeAddress}
            className="text-accent text-sm font-semibold mt-2 hover:text-accent/80 transition-colors flex items-center gap-1"
          >
            Change Address
            <ArrowLeft size={14} className="rotate-180" />
          </button>
        </div>

        {/* Order Items */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck size={20} className="text-accent" />
            <h3 className="font-semibold text-gray-800">Order Items ({cart.length})</h3>
          </div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateItemQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl p-4 mb-40 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={20} className="text-accent" />
            <h3 className="font-semibold text-gray-800">Payment Summary</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₦{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>₦5.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%)</span>
              <span>₦{(cartTotal * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span className="text-accent text-xl">₦{(cartTotal + 5 + cartTotal * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button - Now properly positioned above bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-2xl font-bold text-accent">
              ₦{(cartTotal + 5 + cartTotal * 0.1).toFixed(2)}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirmOrder}
            className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle size={20} />
            Confirm Order
          </motion.button>
          <p className="text-xs text-center text-gray-400 mt-2 mb-20">
            By confirming, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;