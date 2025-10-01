import { Product } from "@/sanity.types";
import { useCartStore } from "@/store";
import { formattedPrice } from "@/utils/helper";

interface Props {
  price: any;
  salePrice?: number | null;
  product: Product;
}

const PriceView = ({ price, salePrice, product }: Props) => {
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount(product._id); 
  const isSale = salePrice && salePrice < price;

  if (!price && !salePrice) return null;

  const displayPrice = (basePrice: number) => basePrice * (itemCount || 1);

  return (
    <div className="flex items-center justify-between mt-4">
      {isSale ? (
        <div className="flex items-baseline space-x-3">
          <p className="text-2xl font-extrabold text-red-500">
            {formattedPrice(salePrice ? displayPrice(salePrice) : 0)}
          </p>
          <p className="text-md font-medium text-gray-500 line-through">
            {formattedPrice(price ? displayPrice(price) : 0)}
          </p>
        </div>
      ) : (
        <p className="text-2xl font-extrabold text-black">
          {formattedPrice(price ? displayPrice(price) : 0)}
        </p>
      )}
    </div>
  );
};

export default PriceView;
