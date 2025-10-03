import { getAllCategories } from "@/utils/helper";
import HeaderMenu from "./_components/HeaderMenu";

const Header = async () => {
  const category = await getAllCategories();

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-lg dark:bg-gray-800/95">
        <HeaderMenu category={category}/>
    </header>
  );
};

export default Header;
