import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, LogIn, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        setShowSuccess(true);
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2500);
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
      setIsLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-4"
            >
              <Shield size={40} className="text-accent" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to continue shopping</p>
          </div>

          {/* Login Form Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"
              >
                <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm">{errors.general}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Email Address
                </label>
                <div className={`relative transition-all duration-200 ${errors.email ? 'mb-1' : ''}`}>
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full p-3 pl-10 border-2 rounded-xl focus:outline-none transition-all duration-200
                      ${errors.email 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-accent'
                      }`}
                    placeholder="john.doe@example.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full p-3 pl-10 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200
                      ${errors.password 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-accent'
                      }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-accent text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-200
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent/90 shadow-lg hover:shadow-xl'}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to Mairiga?</span>
              </div>
            </div>

            {/* Register Link */}
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Create New Account
            </button>

            {/* Security Note */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield size={14} />
                <span>Secure login with 256-bit encryption</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="login"
      />
    </>
  );
};

export default Login;