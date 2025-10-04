import dynamic from "next/dynamic";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/custom/Loading";
import { getAllCategories } from "@/sanity/helper";

const CategoryProducts = dynamic(
  () => import("./_components/CategoryProducts")
);

// Extract Params type
type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Metadata generate function
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
      url: `/category/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} - Product`,
      description: `Discover products in the ${categoryName} category.`,
    },
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

// Main component
const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const categories = await getAllCategories();

  // Slug validation
  if (!slug || slug.length < 2) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1>Products by Category</h1>
      <span className="font-bold text-green-600 capitalize tracking-wide">
        {slug && slug}
      </span>
      <div>
        <Suspense fallback={<Loading fullScreen size={40} />}>
          <CategoryProducts categories={categories} slug={slug} />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryPage;
