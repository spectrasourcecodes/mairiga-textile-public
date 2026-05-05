import React from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock } from 'lucide-react';

const Orders = () => {
  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 89.99,
      status: "Delivered",
      items: 2
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      total: 45.99,
      status: "Processing",
      items: 1
    }
  ];

  const getStatusIcon = (status) => {
    return status === 'Delivered' ? 
      <CheckCircle size={16} className="text-green-500" /> : 
      <Clock size={16} className="text-yellow-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      <h1 className="text-2xl font-bold text-primary mb-6">My Orders</h1>
      
      <div className="space-y-4">
        {mockOrders.map((order, idx) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package size={16} className="text-accent" />
                  <p className="font-semibold text-gray-800">{order.id}</p>
                </div>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(order.status)}
                <span className={`text-xs font-semibold ${
                  order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{order.items} items</p>
              <p className="font-bold text-accent">${order.total}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;