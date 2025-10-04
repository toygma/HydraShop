"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";
import { Product } from "../sanity.types";
import { calculateTotals } from "../utils/helper";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product, quantity = 1) => {
        set((state) => {
          // --- 1. Stock Check ---
          const totalStock =
            product.variants?.reduce(
              (sum, v) => sum + (v.stockQuantity ?? 0),
              0
            ) || 0;

          if (totalStock <= 0) {
            // Out of Stock
            toast.error("This product is currently out of stock.");
            return state;
          }

          // --- 2. Cart Update Logic ---

          let toastMessage = "";
          let toastDescription = "";
          let toastType: "success" | "info" = "success";

          const existingItem = state.items.find(
            (item) => item._id === product._id
          );

          const updatedItems = existingItem
            ? // Product is ALREADY in Cart: Increase Quantity
              state.items.map((item) => {
                if (item._id === product._id) {
                  const newQuantity = item.quantity + quantity;

                  if (newQuantity > totalStock) {
                    // Stock limit exceeded
                    toastMessage = "Stock limit reached.";
                    toastDescription = `Your cart quantity has been updated to the maximum stock (${totalStock}).`;
                    toastType = "info";
                    return { ...item, quantity: totalStock };
                  } else {
                    // Successful increase
                    toastMessage = `${product.name} added to cart.`;
                    toastDescription = `You now have ${newQuantity} unit(s) of this item in your cart.`;
                    return { ...item, quantity: newQuantity };
                  }
                }
                return item;
              })
            : // New Product: Add to Cart
              (() => {
                const itemQuantity =
                  quantity > totalStock ? totalStock : quantity;

                if (quantity > totalStock) {
                  // Stock limit exceeded on first addition
                  toastMessage = "Stock limit reached.";
                  toastDescription = `Maximum of ${totalStock} unit(s) added to cart.`;
                  toastType = "info";
                } else {
                  // Successful first addition
                  toastMessage = `${product.name} added to cart.`;
                  toastDescription = `You now have ${itemQuantity} unit(s) of this item in your cart.`;
                }

                return [...state.items, { ...product, quantity: itemQuantity }];
              })();

          // --- 3. Display Toast Message ---
          if (toastMessage) {
            if (toastType === "success") {
              toast.success(toastMessage, { description: toastDescription });
            } else {
              toast.info(toastMessage, { description: toastDescription });
            }
          }

          // --- 4. Recalculate Totals and Return State ---
          const totals = calculateTotals(updatedItems);

          return {
            items: updatedItems,
            totalItems: totals.totalItems,
            totalPrice: totals.totalPrice,
          };
        });
      },
      removeItem: (productId) => {
        set((state) => {
          state.items = state.items.filter((item) => item._id !== productId);
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalPrice = totals.totalPrice;
        });
      },

      increaseQuantity: (productId) => {
        set((state) => {
          const item = state.items.find((item) => item._id === productId);
          if (item) {
            // Stok SADECE variant'lardan hesaplanır.
            const totalStock =
              item.variants?.reduce(
                (sum, v) => sum + (v.stockQuantity ?? 0),
                0
              ) || 0;

            if (item.quantity >= totalStock) {
              toast.error(`Maksimum stok limitine ulaşıldı: ${totalStock}`);
            } else {
              item.quantity += 1;
            }
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
          }
        });
      },

      decreaseQuantity: (productId) => {
        set((state) => {
          const item = state.items.find((item) => item._id === productId);
          if (item) {
            if (item.quantity <= 1) {
              state.items = state.items.filter((i) => i._id !== productId);
            } else {
              item.quantity -= 1;
            }
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
          }
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    })),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalPrice = totals.totalPrice;
        }
      },
    }
  )
);

// Diğer hook'lar aynı kalabilir...
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotals = () =>
  useCartStore((state) => ({
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
  }));
export const useCartActions = () =>
  useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    clearCart: state.clearCart,
  }));
