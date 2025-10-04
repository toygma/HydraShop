import ProductCard from "@/app/(client)/product/_components/ProductCard";
import { Product } from "@/sanity.types";
import { getMostReviews } from "@/sanity/helper";
import { MessageCircle } from "lucide-react";

const MostReviewedProducts = async () => {
  const products = await getMostReviews();
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full mb-4">
            <MessageCircle size={18} />
            <span className="text-sm font-semibold">Customer Favorites</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Most Reviewed Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the products our customers love and review the most
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"></div>

        {/* View All Button */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {products?.map((item: Product) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
          <div className="pt-12 flex items-center justify-center">
            <button className="bg-transparent border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-semibold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer">
              View All Products
            </button>
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default MostReviewedProducts;
