"use client";
import React from "react";
import fashion from "@/public/section.jpg";
import Image from "next/image";

const SectionAbout = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wider text-rose-600 uppercase">
                About Us
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover Your Style,
              <span className="block text-rose-600 mt-2">
                Live Your Fashion
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              We bring modern fashion together with timeless elegance. 
              Each piece is carefully selected to reflect your unique style.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              With high-quality fabrics, contemporary designs, and comfortable cuts, 
              we add value to your wardrobe. Because fashion is not just about clothing, 
              it’s about expressing yourself.
            </p>
            
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-rose-600">500+</div>
                <div className="text-sm text-gray-600">Product Variants</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-rose-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-rose-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
            
            <div className="pt-4">
              <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Explore Collection
              </button>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative order-1 md:order-2 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-400 to-pink-300 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src={fashion}
                alt="Fashion Collection"
                width={600}
                height={700}
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAbout;
