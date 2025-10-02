"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { toast } from "sonner";
import { Product } from "./sanity.types";
import { calculateTotals } from "./utils/helper";


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
          const totalStock = 
            product.variants?.reduce((sum, v) => sum + (v.stockQuantity ?? 0) , 0) || 0;

          if (totalStock <= 0) {
            toast.error("Bu ürünün stoğu tükenmiştir.");
            return; 
          }

          const existingItem = state.items.find((item) => item._id === product._id);

          if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > totalStock) {
              toast.info(`Stok limiti aşıldı. Sepetinizdeki adet maksimum stoka (${totalStock}) güncellendi.`);
              existingItem.quantity = totalStock;
            } else {
              existingItem.quantity = newQuantity;
            }
          } else {
            const itemQuantity = quantity > totalStock ? totalStock : quantity;
            if (quantity > totalStock) {
              toast.info(`Stok limiti aşıldı. Sepete maksimum ${totalStock} adet eklendi.`);
            }
            state.items.push({ ...product, quantity: itemQuantity });
          }

          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalPrice = totals.totalPrice;
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
              item.variants?.reduce((sum, v) => sum + (v.stockQuantity ?? 0), 0) || 0;
              
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
export const useCartTotals = () => useCartStore((state) => ({
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
}));
export const useCartActions = () => useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    clearCart: state.clearCart,
}));