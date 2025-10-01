"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { useCartStore } from "@/store";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

interface QuantityButtonsProps {
  product: Product;
  isOutOfStock?: boolean;
  className?: string;
}

const QuantityButtons = ({
  product,
  className,
  isOutOfStock = false,
}: QuantityButtonsProps) => {
  const { addItem, getItemCount, removeItem } = useCartStore();
  const itemCount = getItemCount(product?._id);
  console.log("🚀 ~ QuantityButtons ~ itemCount:", itemCount);

  const handleRemoveProduct = () => {
    if (!product?._id) {
      toast.error("Product information not found");
      return;
    }

    try {
      removeItem(product._id);

      if (itemCount > 1) {
        toast.success(
          `${product.name || "Product"} Quantity Decreased Successfully!`,
          {
            description:
              itemCount > 1
                ? `There are ${itemCount - 1} items left in the cart`
                : "Your cart is now empty",
          }
        );
      } else {
        toast.success(
          `${product?.name?.substring(0, 12)} removed successfully !`
        );
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error("Product could not be removed from the cart");
    }
  };

  const handleAddProduct = () => {
    if (!product) {
      toast.error("Product information not found");
      return;
    }

    try {
      addItem(product);
      toast.success(`${product.name || "Product"} added to cart`, {
        description: `There are ${itemCount + 1} items in the cart`,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Product could not be added to the cart");
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        className="w-7 h-7 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Reduce product quantity"
        disabled={isOutOfStock}
        onClick={handleRemoveProduct}
      >
        <Minus size={16} />
      </Button>

      <span className="font-bold w-8 text-center text-lg text-black dark:text-white transition-colors duration-200">
        {itemCount}
      </span>

      <Button
        variant="default"
        size="icon"
        className="w-7 h-7 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Increase product quantity"
        disabled={isOutOfStock}
        onClick={handleAddProduct}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QuantityButtons;
