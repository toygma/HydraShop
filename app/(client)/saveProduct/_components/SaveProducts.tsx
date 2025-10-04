"use client";
import React, { useState } from "react";
import { Bookmark, ShoppingCart, Trash2, X, Eye, Share2 } from "lucide-react";
import Link from "next/link";
import { useSavedStore } from "@/zustand/saveStore";
import ProductCard from "../../product/_components/ProductCard";

const SavedProductsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { clearSaved, savedProducts } = useSavedStore();

  if (savedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full">
            <Bookmark className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Saved Products
          </h2>
          <p className="text-gray-600 mb-8">
            Save products to view them later and access them easily!
          </p>
          <Link
            href="/products"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Bookmark className="w-8 h-8 text-indigo-600 fill-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Saved Products</h1>
                <p className="text-gray-600 mt-1">{savedProducts.length} items saved</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  List
                </button>
              </div>

              <button
                onClick={clearSaved}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProducts.map((item) => (
             <ProductCard product={item} key={item._id}/>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {savedProducts.map((item) => (
             <ProductCard product={item} key={item._id}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProductsPage;

