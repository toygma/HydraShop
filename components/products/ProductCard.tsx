"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/sanity.types";
import { Button } from "../ui/button";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import QuantityButtons from "./_components/QuantityButtons";
import PriceView from "./_components/PriceView";

const ProductCart = ({ product }: { product: Product }) => {
  const safeRating = Math.round(product?.rating ?? 0);
  const safeReviewsCount = product?.reviewsCount ?? 0;

  const productUrl = `/product/${product?.slug?.current || ""}`;

  const totalStock =
    product?.variants?.reduce(
      (sum, item) => sum + (item.stockQuantity || 0),
      0
    ) || 0;
  const isOutOfStock = totalStock <= 0;

  const stockText = isOutOfStock ? "Out of stock" : "In stock";

  return (
    <div>
      {product && (
        <div
          key={product._id}
          className="group relative bg-white border border-gray-700 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/50"
        >
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center overflow-hidden relative">
            {product?.images?.[0] && product.images[0].asset && (
              <Link href={productUrl}>
                <Image
                  src={urlFor(product.images[0]).url()}
                  width={500}
                  height={500}
                  alt={product?.name ?? "product image"}
                  className={`w-full h-72 object-cover overflow-hidden transition-transform duration-500 group-hover:scale-105 ${
                    isOutOfStock ? "opacity-50 grayscale" : ""
                  }`}
                />
              </Link>
            )}

            <div
              className={`absolute top-0 right-0 px-3 py-1 font-bold text-xs uppercase tracking-wider ${
                isOutOfStock
                  ? "bg-red-600 text-black"
                  : "bg-green-500 text-gray-900"
              } rounded-bl-lg`}
            >
              {stockText}
            </div>

            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <span className="text-2xl font-extrabold text-white rotate-[-15deg] border-2 border-white px-4 py-2">
                  SOLD OUT
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-5 text-black">
            <h3 className="text-xl font-extrabold text-indigo-400 line-clamp-1">
              {product?.name}
            </h3>
            <div className="flex items-center mt-2">
              {/* Yıldızların rengini dark mode'a uyarla */}
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < safeRating ? "#facc15" : "#374151"} // sarı ve koyu gri
                  stroke={i < safeRating ? "#facc15" : "#4b5563"}
                  className="mr-[2px]"
                />
              ))}
              <span className="text-sm text-gray-400 ml-2">
                ({safeReviewsCount} reviews)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <PriceView price={product?.price} salePrice={product?.salePrice}  /> 
              {!isOutOfStock && (
                <div className="mt-6">
                  <QuantityButtons />
                </div>
              )}
            </div>

            <Button
              className="w-full mt-6 bg-indigo-600 cursor-pointer hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition duration-300 transform shadow-lg hover:shadow-indigo-500/40"
              disabled={isOutOfStock}
              onClick={() => console.log(`Adding ${product?.name} to cart`)}
            >
              {isOutOfStock ? "Sold Out" : "Add to cart"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
