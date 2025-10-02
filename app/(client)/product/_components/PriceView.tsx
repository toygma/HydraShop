"use client";
import { formattedPrice } from "@/utils/helper";

interface Props {
  price?: any;
  salePrice?: number | null;
}

const PriceView = ({ price, salePrice }: Props) => {
  const isSale = salePrice && salePrice < price;

  if (!price && !salePrice) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      {isSale ? (
        <div className="flex items-baseline space-x-3">
          <p className="text-2xl font-extrabold text-red-500">
            {formattedPrice(salePrice)}
          </p>
          <p className="text-md font-medium text-gray-500 line-through">
            {formattedPrice(price)}
          </p>
        </div>
      ) : (
        <p className="text-2xl font-extrabold text-black">
          {formattedPrice(price)}
        </p>
      )}
    </div>
  );
};

export default PriceView;
