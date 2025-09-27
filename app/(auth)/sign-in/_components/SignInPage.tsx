"use client";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "@/validation/auth.schema";
import FormInput from "@/components/inputs/FormInput";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  //GOOGLE SIGN IN

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrlComplete: "/",
        redirectUrl: "/",
      });
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      toast.error(err.errors?.[0]?.longMessage || "Google Sign-In failed");
    }
  };

  const onSubmit = async (data: SignInFormData) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.warning("Unexpected status: " + result.status);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8 space-y-4">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Login <span className="text-tertiary underline">HydraShop</span>{" "}
          Account
        </h1>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label="Sign up with Google"
          >
            <FcGoogle className="text-xl mr-2" />
            Google
          </button>
          <button
            className="flex items-center justify-center w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label="Sign up with GitHub"
          >
            <AiFillGithub className="text-xl mr-2 text-black dark:text-white" />
            GitHub
          </button>
        </div>

        <div className="flex items-center">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</p>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            name="email"
            label="Your Email"
            error={errors.email}
            form={form}
            type="text"
          />

          <FormInput
            name="password"
            label="Password"
            error={errors.password}
            form={form}
            type="password"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-tertiary hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-tertiary font-bold rounded-lg text-lg px-5 py-3 text-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Processing..." : "Login Account"}
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center pt-2">
            Don't have an account ?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-tertiary hover:text-orange-600 dark:hover:text-orange-400 hover:underline transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
