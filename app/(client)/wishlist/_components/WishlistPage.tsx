"use client";
import React, { useState } from "react";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium Denim Ceket",
      price: 1299,
      oldPrice: 1799,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
      stock: true,
      slug: "premium-denim-ceket"
    },
    {
      id: 2,
      name: "Klasik Beyaz Gömlek",
      price: 599,
      oldPrice: 899,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop",
      stock: true,
      slug: "klasik-beyaz-gomlek"
    },
    {
      id: 3,
      name: "Vintage Deri Çanta",
      price: 2499,
      oldPrice: null,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop",
      stock: false,
      slug: "vintage-deri-canta"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-rose-100 rounded-full">
            <Heart className="w-12 h-12 text-rose-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Beğeni Listeniz Boş
          </h2>
          <p className="text-gray-600 mb-8">
            Henüz beğendiğiniz ürün bulunmuyor. Ürünlere göz atın ve favorilerinizi ekleyin!
          </p>
          <Link
            href="/products"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 p-3 rounded-xl">
                <Heart className="w-8 h-8 text-rose-600 fill-rose-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Beğenilen Ürünler</h1>
                <p className="text-gray-600 mt-1">{wishlistItems.length} ürün listenizde</p>
              </div>
            </div>
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              <Trash2 size={18} />
              Tümünü Temizle
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <Link href={`/product/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-all duration-300 z-10"
                >
                  <X className="w-5 h-5 text-red-600" />
                </button>

                {/* Stock Badge */}
                {!item.stock && (
                  <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Stokta Yok
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-rose-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₺{item.price}
                  </span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₺{item.oldPrice}
                    </span>
                  )}
                  {item.oldPrice && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      %{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)} İndirim
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!item.stock}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    item.stock
                      ? 'bg-rose-600 hover:bg-rose-700 text-white transform hover:scale-105'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={18} />
                  <span>{item.stock ? 'Sepete Ekle' : 'Stokta Yok'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;