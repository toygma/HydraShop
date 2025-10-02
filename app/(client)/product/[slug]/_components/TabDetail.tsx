"use client";
import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import { Product } from "@/sanity.types";
import Reviews from "./Reviews";

const data = [
  { title: "Description", value: "description" },
  { title: "Reviews", value: "reviews" },
];

const TabDetail = ({ product }: { product: Product }) => {
  const [selectedTab, setSelectedTab] = useState("description");

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="flex items-center gap-4">
        {data.map((item) => (
          <button
            onClick={() => setSelectedTab(item.value)}
            key={item.title}
            className={`group relative px-3 py-2 text-sm font-medium text-gray-600 transition duration-150 ease-in-out hover:text-indigo-600 cursor-pointer ${
              selectedTab === item.value ? "text-indigo-600" : ""
            }`}
          >
            {item.title}
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 transform transition-transform duration-300 ${
                selectedTab === item.value
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            ></span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full text-gray-700 leading-relaxed text-base flex flex-col container mx-auto mt-12 gap-4">
        {selectedTab === "description" && (
          <PortableText value={product?.description || []} />
        )}
        {selectedTab === "reviews" && (
          <Reviews product={product}/>
        )}
      </div>
    </div>
  );
};

export default TabDetail;
