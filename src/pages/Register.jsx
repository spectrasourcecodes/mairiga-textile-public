import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Mail, Lock, UserPlus, Eye, EyeOff, Shield, 
  AlertCircle, CheckCircle, Phone, MapPin 
} from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
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
      login(formData.email, formData.password);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
      setIsLoading(false);
    }, 1500);
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 4);
  };

  const passwordStrength = getPasswordStrength();
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/90 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
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
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/70">Join Mairiga Textile today</p>
          </div>

          {/* Registration Form Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full p-3 pl-10 border-2 rounded-xl focus:outline-none transition-all duration-200
                      ${errors.fullName 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-accent'
                      }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.fullName}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
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

              {/* Phone Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-accent focus:outline-none transition-all duration-200"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Delivery Address (Optional)
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-accent focus:outline-none transition-all duration-200"
                    placeholder="Your delivery address"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full p-3 pl-10 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200
                      ${errors.password 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-accent'
                      }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Password strength: <span className="font-semibold">{strengthText[passwordStrength - 1] || 'Very Weak'}</span>
                    </p>
                  </motion.div>
                )}
                
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    className={`w-full p-3 pl-10 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200
                      ${errors.confirmPassword 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-accent'
                      }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => {
                      setAgreeToTerms(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: '' });
                    }}
                    className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent mt-0.5"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <button type="button" className="text-accent hover:underline">Terms of Service</button> and 
                    {' '}<button type="button" className="text-accent hover:underline">Privacy Policy</button>
                  </span>
                </label>
                {errors.terms && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.terms}
                  </motion.p>
                )}
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
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
                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Sign In Instead
            </button>

            {/* Security Note */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield size={14} />
                <span>Your data is protected with 256-bit encryption</span>
                <CheckCircle size={14} className="text-green-500" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="register"
      />
    </>
  );
};

export default Register;