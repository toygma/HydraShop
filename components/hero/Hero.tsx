"use client";
import Image from "next/image";
import banner from "@/public/hero/hero.webp";
import { Check, RefreshCw, Shield, Star, Truck } from "lucide-react";

const features = [
  {
    title: "Secure Payment",
    description: "100% secure payment",
    icon: Shield,
  },
  {
    title: "Free Shipping",
    description: "On all orders above $50",
    icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "30-day money back",
    icon: RefreshCw,
  },
  {
    title: "Top Rated",
    description: "Trusted by customers",
    icon: Star,
  },
];

const Hero = () => {
  return (
    <>
      <div className="bg-[#d8dbdc]">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between pt-24 md:pt-32 lg:pt-40 px-4 md:px-8 lg:p-4 lg:px-16 gap-10 lg:gap-20 container mx-auto ">
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-tight text-gray-900">
              Discover the <span className="text-indigo-600">Brand New</span>{" "}
              Collection
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Unveil the latest trends and exquisite craftsmanship. Experience
              elevated style with our curated selection, designed for the modern
              enthusiast. Quality, design, and passion woven into every piece.
            </p>

            <div className="flex gap-y-4 pt-2 items-center justify-between">
              <span className=" items-center gap-2 text-gray-800 font-medium flex">
                <Check
                  size={20}
                  className="text-green-500 bg-green-100 rounded-full p-[2px]"
                />
                Premium Quality
              </span>

              <span className="flex items-center gap-2 text-gray-800 font-medium">
                <Check
                  size={20}
                  className="text-green-500 bg-green-100 rounded-full p-[2px]"
                />
                Top Brands
              </span>

              <span className="flex items-center gap-2 text-gray-800 font-medium">
                <Check
                  size={20}
                  className="text-green-500 bg-green-100 rounded-full p-[2px]"
                />
                Fast Shipping
              </span>
            </div>

            <button className="mt-6 w-full sm:w-auto px-10 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02]">
              Shop Now
            </button>
          </div>

          <div className="flex-1 w-full max-w-2xl mt-8 lg:mt-0 relative rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition duration-500 ease-in-out">
            <Image
              src={banner}
              width={800}
              height={800}
              layout="responsive"
              className="w-full h-full object-cover"
              alt="image-banner"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
          {/* HERO SUB */}
        </div>
      </div>
      <div className="bg-[#f3f3f3] text-black w-full h-auto py-8 md:py-10 flex items-center justify-center">
        <div className="w-full max-w-7xl px-4">
          <div className="grid gap-6 md:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start md:items-center p-4 rounded-lg transition-all duration-300 transform hover:bg-indigo-600/20 hover:scale-[1.03]"
              >
                <div className="p-3 mr-4 rounded-full bg-indigo-600/20 text-indigo-400 ">
                  <feature.icon size={28} />
                </div>

                <div>
                  <h1 className="text-lg font-bold tracking-wide">
                    {feature.title}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
