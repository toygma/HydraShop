"use client";
import { Button } from "@/components/ui/button";
import { Category } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import CategoryMain from "./CategoryMain";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug]._id)] | order(name asc)`;

      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="min-h-screen mt-32">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Products Categories
          </h1>
          <p className="text-slate-600 text-lg">
            Discover our collection and choose your favorite category
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                <h2 className="text-xl font-semibold text-white">
                  Categories{" "}
                </h2>
              </div>
              <nav className="p-2">
                {categories.map((category) => (
                  <Button
                    key={category?._id}
                    onClick={() =>
                      setCurrentSlug(category?.slug?.current || "")
                    }
                    className={`
                                            w-full justify-start px-6 py-6 mb-2 rounded-xl
                                            transition-all duration-300 text-base font-medium
                                            ${
                                              currentSlug ===
                                              category?.slug?.current
                                                ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:text-white shadow-lg scale-[1.02]"
                                                : "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                            }
                                        `}
                    variant="ghost"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`
                                                w-2 h-2 rounded-full transition-all
                                                ${
                                                  currentSlug ===
                                                  category?.slug?.current
                                                    ? "bg-white scale-125"
                                                    : "bg-slate-400"
                                                }
                                            `}
                      />
                      {category?.title}
                    </span>
                  </Button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content - Products */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 min-h-[600px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {categories.find((c) => c?.slug?.current === currentSlug)
                    ?.title || "Products"}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                  </Button>
                  <Button variant="outline" className="rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Ürün Grid Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <CategoryMain product={product} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
