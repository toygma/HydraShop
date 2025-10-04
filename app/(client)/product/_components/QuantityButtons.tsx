"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartItem, useCartStore } from "@/zustand/store";
import { Minus, Plus } from "lucide-react";

interface QuantityButtonsProps {
  isOutOfStock?: boolean;
  className?: string;
  item: CartItem;
}

const QuantityButtons = ({
  item,
  className,
  isOutOfStock = false,
}: QuantityButtonsProps) => {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const handleDecrease = () => {
    decreaseQuantity(item._id);
  };

  const handleIncrease = () => {
    increaseQuantity(item._id);
  };

  const isMinimumQuantity = item.quantity <= 1;
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 border rounded-lg py-1 px-2",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary cursor-pointer"
        aria-label="Ürün miktarını azalt"
        disabled={isOutOfStock || isMinimumQuantity}
        onClick={handleDecrease}
      >
        <Minus size={16} />
      </Button>

      <span className="min-w-[32px] text-center text-lg font-medium text-foreground">
        {item.quantity}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary cursor-pointer"
        aria-label="Ürün miktarını artır"
        onClick={handleIncrease}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default QuantityButtons;
