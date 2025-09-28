import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { navLinks } from "../Header"; // navLinks'in Header'dan geldiğini varsayarak
import { CiUser } from "react-icons/ci";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MdDarkMode } from "react-icons/md";
import { UserButton, useUser } from "@clerk/nextjs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: Props) => {
  const { isSignedIn } = useUser();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden h-screen "
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 md:hidden bg-white dark:bg-gray-900 shadow-2xl z-50 
          transition-transform duration-300 ease-in-out flex flex-col justify-between ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 h-20">
          <h2 className="text-xl font-bold text-tertiary dark:text-white tracking-widest">
            HydraShop
          </h2>
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="cursor-pointer"
          >
            <XMarkIcon className="w-7 h-7 text-gray-700 dark:text-gray-300 hover:text-red-500 transition duration-150 " />
          </button>
        </div>

        <nav className="p-4 flex-grow overflow-y-auto">
          {" "}
          <ul className="space-y-2">
            {" "}
            {navLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="
                    block p-3 text-lg font-medium text-gray-700 dark:text-gray-200 
                    hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-gray-800 
                    rounded-lg transition duration-150
                  "
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ul className="flex items-center justify-around text-gray-600 dark:text-gray-300">
            <li >
              <li>
                {isSignedIn ? (
                  <UserButton />
                ) : (
                  <Link
                    href={"/sign-in"}
                    className="hover:text-tertiary transition-colors duration-300 flex flex-col items-center"
                  >
                    <CiUser size={28} />
                    <span className="text-xs mt-1">Login</span>
                  </Link>
                )}
              </li>
            </li>

            <li onClick={onClose}>
              <Link
                href={"/card"}
                className="relative hover:text-tertiary transition-colors duration-300 flex flex-col items-center"
              >
                <ShoppingBag size={22} />
                <span className="text-xs mt-1">Bag</span>
                <Badge
                  children={2}
                  className="absolute -top-1 -right-3 text-[10px] font-bold 
                             bg-red-500 text-white rounded-full w-4 h-4 
                             ring-2 ring-white dark:ring-gray-900 
                             "
                />
              </Link>
            </li>

            <li className="flex flex-col items-center justify-center">
              <MdDarkMode
                className="cursor-pointer hover:text-black dark:hover:text-white transition-colors duration-300 "
                title="Toggle Dark Mode"
                size={22}
              />
              <span className="text-xs mt-1 block text-center">Theme</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
