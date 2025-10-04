import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { Product } from '@/sanity.types';

interface SavedProduct extends Product {
  savedAt: string;
}

interface SavedStore {
  savedProducts: SavedProduct[];
  addToSaved: (product: Product) => void;
  removeFromSaved: (productId: string) => void;
  isInSaved: (productId: string) => boolean;
  clearSaved: () => void;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedProducts: [],

      addToSaved: (product) => {
        const { savedProducts } = get();
        if (savedProducts.some((item) => item._id === product._id)) {
          toast.error('This product is already in your saved items!');
          return;
        }
        const productWithDate = {
          ...product,
          savedAt: new Date().toISOString(),
        };
        set({ savedProducts: [...savedProducts, productWithDate] });
        toast.success('Added to saved items 🔖');
      },

      removeFromSaved: (productId) => {
        set((state) => ({
          savedProducts: state.savedProducts.filter((item) => item._id !== productId),
        }));
        toast.success('Removed from saved items');
      },

      isInSaved: (productId) => {
        return get().savedProducts.some((item) => item._id === productId);
      },

      clearSaved: () => {
        set({ savedProducts: [] });
        toast.success('All saved items cleared');
      },
    }),
    {
      name: 'saved-products-storage',
    }
  )
);
