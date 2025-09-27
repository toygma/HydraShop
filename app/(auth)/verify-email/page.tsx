"use client";
import { useSignUp, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const user = useUser();

  const router = useRouter();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded || isLoading) return;

    setIsLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Email verified!");
        router.push("/");
      } else {
        console.log(result);
        toast.error("Unexpected verification status. Please try again.");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.user?.primaryEmailAddress?.verification.status === "verified") {
    return router.push("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 mx-auto">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Verify Your Email
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter the 6-digit code sent to the email address you used during
            registration.
          </p>
        </div>

        <form onSubmit={handleVerification} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="code"
              className="text-sm font-medium block text-gray-700 dark:text-gray-300"
            >
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex: 123456"
              maxLength={6}
              required
              // Styling for wide, centered code input
              className="w-full p-4 text-center text-xl tracking-widest border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-tertiary dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length !== 6 || !isLoaded}
            className="w-full text-white bg-tertiary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-tertiary font-bold rounded-lg text-lg px-5 py-3 text-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Verifying..." : "Activate Account"}
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center pt-2">
            Didn't receive the code?{" "}
            <Link
              href="/resend-email"
              className="font-semibold text-tertiary hover:text-orange-600 dark:hover:text-orange-400 hover:underline transition-colors"
            >
              Resend Code
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
