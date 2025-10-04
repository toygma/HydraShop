"use client";
import { useState } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import QuantityButtons from "../../product/_components/QuantityButtons";
import { useCartStore } from "@/store";
import { urlFor } from "@/sanity/lib/image";
import { calculateTotals, formattedPrice } from "@/utils/helper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const CartPage = () => {
  const totalItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const { totalPrice, shippingPrice, overallTotal } =
    calculateTotals(totalItems);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const handleCheckOut = async () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      return;
    }

    setIsLoading(true);
    try {
      const items = totalItems.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image:
          item.images && item.images.length > 0
            ? urlFor(item.images[0]).url()
            : null,
      }));

      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.primaryEmailAddress?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          metadata,
          totalPrice,
          shippingPrice,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: any) {
      toast.error("Checkout on process", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-60 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {totalItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    Shopping Cart
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {totalItems.length}{" "}
                    {totalItems.length === 1 ? "item" : "items"}
                  </p>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {totalItems.map((item) => {
                        const itemSubtotal = (item.price ?? 0) * item.quantity;
                        return (
                          <tr
                            key={item._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-4">
                                {item.images && item.images.length > 0 && (
                                  <Image
                                    src={urlFor(item.images[0]).url()}
                                    alt={item.name || "Product"}
                                    width={80}
                                    height={80}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
                                  />
                                )}
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                                    {item.name}
                                  </span>
                                  <span className="text-gray-500 text-xs sm:text-sm mt-1">
                                    {formattedPrice(item.price)}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center">
                                <QuantityButtons item={item} />
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right font-medium text-gray-900">
                              {formattedPrice(itemSubtotal)}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-center">
                                <Button
                                  variant={"outline"}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                  onClick={() => removeItem(item._id)}
                                  aria-label="Remove item"
                                >
                                  <Trash className="w-5 h-5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                  {totalItems.map((item) => {
                    const itemSubtotal = (item.price ?? 0) * item.quantity;
                    return (
                      <div key={item._id} className="p-4">
                        <div className="flex gap-4">
                          {item.images && item.images.length > 0 && (
                            <Image
                              src={urlFor(item.images[0]).url()}
                              alt={item.name || "Product"}
                              width={100}
                              height={100}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-medium text-gray-900 text-sm truncate">
                                {item.name}
                              </h3>
                              <button
                                className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                                onClick={() => removeItem(item._id)}
                                aria-label="Remove item"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                              {formattedPrice(item.price)}
                            </p>
                            <div className="flex justify-between items-center mt-3">
                              <QuantityButtons item={item} />
                              <span className="font-medium text-gray-900 text-sm">
                                {formattedPrice(itemSubtotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 sticky top-24">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {formattedPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                      {formattedPrice(shippingPrice)}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formattedPrice(overallTotal)}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckOut}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16">
            <div className="bg-gray-50 rounded-full p-6 sm:p-8 mb-6">
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-md">
              Looks like you haven&apos;t added anything to your cart yet
            </p>
            <Link
              href="/"
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors duration-200"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
