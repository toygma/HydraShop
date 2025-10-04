"use client"
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="min-h-screen flex justify-center p-6 w-full ">
      <div className="max-w-md w-full">
        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center relative overflow-hidden">
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full blur-3xl opacity-50 -ml-16 -mb-16"></div>
          
          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
            <div className="absolute -top-2  left-0 -right-2 mx-auto w-fit">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Your Cart is Empty
          </h2>
          
          {/* Description */}
          <p className="text-gray-500 mb-8 leading-relaxed">
            You haven’t added any items to your cart yet. 
            Start exploring our amazing products!
          </p>

          {/* Button */}
          <Link href={"/"} className="group w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
            <span>Start Shopping</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Thousands of products are waiting for you
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🚚</div>
            <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">💳</div>
            <p className="text-xs text-gray-600 font-medium">Secure Payment</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">⭐</div>
            <p className="text-xs text-gray-600 font-medium">Quality Products</p>
          </div>
        </div>
      </div>
    </div>
  );
}
