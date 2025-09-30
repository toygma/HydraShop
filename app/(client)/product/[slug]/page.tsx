import { PortableText } from "@portabletext/react";
import { getProductsBySlug } from "@/utils/helper";
import { notFound } from "next/navigation";
import React from "react";
import ImageView from "../_components/ImageView";
import { Product } from "@/sanity.types";
import PriceView from "@/components/products/_components/PriceView";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, BoxIcon, Share } from "lucide-react";
import ProductCharacteristics from "@/components/products/_components/ProductCharacteristics";
import { productActions } from "../_components/product-action";

const SingleProductPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const product: Product = await getProductsBySlug(slug);

  if (!product) {
    return notFound();
  }

  const { images } = product;

  return (
    <div className="py-10 flex flex-col md:flex-row gap-10 container mx-auto min-h-screen mt-32">
      <div className="flex w-full gap-10">
        <div className="w-full md:w-1/2">
          <ImageView images={images} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6 p-4 md:p-0">
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              {product?.name}
            </h2>
            <PriceView price={product?.price} salePrice={product?.salePrice} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600 leading-relaxed text-base">
              <PortableText value={product?.description || []} />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              className="flex-grow bg-indigo-600 h-12 text-lg font-semibold 
                         cursor-pointer hover:bg-indigo-700 
                         transition duration-300 transform shadow-md 
                         hover:shadow-indigo-500/40"
            >
              Add to Cart
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 px-4 border-gray-300 text-gray-700 
                         hover:bg-gray-50 transition duration-300 cursor-pointer"
              aria-label="Add to Wishlist"
            >
              <Heart className="w-5 h-5 text-red-500 " />
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto h-12 px-4 border-gray-300 text-gray-700 
                         hover:bg-gray-50 transition duration-300 cursor-pointer"
              aria-label="Add to save"
            >
              <Bookmark className="w-5 h-5 text-gray-500  " />
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
                      <p className="font-medium tracking-wide">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
