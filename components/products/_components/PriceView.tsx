import { formattedPrice } from "@/utils/helper";
import React from "react";

const PriceView = ({ price,salePrice }: any) => {
  const isSale =
    salePrice && salePrice < (price as number);
    

  if (!price && !salePrice) {
    return null;
  }
  return (
    <div className="flex items-center justify-between">
      {isSale ? (
        <div className="flex items-baseline space-x-3 mt-4">
          <p className="text-2xl font-extrabold text-red-500">
            {formattedPrice(salePrice)}
          </p>
          <p className="text-md font-medium text-gray-500 line-through">
            {formattedPrice(price)}
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-2xl font-extrabold text-black">
            {formattedPrice(price)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceView;
