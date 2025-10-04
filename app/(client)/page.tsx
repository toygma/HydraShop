import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/custom/Loading";

const Products = dynamic(
  () => import("@/app/(client)/product/_components/Products")
);

const Hero = dynamic(() => import("@/components/hero/Hero"));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<Loading fullScreen size={40} />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<Loading fullScreen size={40} />}>
        <Products />
      </Suspense>
    </div>
  );
};

export default Home;
