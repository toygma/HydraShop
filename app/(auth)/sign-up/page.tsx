import { currentUser } from "@clerk/nextjs/server";
import SignUpPage from "./_components/SignUp";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = async() => {
  const user = await currentUser();

  if (user) {
    return redirect("/");
  }
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen mt-12">
      <SignUpPage />
    </div>
  );
};

export default SignUp;
