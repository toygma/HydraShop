"use client";
import Image from "next/image";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { formattedPrice, isOutStockControl } from "@/utils/helper";
import { ShoppingBag } from "lucide-react";
import { toPlainText } from "next-sanity";
import AddCartButton from "@/app/(client)/product/_components/AddCartButton";

interface Props {
  product: Product;
}

const CategoryMain = ({ product }: Props) => {
  const shortDescription = product?.description
    ? toPlainText(product.description).slice(0, 50) + "..."
    : "";

  return (
    <div className="group bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer">
      <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg h-48 mb-4 flex items-center justify-center">
        {product?.images?.[0]?.asset ? (
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product?.name ?? "product image"}
            width={500}
            height={500}
            className={`object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full`}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
        {product.name}
      </h3>

      <p className="text-slate-600 text-sm mb-4">{shortDescription}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-slate-900">
          {formattedPrice(product.price)}
        </span>
        <AddCartButton
          product={product}
          isOutOfStock={isOutStockControl(product)}
          className="bg-slate-900 hover:bg-slate-800 rounded-lg w-fit"
        />
      </div>
    </div>
  );
};

export default CategoryMain;
