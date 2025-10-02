"use client";
import { Trash } from "lucide-react";
import Image from "next/image";
import QuantityButtons from "../../product/_components/QuantityButtons";
import { useCartStore } from "@/store";
import { urlFor } from "@/sanity/lib/image";
import { calculateTotals, formattedPrice } from "@/utils/helper";
import Link from "next/link";

const CartPage = () => {
  const totalItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const { totalPrice, taxPrice, shippingPrice, overallTotal } =
    calculateTotals(totalItems);
  return (
    <div className="min-h-screen mt-44 flex justify-center container mx-auto px-4">
      {totalItems.length > 0 ? (
        <div className="flex flex-col md:flex-row w-full gap-8">
          <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-center">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Sub Total</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {totalItems.map((item) => {
                  const itemSubtotal = (item.price ?? 0) * item.quantity;
                  return (
                    <tr className="border-b text-center">
                      <td className="py-4 px-4 flex items-center gap-4">
                        {item.images && item.images.length > 0 && (
                          <Image
                            src={urlFor(item.images[0]).url()}
                            alt="Product"
                            width={500}
                            height={500}
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 text-sm text-left">
                            {formattedPrice(item.price)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <QuantityButtons item={item} />
                      </td>
                      <td className="py-4 px-4 font-medium">
                        {formattedPrice(itemSubtotal)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => removeItem(item._id)}
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sağ Taraf - Summary */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formattedPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>{formattedPrice(shippingPrice)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>{formattedPrice(taxPrice)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>{formattedPrice(overallTotal)}</span>
            </div>
            <button className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <svg
            className="w-24 h-24 text-gray-300 mb-8"
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
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
