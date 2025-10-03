"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store";
import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (!orderNumber && !sessionId) {
      router.push("/");
    } else {
      clearCart();
    }
  }, [orderNumber, sessionId, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-lg w-full text-center transform transition duration-500 hover:scale-[1.02]">
        {/* Success Icon */}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Payment Successful! 🎉
        </h1>

        {/* Subtitle/Message */}
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. A confirmation email has been sent to
          your inbox.
        </p>

        {/* Order Details Snippet (Optional but recommended) */}
        <div className="bg-green-50 p-4 rounded-lg mb-8 border border-green-200">
          <p className="text-sm font-semibold text-green-700">
            **Order ID:** #{orderNumber}
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Continue Shopping
          </Link>
        
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-xs text-gray-400">
          Need help? Contact our support team.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
