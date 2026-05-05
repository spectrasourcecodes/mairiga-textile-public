import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Home, Package, Truck, Shield, LogOut, Edit2, Save, X, MapPin, Phone, Mail } from 'lucide-react';
import PasswordResetModal from '../components/PasswordResetModal';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const deliveryRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    homeAddress: user.homeAddress,
    pickupAddress: user.pickupAddress,
    deliveryAddress: user.deliveryAddress
  });

  // Handle highlighting from checkout navigation
  useEffect(() => {
    if (location.state?.highlightSection) {
      setHighlightedSection(location.state.highlightSection);
      // Scroll to the delivery address section
      setTimeout(() => {
        if (deliveryRef.current) {
          deliveryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Remove highlight after 3 seconds
          setTimeout(() => {
            setHighlightedSection(null);
          }, 3000);
        }
      }, 100);
    }
  }, [location]);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    // Show success message (you can add a toast here)
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sections = [
    { 
      title: "Personal Info", 
      icon: User, 
      fields: ["name", "email", "phone"],
      icons: { name: <User size={16} />, email: <Mail size={16} />, phone: <Phone size={16} /> }
    },
    { 
      title: "Home Address", 
      icon: Home, 
      fields: ["homeAddress"],
      icons: { homeAddress: <Home size={16} /> }
    },
    { 
      title: "Pickup Address", 
      icon: Package, 
      fields: ["pickupAddress"],
      icons: { pickupAddress: <Package size={16} /> }
    },
    { 
      title: "Delivery Address", 
      icon: Truck, 
      fields: ["deliveryAddress"],
      icons: { deliveryAddress: <Truck size={16} /> },
      ref: deliveryRef
    }
  ];

  if (!user.isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      >
        <User size={80} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Logged In</h2>
        <p className="text-gray-500 mb-6">Please login to view your profile</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-accent text-white px-6 py-3 rounded-xl font-semibold"
        >
          Login
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-20 px-4"
      >
        <div className="flex justify-between items-center mt-20 mb-6">
          <h1 className="text-2xl font-bold text-primary">My Profile</h1>
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="text-accent font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
          >
            {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="space-y-4">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            const isHighlighted = highlightedSection === section.fields[0];
            
            return (
              <motion.div
                ref={section.ref}
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white rounded-2xl p-4 shadow-sm transition-all duration-300 ${
                  isHighlighted ? 'ring-2 ring-accent shadow-lg scale-[1.02]' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={20} className="text-accent" />
                  <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  {isHighlighted && (
                    <span className="ml-auto text-xs text-accent font-semibold animate-pulse">
                      Editing...
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  {section.fields.map((field) => (
                    <div key={field}>
                      <label className="text-xs text-gray-500 uppercase block mb-1">
                        {field.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="flex items-center gap-2">
                        {section.icons?.[field] && (
                          <span className="text-gray-400">{section.icons[field]}</span>
                        )}
                        {isEditing ? (
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            value={formData[field]}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            className="flex-1 p-2 border border-gray-200 rounded-lg focus:border-accent focus:outline-none"
                            placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                          />
                        ) : (
                          <p className="flex-1 text-gray-800">{formData[field]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Security Settings */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={20} className="text-accent" />
              <h3 className="font-semibold text-gray-800">Security Settings</h3>
            </div>
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="text-accent font-semibold flex items-center gap-2 hover:text-accent/80 transition-colors"
            >
              Change Password
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold mt-4 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Password Reset Modal */}
      <PasswordResetModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default Profile;