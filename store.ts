import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  getItemCount: (productId: string) => number;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubTotalPrice: () => number;
  getItems: () => CartItem[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        })),


      getItemCount: (productId) => {
        const { items } = get();
        const item = items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubTotalPrice: () => {
        const { items } = get();
        const totalInCents = items.reduce((total, item) => {
          const priceToUse = item.product.salePrice ?? item.product.price ?? 0;
          return total + priceToUse * item.quantity;
        }, 0);

        return totalInCents / 100;
      },

      getItems: () => get().items,
    }),
    {
      name: "cart-store",
    }
  )
);