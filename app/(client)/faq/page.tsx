"use client"
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'; 

const faqData = [
  {
    id: 1,
    question: "How do I create my account?",
    answer: "You can easily create an account by clicking on the 'Login / Register' button in the top right corner of our website. Just fill in the required information and click the activation link sent to your email address.",
  },
  {
    id: 2,
    question: "How can I track the status of my order?",
    answer: "After logging into your account, you can track the current status of all your orders in the 'My Orders' section. We will also send you an email with a tracking number when your order is shipped.",
  },
  {
    id: 3,
    question: "What is your return and exchange policy?",
    answer: "To return or exchange our products, you must contact us within 14 days of the delivery date. You can find detailed information about our return and exchange conditions on our 'Return Policy' page.",
  },
  {
    id: 4,
    question: "What payment methods are accepted?",
    answer: "We accept credit card (Visa, MasterCard, American Express), debit card, and secure online payment systems. All transactions are protected by industry-standard encryption.",
  },
  {
    id: 5,
    question: "How long does shipping take?",
    answer: "Standard shipping usually takes 3-5 business days. Express shipping options are available at checkout for delivery within 1-2 business days.",
  },
];

// --- FAQ Component ---
const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id:any) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 mt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about our service.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-6">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition duration-300"
            >
              
              <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                onClick={() => toggleFaq(item.id)}
                aria-expanded={openId === item.id}
                aria-controls={`faq-content-${item.id}`}
              >
                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.question}
                </span>
                
                {openId === item.id ? (
                  <ChevronUpIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-indigo-500" />
                )}
              </button>

              <div
                id={`faq-content-${item.id}`}
                role="region"
                aria-labelledby={`faq-heading-${item.id}`}
                className={`
                  transition-all duration-500 ease-in-out 
                  ${openId === item.id ? 'max-h-96 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 p-0'}
                `}
              >
                <p className="text-base text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;