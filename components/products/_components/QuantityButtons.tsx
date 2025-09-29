import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

const QuantityButtons = () => {
  const itemCount = 4;
  const iconSize = 16; 

  return (
    <div className={cn("flex items-center gap-2 text-base")}>
      <Button 
        variant="outline" 
        size={"icon"} 
        className="w-7 h-7 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
        aria-label="Reduce product quantity"
      >
        <Minus size={iconSize} /> 
      </Button>
      
      <span className="font-bold w-6 text-center text-lg text-black dark:text-white transition-colors duration-200">
        {itemCount}
      </span>
      
      <Button
        variant="default" 
        size={"icon"}
        className="w-7 h-7 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
        aria-label="Increase product quantity"
      >
        <Plus size={iconSize} />
      </Button>
    </div>
  );
};

export default QuantityButtons;