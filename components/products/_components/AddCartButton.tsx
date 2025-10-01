"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { useCartStore } from "@/store";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface AddCartButtonProps {
  product: Product;
  isOutOfStock?: boolean;
  className?: string;
  showIcon?: boolean;
}

const AddCartButton = ({
  product,
  isOutOfStock = false,
  className,
}: AddCartButtonProps) => {
  const { addItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);

  const handleAddToCart = () => {
    if (!product) {
      toast.error("Product information not found");
      return;
    }

    try {
      addItem(product);
      toast.success(`${product.name || "Product"} added to cart`, {
        description:
          itemCount > 0
            ? `There are ${itemCount + 1} items in the cart`
            : undefined,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Product could not be added to the cart");
    }
  };

  return (
    <Button
      className={cn(
        "w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer",
        className
      )}
      disabled={isOutOfStock || !product}
      onClick={handleAddToCart}
    >
      {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
    </Button>
  );
};

export default AddCartButton;
