import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/sanity.types";
import React from "react";

const ProductCharacteristics = ({ product }: { product: Product }) => {
  const variantColors =
    product?.variants?.map((item) => item.color).filter(Boolean) || [];
  const variantSizes =
    product?.variants?.map((item) => item.size).filter(Boolean) || [];
  const variantSkus =
    product?.variants?.map((item) => item.sku).filter(Boolean) || [];
  const variantStocks =
    product?.variants?.map((item) => item.stockQuantity).filter(Boolean) || [];

  const characteristics = [
    { label: "Brand", value: "Unknown" },
    { label: "Collection", value: "2024" },
    { label: "Color", value: variantColors },
    { label: "Size", value: variantSizes },
    { label: "SKU", value: variantSkus },
    { label: "Total Stock", value: variantStocks },
  ];

  const headerText = product?.name
    ? `${product.name} Characteristics`
    : "Product Characteristics";
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{headerText}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-1">
          {characteristics.map((item) => (
            <div key={item.label}>
              <p className="flex items-center justify-between">
                {item.label}
                <span className="font-semibold tracking-wide">
                 {Array.isArray(item.value) ? item.value.join(", ") : item.value}
                </span>
              </p>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
