import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import { products } from '../mock/products';
import { categories } from '../mock/categories';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    setDisplayProducts(filteredProducts);
  }, [filteredProducts]);

  const handleQuickAdd = (product) => {
    if (!user.isAuthenticated) {
      navigate('/login');
      return;
    }
    addItem(product);
  };

  const handlePreview = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <div className="sticky top-0 bg-background z-10 px-4 pt-4 pb-2">
        <SearchBar onSearch={setSearchQuery} />
        <div className="mt-4">
          <FilterChips 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 text-sm">{displayProducts.length} products found</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-gray-200 rounded-2xl animate-pulse h-64"></div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-2 gap-4">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </AnimatePresence>
        )}

        {!loading && displayProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Products;