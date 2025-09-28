"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { useState } from "react";
import MobileMenu from "./_components/MobileMenu";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";

export const navLinks = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Featured", href: "/featured" },
  { id: 3, title: "New", href: "/new" },
  { id: 4, title: "Accessories", href: "/accessories" },
  { id: 5, title: "T-Shirt", href: "/tshirt" },
  { id: 6, title: "Men", href: "/men" },
  { id: 7, title: "Women", href: "/women" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-lg dark:bg-gray-800/95">
      <div className="py-6 px-6 container mx-auto  items-center justify-between border-b border-gray-100 dark:border-gray-700 md:flex hidden">
        <div className=" text-gray-500 dark:text-gray-300">
          <CiSearch
            size={22}
            className="cursor-pointer hover:text-tertiary transition-colors duration-200"
          />
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
                <Button variant={"outline"} className="cursor-pointer">Sign In</Button>
              </Link>
            )}
          </li>
          <li>
            <Link
              href={"/cart"}
              className="hover:text-tertiary transition-colors duration-300 relative"
            >
              <ShoppingBag size={22} />
              <Badge
                children={2}
                className="absolute -top-1.5 -right-2 bg-red-500 text-white rounded-full w-4 h-4 ring-2 ring-white dark:ring-gray-800  transform scale-90 transition duration-200"
              />
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
      <div className="py-4 flex justify-between items-center px-4 md:hidden">
        <Link
          href={"/"}
          className="font-extrabold md:hidden block text-3xl md:text-4xl text-tertiary dark:text-white tracking-widest transition-colors duration-300 hover:text-orange-600 dark:hover:text-orange-400 mb-4"
        >
          HydraShop
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-gray-700 dark:text-white cursor-pointer"
          aria-label="Open menu"
        >
          <Bars3Icon className="w-7 h-7" />
        </button>
      </div>

      <nav className="hidden md:block border-b-2 border-transparent py-4">
        <ul className="flex items-center justify-center space-x-4 ">
          {navLinks.map((item) => (
            <li key={item.id} className="relative group">
              <Link
                href={item.href}
                className={`font-extralight text-base text-gray-700 
                  hover:text-black dark:text-gray-300 dark:hover:text-white 
                  transition-all duration-300 tracking-wide uppercase text-[14px] ${
                    pathname === item.href ? "text-tertiary font-medium" : ""
                  }`}
              >
                {item.title}
              </Link>
              <span className="absolute left-0 bottom-[-5px] w-0 h-[2px] bg-tertiary dark:bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </nav>
      {/* MOBILE MENU */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
