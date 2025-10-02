import { Product } from "@/sanity.types";
import { useCartStore } from "@/store";
import { formattedPrice } from "@/utils/helper";

interface Props {
  price?: any;
  salePrice?: number | null;
  product?: Product;
}

const PriceView = ({ price, salePrice, product }: Props) => {
  const isSale = salePrice && salePrice < price;
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalItems = useCartStore((state) => state.totalItems);

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
