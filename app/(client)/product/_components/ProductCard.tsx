"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/sanity.types";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "./PriceView";
import AddCartButton from "./AddCartButton";
import { Badge } from "@/components/ui/badge";
import StarRatings from "react-star-ratings";
import { isOutStockControl } from "@/utils/helper";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const safeRating = Math.round(product?.rating ?? 0);
  const safeReviewsCount = product?.reviewsCount ?? 0;
  const productUrl = `/product/${product?.slug?.current || ""}`;

  if (!product) return null;

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 w-full">
      {/* Image Container */}
      <Link href={productUrl} className="block relative">
        <div className="relative w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          {product?.images?.[0]?.asset ? (
            <Image
              src={urlFor(product.images[0]).url()}
              fill
              alt={product?.name ?? "product image"}
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                isOutOfStock ? "opacity-40 grayscale" : ""
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
          )}

          {/* Stock Badge */}
          <Badge
            variant={isOutOfStock ? "destructive" : "default"}
            className={`absolute top-3 right-3 px-3 py-1 font-semibold text-xs uppercase tracking-wider shadow-lg ${
              isOutOfStock
                ? "bg-red-600 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-500 text-white"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </Badge>

          {/* Sold Out Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="relative">
                <span className="block text-3xl font-black text-white rotate-[-12deg] border-4 border-white px-6 py-3 bg-red-600/20 backdrop-blur-sm shadow-2xl">
                  SOLD OUT
                </span>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Link href={productUrl}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 min-h-[3.5rem]">
            {product?.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <StarRatings
              rating={product?.rating}
              starRatedColor="#facc15"
              starEmptyColor="#e5e7eb"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
              name="rating"
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {safeRating > 0 ? `${safeRating}.0` : "No reviews"}
            {safeReviewsCount > 0 && ` (${safeReviewsCount})`}
          </span>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <PriceView price={product?.price} salePrice={product?.salePrice} />
        </div>

        {/* Add to Cart Button */}
        <AddCartButton
          isOutOfStock={isOutStockControl(product)}
          product={product}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default ProductCard;
