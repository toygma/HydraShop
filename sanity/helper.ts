import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const getMyOrders = async (userId: string | null) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
const MY_ORDERS_QUERY = defineQuery(
  `
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ..., 
      products[] {
        ..., 
        product-> 
      }
    }
  `
);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error: any) {
    console.log("Error fetching orders:", error.message);
    return [];
  }
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
