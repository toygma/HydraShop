"use client";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { Form } from "../ui/form";
import FormInput from "../inputs/FormInput";
import { useForm } from "react-hook-form";
import { SearchData, searchSchema } from "@/validation/search.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "@/sanity/lib/client";
import Loading from "../custom/Loading";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formattedPrice } from "@/utils/helper";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SearchData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const currentSearchTerm = watch("search");
  const handleClear = () => {
    setValue("search", "", { shouldValidate: true });
  };

  const fetchProducts = useCallback(async () => {
    if (!currentSearchTerm) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;

      const params = { search: `${currentSearchTerm}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentSearchTerm]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [currentSearchTerm, fetchProducts]);


  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search
          size={22}
          className="cursor-pointer hover:text-tertiary transition-colors duration-200"
        />
      </DialogTrigger>
      <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Search</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6 w-full">
            <div className=" gap-3 p-4 relative ">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0 absolute left-6 bottom-6 " />
              <FormInput
                name="search"
                error={errors.search}
                form={form}
                type="text"
                className=" focus:ring-offset-0! focus:ring-0! bg-white pl-8"
              />
              {currentSearchTerm && currentSearchTerm.length > 0 && (
                <button
                  onClick={handleClear}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors absolute right-6 bottom-5"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </form>
        </Form>
        <div className="max-h-[500px] overflow-y-auto">
          {loading ? (
            <Loading fullScreen size={50} />
          ) : (
            <>
              {" "}
              {products.length > 0 ? (
                <>
                  <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-3 z-10">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {products.length}
                      </span>{" "}
                      product found
                    </p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {products.map((product: Product) => (
                      <Link
                        key={product._id}
                        href={`/product/${product?.slug?.current}`}
                        className="flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200 group"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                          <Image
                            src={
                              product?.images?.[0]
                                ? urlFor(product.images[0]).url()
                                : ""
                            }
                            alt={`${product.name}`}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {product.variant}
                          </p>
                          <p className="text-base font-bold text-gray-900 mt-1">
                            {formattedPrice(product.price)}
                          </p>
                        </div>
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : !currentSearchTerm ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Search for the product.
                  </h3>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    product not found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    &quot;<span className="font-medium">{currentSearchTerm}</span>&quot;
                    for product not found
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
