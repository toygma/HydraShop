"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { useCartStore } from "@/store";
import { toast } from "sonner";

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
  const addItem = useCartStore((state) => state.addItem);
  const itemTotal = useCartStore((state)=>state.totalItems)

  const handleAddCart = () => {
    try {
      addItem(product, 1);
      
      toast.success(`${product.name} sepete eklendi.`, {
        description: `${itemTotal} adet ürün sepetinizde.`,
      });

    } catch (error: any) {
      console.error("Sepete ekleme hatası:", error);
      toast.error("Ürün sepete eklenemedi.", {
        description: error.message || "Bilinmeyen bir hata oluştu.",
      });
    }
  };

  return (
    <Button
      className={cn(
        "w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer",
        className
      )}
      disabled={isOutOfStock || !product}
      onClick={handleAddCart}
    >
      {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
    </Button>
  );
};

export default AddCartButton;
