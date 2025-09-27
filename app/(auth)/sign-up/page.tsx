import SignUpPage from "./_components/SignUp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen mt-12">
      <SignUpPage />
    </div>
  );
};

export default SignUp;
