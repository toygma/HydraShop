import type { Metadata } from "next";
import SignInPage from "./_components/SignInPage";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = () => {
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen mt-12">
      <SignInPage />
    </div>
  );
};

export default SignIn;
