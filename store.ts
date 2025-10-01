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
  deleteCartProduct: (productId: string) => void;
  getItemCount: (productId: string) => number;
  clearCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItems: () => CartItem[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
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
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === productId
          );

          if (!existingItem) return { items: state.items };

          if (existingItem.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item.product._id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }

          return {
            items: state.items.filter((item) => item.product._id !== productId),
          };
        });
      },

      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.salePrice ?? 0) * price) / 100;
          const discountedPrice = price + discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const { items } = get();
        const item = items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      getItems: () => get().items,
    }),
    {
      name: "cart-store",
    }
  )
);
