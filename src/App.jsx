import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { ToastContainer } from './components/Toast';
import BottomNav from './components/BottomNav';
import HamburgerMenu from './components/HamburgerMenu';
import InstallAppPopup from './components/InstallAppPopup';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Help from './pages/Help';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please refresh the page</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-white px-6 py-2 rounded-lg"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const location = useLocation();
  const hideNavPaths = ['/login', '/register'];
  const showBottomNav = !hideNavPaths.includes(location.pathname);
  const { toasts, removeToast } = useToast(); // Now this is defined

  return (
    <ErrorBoundary>
      {showBottomNav && <HamburgerMenu />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </AnimatePresence>
      {showBottomNav && <BottomNav />}
      <InstallAppPopup />
      <PWAUpdatePrompt />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Router 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;