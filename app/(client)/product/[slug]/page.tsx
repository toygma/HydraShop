import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product } from "@/sanity.types";
import { getProductsBySlug } from "@/sanity/helper";
import ProductDetail from "./_components/ProductDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${categoryName} - Product`,
    description: `Explore products in the ${categoryName} category. Find the best ${categoryName.toLowerCase()} products here.`,
    keywords: [categoryName, "products", "shopping"],
    openGraph: {
      title: `${categoryName} - Product`,
      description: `Discover products in the ${categoryName} category.`,
      type: "website",
      url: `/product/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} - Product`,
      description: `Discover products in the ${categoryName} category.`,
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  };
}

const SingleProductPage = async ({ params }: Props) => {
  const { slug } = await params;

  const product: Product = await getProductsBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
};

export default SingleProductPage;
