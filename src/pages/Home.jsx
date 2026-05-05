import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../mock/products';
import { categories } from '../mock/categories';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import * as Icons from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeaturedProducts(products.slice(0, 4));
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleQuickAdd = (product) => {
    if (!product) return;
    if (!user.isAuthenticated) {
      navigate('/login');
      return;
    }
    addItem(product);
  };

  const handlePreview = (product) => {
    if (!product) return;
    navigate(`/products/${product.id}`);
  };

  const getCategoryIcon = (iconName) => {
    try {
      const IconComponent = Icons[iconName];
      return IconComponent ? <IconComponent size={32} /> : null;
    } catch (error) {
      return null;
    }
  };

  const heroImages = [
    "https://images.pexels.com/photos/9693881/pexels-photo-9693881.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    "https://images.pexels.com/photos/5239971/pexels-photo-5239971.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImages[0]} 
          alt="Hero"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1200x600?text=Mairiga+Textile";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">Mairiga Textile</h1>
            <p className="text-sm opacity-90">Premium Fabrics, Shoes & Caps</p>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Categories</h2>
          <button 
            onClick={() => navigate('/categories')}
            className="text-accent text-sm font-semibold flex items-center gap-1"
          >
            See All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.filter(c => c.id !== 'all').map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-2 text-accent">
                {getCategoryIcon(category.icon)}
              </div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-accent to-orange-500 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={20} />
            <p className="text-sm font-semibold">FLASH SALE</p>
          </div>
          <h3 className="text-xl font-bold">Up to 50% OFF</h3>
          <p className="text-sm opacity-90">Limited time only!</p>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Featured Products</h2>
          <button 
            onClick={() => navigate('/products')}
            className="text-accent text-sm font-semibold flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-200 rounded-2xl animate-pulse h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={handleQuickAdd}
                onPreview={handlePreview}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;