import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { Product } from "@/sanity.types";

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) => {
        const { wishlist } = get();
        if (wishlist.some((item) => item._id === product._id)) {
          toast.error('This product is already in your wishlist!');
          return;
        }
        set({ wishlist: [...wishlist, product] });
        toast.success('Added to wishlist ❤️');
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item._id !== productId)
        }));
        toast.success('Removed from wishlist');
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item._id === productId);
      },

      clearWishlist: () => {
        set({ wishlist: [] });
        toast.success('All wishlist items cleared');
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
