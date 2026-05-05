import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const PasswordResetModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset form when modal opens
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
      setShowSuccess(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getPasswordStrength = (password) => {
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

  const getStrengthColor = (strength) => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500'
    ];
    return colors[strength] || 'bg-gray-200';
  };

  const getStrengthText = (strength) => {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return texts[strength] || 'Enter password';
  };

  const validateForm = () => {
    const newErrors = {};

    // Current password validation
    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // New password validation
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
    } else if (!/(?=.*[^A-Za-z0-9])/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if new password is same as current (basic check - in real app would check against stored password)
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = 'New password cannot be the same as current password';
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
    
    // Simulate API call for password change
    setTimeout(() => {
      // Mock validation of current password
      // In a real app, this would verify against the backend
      if (currentPassword !== 'password123') {
        setErrors({ currentPassword: 'Current password is incorrect' });
        setIsLoading(false);
        return;
      }
      
      setShowSuccess(true);
      setIsLoading(false);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 2000);
    }, 1500);
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={24} />
                      <h3 className="text-xl font-bold">Change Password</h3>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-white/80 mt-1">
                    Enter your current password and choose a new one
                  </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <div className="m-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-500" />
                    <p className="text-green-700 text-sm">Password changed successfully!</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          if (errors.currentPassword) setErrors({ ...errors, currentPassword: '' });
                        }}
                        className={`w-full p-3 pl-10 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200
                          ${errors.currentPassword 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-gray-200 focus:border-accent'
                          }`}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                        }}
                        className={`w-full p-3 pl-10 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200
                          ${errors.newPassword 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-gray-200 focus:border-accent'
                          }`}
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                i < passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          Password strength: <span className="font-semibold">{getStrengthText(passwordStrength)}</span>
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {newPassword.length >= 8 ? <CheckCircle size={10} className="text-green-500" /> : <AlertCircle size={10} />}
                            At least 8 characters
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {/[A-Z]/.test(newPassword) ? <CheckCircle size={10} className="text-green-500" /> : <AlertCircle size={10} />}
                            At least one uppercase letter
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {/[a-z]/.test(newPassword) ? <CheckCircle size={10} className="text-green-500" /> : <AlertCircle size={10} />}
                            At least one lowercase letter
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {/[0-9]/.test(newPassword) ? <CheckCircle size={10} className="text-green-500" /> : <AlertCircle size={10} />}
                            At least one number
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {/[^A-Za-z0-9]/.test(newPassword) ? <CheckCircle size={10} className="text-green-500" /> : <AlertCircle size={10} />}
                            At least one special character
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                        }}
                        className={`w-full p-3 pl-10 pr-12 border-2 rounded-xl focus:outline-none transition-all duration-200
                          ${errors.confirmPassword 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-gray-200 focus:border-accent'
                          }`}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Security Tips */}
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <Shield size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-blue-800">Password Security Tips:</p>
                        <ul className="text-xs text-blue-700 mt-1 space-y-1">
                          <li>• Use a unique password not used on other sites</li>
                          <li>• Avoid common words or personal information</li>
                          <li>• Consider using a password manager</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`flex-1 bg-accent text-white py-3 rounded-xl font-semibold transition-all duration-200
                        ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent/90 shadow-lg'}`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Changing...
                        </div>
                      ) : (
                        'Change Password'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PasswordResetModal;