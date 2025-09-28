"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import HomeTabbar from "./_components/HomeTabbar";
import { client } from "@/sanity/lib/client";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

const Products = () => {
  const [selectedTab, setSelectedTab] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const query = `*[_type == "product" && variant == $variant] | order(name asc)`;
  const params = { variant: selectedTab.toLowerCase() };


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <section className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
      {/* Header Section: Title, Subtitle, and View All Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-14 lg:mb-16">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="font-extrabold text-4xl md:text-5xl tracking-tight leading-tight text-gray-900">
            Check out our{" "}
            <span className="text-indigo-600">latest products</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mt-2">
            New Arrivals
          </h2>
        </div>
        <div>
          <Button className="px-6 py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition duration-300">
            View All
          </Button>
        </div>
      </div>

      <div className="py-12 container mx-auto">
        <HomeTabbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.length > 0 ? (
          products?.map((product: Product) => (
            <div key={product?._id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No Products</p>
        )}
      </div>
    </section>
  );
};

export default Products;
