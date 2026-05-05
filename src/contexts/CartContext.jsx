import React, { createContext, useContext, useState, useEffect } from 'react';
import { cart as mockCart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } from '../mock/cart';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCart([...mockCart]);
    updateTotals();
  }, []);

  const updateTotals = () => {
    setCartTotal(getCartTotal());
    setCartCount(getCartCount());
  };

  const addItem = (product, quantity = 1) => {
    const updatedCart = addToCart(product, quantity);
    setCart([...updatedCart]);
    updateTotals();
    return true;
  };

  const removeItem = (productId) => {
    const updatedCart = removeFromCart(productId);
    setCart([...updatedCart]);
    updateTotals();
  };

  const updateItemQuantity = (productId, quantity) => {
    const updatedCart = updateQuantity(productId, quantity);
    setCart([...updatedCart]);
    updateTotals();
  };

  const emptyCart = () => {
    const updatedCart = clearCart();
    setCart([...updatedCart]);
    updateTotals();
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      cartCount,
      addItem,
      removeItem,
      updateItemQuantity,
      emptyCart
    }}>
      {children}
    </CartContext.Provider>
  );
};