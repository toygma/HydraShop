import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/custom/Loading";
import SectionAbout from "@/components/sections/SectionAbout";
import MostReviewedProducts from "@/components/sections/MostReviewedProducts";

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

      <Suspense>
        <Products />
      </Suspense>
      <SectionAbout/>
      <MostReviewedProducts/>
    </div>
  );
};

export default Home;
