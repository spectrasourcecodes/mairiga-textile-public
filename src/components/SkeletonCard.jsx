import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-3">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded mt-3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;