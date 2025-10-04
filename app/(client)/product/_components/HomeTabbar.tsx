"use client";
import React from "react";
import { Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const categories = [
  { title: "New Arrivals", value: "new" },
  { title: "Men", value: "men" },
  { title: "Women", value: "women" },
  { title: "T-Shirts", value: "t-shirt" },
  { title: "Streetwear", value: "streetwear" },
  { title: "Accessories", value: "accessories" },
  { title: "Featured", value: "featured" },
];

const HomeTabbar = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-4 overflow-x-auto whitespace-nowrap py-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              onClick={() => setSelectedTab(category.value)}
              key={category.title}
              className={`group relative px-3 py-2 text-sm font-medium text-gray-600 transition duration-150 ease-in-out hover:text-indigo-600 cursor-pointer ${
                 selectedTab === category.value  ? "text-indigo-600" : ""
              }`}
            >
              {category.title}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 transform transition-transform duration-300 ${
                   selectedTab === category.value 
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </button>
          ))}

          <Button onClick={()=>setSelectedTab("All")} className=" px-2 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-indigo-700 hover:text-white cursor-pointer bg-indigo-600">
            <Repeat size={22} />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default HomeTabbar;
