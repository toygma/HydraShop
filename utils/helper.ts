import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

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
