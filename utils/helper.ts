import { sanityFetch } from "@/sanity/lib/live";
import { CartItem } from "@/store";
import { defineQuery } from "next-sanity";
import moment from "moment";
import { Product } from "@/sanity.types";

export const formattedPrice = (price: number | undefined | null): string => {
  const formattedPrice = new Number(price).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });

  return formattedPrice;
};

export const getProductsBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == 'product' && slug.current == $slug] | order(name asc) [0]`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.log("Error fetching slug", error);
  }
};

export const getAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(
    `*[_type=="category"] | order(name asc)`
  );

  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error: any) {
    console.log(error.message);
  }
};

export const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );
  const STANDARD_SHIPPING_FEE = 25.0;
  const TAX_RATE = 0.2;
  const FREE_SHIPPING_THRESHOLD = 200.0;
  const taxPrice = totalPrice * TAX_RATE;

  let shippingPrice = 0;

  if (totalItems > 0) {
    if (totalPrice >= FREE_SHIPPING_THRESHOLD) {
      shippingPrice = 0;
    } else {
      shippingPrice = STANDARD_SHIPPING_FEE;
    }
  }

  const overallTotal = totalPrice + taxPrice + shippingPrice;

  return {
    totalItems, // Toplam ürün adedi
    totalPrice, // Ürünlerin vergisiz toplam fiyatı
    taxPrice, // Hesaplanan vergi fiyatı
    shippingPrice, // Kargo ücreti
    overallTotal, // Genel Toplam Fiyat (Vergi ve Kargo dahil)
  };
};

export const formatDateLocal = (date: string | Date) => {
  if (!date) return "";
  return moment(date).fromNow();
};

export const isOutStockControl = (product: Product) => {
  const totalStock =
    product?.variants?.reduce(
      (sum, item) => sum + (item.stockQuantity || 0),
      0
    ) || 0;
  const isOutOfStock = totalStock <= 0;
  return isOutOfStock;
};
