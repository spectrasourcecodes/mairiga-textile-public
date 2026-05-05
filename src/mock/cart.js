export let cart = [];

export const addToCart = (product, quantity = 1) => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  return cart;
};

export const removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  return cart;
};

export const updateQuantity = (productId, quantity) => {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  return cart;
};

export const clearCart = () => {
  cart = [];
  return cart;
};

export const getCartTotal = () => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};