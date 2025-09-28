"use client";
import React from "react";
import { Button } from "../ui/button"; // Tailwind CSS component library button
import Image from "next/image"; // Next.js Image component for optimization
import { Star } from "lucide-react"; // Lucide React icon for stars

// -- Product Images (Adjust paths if necessary) --
import hatImage1 from "@/public/products/hat.jpg";
import hatImage2 from "@/public/products/hat1.jpg"; // Corrected from ha1.jpg
import manTshirt1 from "@/public/products/man1tshirt.jpg";
import manTshirt2 from "@/public/products/mantshirt.jpg";
import streetwear1 from "@/public/products/streetwear.jpg";
import streetwear2 from "@/public/products/streetwear1.jpg";
import sunglasses1 from "@/public/products/sung.jpg";
import sunglasses2 from "@/public/products/sung1.jpg";
import tShirtBase from "@/public/products/t-shirt.jpg";
import womanTshirt1 from "@/public/products/woman1.jpg";

// -- Product Data (with Rating and Reviews) --
const productsData = [
  {
    id: 1,
    title: "Classic Black Cap",
    price: 19.99,
    category: "Headwear",
    rating: 4.5,
    reviews: 120,
    image: hatImage1,
  },
  {
    id: 2,
    title: "Gray Knit Beanie",
    price: 24.5,
    category: "Headwear",
    rating: 3.9,
    reviews: 45,
    image: hatImage2,
  },
  {
    id: 3,
    title: "Men's Graphic Tee (Blue)",
    price: 35.0,
    category: "T-Shirt",
    rating: 4.8,
    reviews: 210,
    image: manTshirt1,
  },
  {
    id: 4,
    title: "Vintage Logo T-Shirt",
    price: 39.99,
    category: "T-Shirt",
    rating: 4.2,
    reviews: 78,
    image: manTshirt2,
  },
  {
    id: 5,
    title: "Urban Utility Vest",
    price: 85.0,
    category: "Streetwear",
    rating: 4.1,
    reviews: 32,
    image: streetwear1,
  },
  {
    id: 6,
    title: "Oversize Hoodie (Street)",
    price: 72.0,
    category: "Streetwear",
    rating: 5.0,
    reviews: 15,
    image: streetwear2,
  },
  {
    id: 7,
    title: "Aviator Sunglasses",
    price: 49.99,
    category: "Accessories",
    rating: 4.7,
    reviews: 95,
    image: sunglasses1,
  },
  {
    id: 8,
    title: "Round Frame Sunglasses",
    price: 55.0,
    category: "Accessories",
    rating: 3.5,
    reviews: 12,
    image: sunglasses2,
  },
  {
    id: 9,
    title: "Basic White Crewneck",
    price: 29.9,
    category: "T-Shirt",
    rating: 4.6,
    reviews: 350,
    image: tShirtBase,
  },
  {
    id: 10,
    title: "Women's Fitted Top",
    price: 32.0,
    category: "T-Shirt",
    rating: 4.4,
    reviews: 62,
    image: womanTshirt1,
  },
];

const Products = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
      {/* Header Section: Title, Subtitle, and View All Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-14 lg:mb-16">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="font-extrabold text-4xl md:text-5xl tracking-tight leading-tight text-gray-900">
            Check out our <span className="text-indigo-600">latest products</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mt-2">New Arrivals</h2>
        </div>
        <div>
          <Button className="px-6 py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition duration-300">
            View All
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={400} // Increased for better quality on various screen sizes
                height={400} // Increased for better quality
                layout="responsive" // Ensures image scales responsively
                objectFit="cover" // Covers the area without distortion
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center mt-2">
                {/* Render stars dynamically based on rating */}
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "#fbbf24" : "#e5e7eb"} // Filled or empty star color
                    stroke={i < Math.floor(product.rating) ? "#fbbf24" : "#a1a1aa"} // Stroke color
                    className="mr-[2px]"
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <p className="text-xl font-bold text-gray-900 mt-3">
                ${product.price.toFixed(2)}
              </p>

              {/* Add to Cart Button */}
              <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition duration-300 transform group-hover:scale-[1.01]">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;