"use client";
import React from "react";
import PriceView from "@/app/(client)/product/_components/PriceView";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark } from "lucide-react";
import ProductCharacteristics from "@/app/(client)/product/_components/ProductCharacteristics";
import AddCartButton from "@/app/(client)/product/_components/AddCartButton";
import { Product } from "@/sanity.types";
import ImageView from "./ImageView";
import { productActions } from "./product-action";
import TabDetail from "./TabDetail";
import { useWishlistStore } from "@/zustand/wishlistStore";
import { useSavedStore } from "@/zustand/saveStore";

const ProductDetail = ({ product }: { product: Product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { addToSaved, removeFromSaved, isInSaved } = useSavedStore();

  const inWishlist = isInWishlist(product._id);
  const inSaved = isInSaved(product._id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const toggleSaved = () => {
    if (inSaved) {
      removeFromSaved(product._id);
    } else {
      addToSaved(product);
    }
  };

  const { images } = product;

  return (
    <>
      <div className="py-10 flex flex-col md:flex-row gap-10 container mx-auto mt-32 mb-12 border-b">
        <div className="flex w-full gap-10">
          <div className="w-full md:w-1/2">
            <ImageView images={images} />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-6 p-4 md:p-0">
            <div className="space-y-2 border-b pb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                {product?.name}
              </h2>
              <PriceView
                price={product?.price}
                salePrice={product?.salePrice}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <AddCartButton className="mt-0 h-[5vh]!" product={product} />

              <Button
                onClick={toggleWishlist}
                variant="outline"
                className={`w-full sm:w-auto h-12 px-4 border-gray-300 transition duration-300 cursor-pointer ${
                  isInWishlist(product._id)
                    ? "bg-red-50 border-red-300 hover:bg-red-100"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Add to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isInWishlist(product._id)
                      ? "fill-red-500 text-red-500"
                      : "text-red-500"
                  }`}
                />
              </Button>
              <Button
                onClick={toggleSaved}
                variant="outline"
                className={`w-full sm:w-auto h-12 px-4 border-gray-300 transition duration-300 cursor-pointer ${
                  inSaved
                    ? "bg-indigo-50 border-indigo-300 hover:bg-indigo-100"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                aria-label="Add to save"
              >
                <Bookmark
                  className={`w-5 h-5 transition-all ${
                    inSaved
                      ? "fill-indigo-600 text-indigo-600"
                      : "text-gray-500"
                  }`}
                />
              </Button>
            </div>

            <div className="mt-4 text-sm text-gray-500 border-t pt-4">
              <p className="font-medium">
                🚚 Fast Shipping: Delivered in 2-3 business days.
              </p>
              <p className="font-medium">
                🔄 Easy Returns: 30-day return policy.
              </p>
            </div>
            <div className="flex flex-wrap flex-col justify-between gap-4 pt-6 pb-4 border-t border-gray-200">
              <ProductCharacteristics product={product} />

              <div className="flex flex-wrap items-center gap-6 mt-2 text-gray-600">
                <div className="flex items-center gap-2 text-sm transition-colors duration-200 group hover:text-red-600">
                  {productActions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-1.5 py-1 px-2 rounded-lg border boder-gray-200 text-gray-500 transition-all duration-200
                   hover:text-indigo-600 hover:bg-indigo-50"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        <p className="font-medium tracking-wide">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TabDetail product={product} />
    </>
  );
};

export default ProductDetail;
