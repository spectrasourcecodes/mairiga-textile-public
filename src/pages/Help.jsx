import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, ChevronRight } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      q: "How do I track my order?",
      a: "You can track your order from the Orders section in your profile."
    },
    {
      q: "What is your return policy?",
      a: "We offer 30-day returns for unused items in original packaging."
    },
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-5 business days."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 px-4"
    >
      <h1 className="text-2xl font-bold text-primary mb-6">Help Center</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <HelpCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-accent/10 rounded-2xl p-6 text-center">
        <MessageCircle size={40} className="text-accent mx-auto mb-3" />
        <h3 className="font-semibold text-gray-800 mb-2">Need more help?</h3>
        <p className="text-gray-600 text-sm mb-3">Contact our support team</p>
        <button className="bg-accent text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 mx-auto">
          Contact Us <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default Help;