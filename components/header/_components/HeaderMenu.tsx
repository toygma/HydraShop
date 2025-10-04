"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { MdDarkMode } from "react-icons/md";
import { useCartStore } from "@/zustand/store";
import { useState } from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import { Category } from "@/sanity.types";

const HeaderMenu = ({ category }: { category: Category[] }) => {
  const itemCount = useCartStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  return (
    <>
      <nav className="hidden md:block border-b-2 border-transparent">
        {/* DESKTOP HEADER */}
        <div className="py-6 px-6 container mx-auto items-center justify-between border-b border-gray-100 dark:border-gray-700 md:flex hidden">
          <div className="text-gray-500 dark:text-gray-300">
            <SearchBar />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              href={"/"}
              className="font-extrabold text-3xl md:text-4xl text-tertiary dark:text-white tracking-widest transition-colors duration-300 hover:text-orange-600 dark:hover:text-orange-400"
            >
              HydraShop
            </Link>
          </div>

          <ul className="flex items-center space-x-4 text-gray-500 dark:text-gray-300">
            <li>
              {isSignedIn ? (
                <UserButton />
              ) : (
                <Link href={"/sign-in"}>
                  <Button variant={"outline"} className="cursor-pointer">
                    Sign In
                  </Button>
                </Link>
              )}
            </li>
            <li>
              <Link
                href={"/cart"}
                className="hover:text-tertiary transition-colors duration-300 relative"
              >
                <ShoppingBag size={22} />
                {itemCount.length > 0 && (
                  <Badge className="absolute -top-1.5 -right-2 bg-red-500 text-white rounded-full w-4 h-4 ring-2 ring-white dark:ring-gray-800 transform scale-90 transition duration-200">
                    {itemCount.length}
                  </Badge>
                )}
              </Link>
            </li>
            <li>
              <MdDarkMode
                className="cursor-pointer hover:text-black dark:hover:text-white transition-colors duration-300"
                title="Toggle Dark Mode"
                size={24}
              />
            </li>
          </ul>
        </div>
      </nav>

      {/* MOBILE HEADER */}
      <div className="md:hidden border-b border-gray-100 dark:border-gray-700">
        <div className="py-4 flex justify-between items-center px-4">
          <Link
            href={"/"}
            className="font-extrabold text-3xl text-tertiary dark:text-white tracking-widest transition-colors duration-300 hover:text-orange-600 dark:hover:text-orange-400"
          >
            HydraShop
          </Link>

          <div className="flex items-center space-x-3">
            <Link href={"/cart"} className="relative">
              <ShoppingBag
                size={24}
                className="text-gray-700 dark:text-gray-300"
              />
              {itemCount.length > 0 && (
                <Badge className="absolute -top-1.5 -right-2 bg-red-500 text-white rounded-full w-4 h-4 ring-2 ring-white dark:ring-gray-800 transform scale-90 transition duration-200">
                  {itemCount.length}
                </Badge>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-700 dark:text-white cursor-pointer"
              aria-label="Open menu"
            >
              <Bars3Icon className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP CATEGORY NAVIGATION */}
      <ul className="hidden md:flex items-center justify-center space-x-4 py-4">
        {category?.map((cat: Category) => (
          <li key={cat._id} className="relative group">
            <Link
              href={`/category/${cat?.slug?.current}`}
              className={`font-extralight text-base text-gray-700 
                  hover:text-black dark:text-gray-300 dark:hover:text-white 
                  transition-all duration-300 tracking-wide uppercase text-[14px] ${
                    pathname === `/category/new/${cat?.slug?.current}`
                      ? "text-tertiary font-medium"
                      : ""
                  }`}
            >
              {cat.title}
            </Link>
            <span className="absolute left-0 bottom-[-5px] w-0 h-[2px] bg-tertiary dark:bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* MOBILE MENU */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        category={category}
      />
    </>
  );
};

export default HeaderMenu;
