"use client";
import React, { useState } from "react";
import { Bookmark, ShoppingCart, Trash2, X, Eye, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SavedProductsPage = () => {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      name: "Oversized Hoodie",
      price: 899,
      oldPrice: 1199,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
      category: "Üst Giyim",
      stock: true,
      slug: "oversized-hoodie",
      savedDate: "2 gün önce"
    },
    {
      id: 2,
      name: "Slim Fit Kot Pantolon",
      price: 749,
      oldPrice: null,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      category: "Alt Giyim",
      stock: true,
      slug: "slim-fit-kot",
      savedDate: "1 hafta önce"
    },
    {
      id: 3,
      name: "Spor Ayakkabı",
      price: 1899,
      oldPrice: 2499,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
      category: "Ayakkabı",
      stock: true,
      slug: "spor-ayakkabi",
      savedDate: "3 gün önce"
    },
    {
      id: 4,
      name: "Deri Cüzdan",
      price: 499,
      oldPrice: null,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=600&fit=crop",
      category: "Aksesuar",
      stock: false,
      slug: "deri-cuzdan",
      savedDate: "5 gün önce"
    }
  ]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const removeFromSaved = (id: number) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const clearSaved = () => {
    setSavedItems([]);
  };

  if (savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-indigo-100 rounded-full">
            <Bookmark className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kaydedilen Ürün Yok
          </h2>
          <p className="text-gray-600 mb-8">
            Daha sonra bakmak için ürünleri kaydedin ve kolayca erişin!
          </p>
          <Link
            href="/products"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Ürünleri Keşfet
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
                <h1 className="text-3xl font-bold text-gray-900">Kaydedilen Ürünler</h1>
                <p className="text-gray-600 mt-1">{savedItems.length} ürün kaydedildi</p>
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
                  Liste
                </button>
              </div>

              <button
                onClick={clearSaved}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Tümünü Sil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Link href={`/product/${item.slug}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  
                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => removeFromSaved(item.id)}
                      className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-all"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                    <button className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-indigo-50 transition-all">
                      <Share2 className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </div>

                  {!item.stock && (
                    <div className="absolute bottom-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Tükendi
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{item.savedDate}</span>
                  </div>

                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">₺{item.price}</span>
                    {item.oldPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">₺{item.oldPrice}</span>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                          -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    disabled={!item.stock}
                    className={`w-full py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                      item.stock
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {item.stock ? 'Sepete Ekle' : 'Stokta Yok'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-6 hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Link href={`/product/${item.slug}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  {!item.stock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                        Tükendi
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                          {item.category}
                        </span>
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{item.savedDate} kaydedildi</p>
                      </div>
                      <button
                        onClick={() => removeFromSaved(item.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-2xl font-bold text-gray-900">₺{item.price}</span>
                      {item.oldPrice && (
                        <>
                          <span className="text-base text-gray-400 line-through">₺{item.oldPrice}</span>
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                            %{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)} İndirim
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      disabled={!item.stock}
                      className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                        item.stock
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {item.stock ? 'Sepete Ekle' : 'Stokta Yok'}
                    </button>
                    <Link
                      href={`/product/${item.slug}`}
                      className="px-6 py-2.5 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2"
                    >
                      <Eye size={18} />
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProductsPage;