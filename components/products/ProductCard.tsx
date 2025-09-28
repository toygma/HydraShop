"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/sanity.types";
import { Button } from "../ui/button";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formattedPrice } from "@/utils/helper";

const ProductCart = ({ product }: { product: Product }) => {
  const safeRating = Math.round(product?.rating ?? 0);
  const safeReviewsCount = product?.reviewsCount ?? 0;

  const productUrl = `/product/${product?.slug?.current ?? ""}`;

  return (
    <div>
      {product && (
        <div
          key={product._id}
          className="group relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
        >
          {/* Product Image */}
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
            {product?.images?.[0] && product.images[0].asset && (
              <Link href={productUrl}>
                <Image
                  src={urlFor(product.images[0]).url()}
                  width={500}
                  height={500}
                  alt={product?.name ?? "product image"}
                  className="w-full h-72 object-cover overflow-hidden transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {product?.name}
            </h3>
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < safeRating ? "#fbbf24" : "#e5e7eb"}
                  stroke={i < safeRating ? "#fbbf24" : "#a1a1aa"}
                  className="mr-[2px]"
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                ({safeReviewsCount})
              </span>
            </div>

            <div>
              {product?.salePrice &&
              product?.salePrice < (product?.price as number) ? (
                <div className="flex items-baseline space-x-2 mt-3">
                  <p className="text-xl font-extrabold text-red-600">
                    {formattedPrice(product.salePrice)}
                  </p>

                  <p className="text-sm font-medium text-gray-400 line-through">
                    {formattedPrice(product.price)}
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-xl font-bold text-gray-900">
                    {formattedPrice(product?.price)}
                  </p>
                </div>
              )}
            </div>
            <Button
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition duration-300 transform group-hover:scale-[1.01] cursor-pointer"
              onClick={() => console.log(`Adding ${product?.name} to cart`)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
