import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { debounce } from '../utils/debounce';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = debounce((value) => {
    onSearch(value);
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full px-5 py-3 pl-12 bg-white rounded-2xl border border-gray-200 focus:border-accent focus:outline-none shadow-sm"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <X size={18} />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;