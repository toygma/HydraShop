"use client";
import React from "react";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/zustand/wishlistStore";
import ProductCard from "../../product/_components/ProductCard";

const WishlistPage = () => {
  const { clearWishlist, wishlist } = useWishlistStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-rose-100 rounded-full">
            <Heart className="w-12 h-12 text-rose-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            You haven’t added any products yet. Browse items and add your favorites!
          </p>
          <Link
            href="/"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 p-3 rounded-xl">
                <Heart className="w-8 h-8 text-rose-600 fill-rose-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Liked Products</h1>
                <p className="text-gray-600 mt-1">{wishlist.length} items in your list</p>
              </div>
            </div>
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
