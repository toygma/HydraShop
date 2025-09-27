import type { Metadata } from "next";
import SignInPage from "./_components/SignInPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn =async () => {
  const user = await currentUser()

  if(user){
    return redirect("/")
  }
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen mt-12">
      <SignInPage />
    </div>
  );
};

export default SignIn;
