/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shoplite-cart")) || [];
    } catch {
      return [];
    }
  });

  const save = (next) => {
    localStorage.setItem("shoplite-cart", JSON.stringify(next));
    setItems(next);
  };

  const addItem = useCallback((product) => {
    // Orders are intentionally limited to one product, so a new selection replaces the current one.
    const next = [{ ...product, quantity: 1 }];
    save(next);
  }, []);

  const removeItem = useCallback((id) => save(items.filter((item) => item.id !== id)), [items]);
  const clear = useCallback(() => {
    localStorage.setItem("shoplite-cart", JSON.stringify([]));
    setItems([]);
  }, []);
  const total = items[0] ? items[0].price : 0;

  const value = useMemo(() => ({ items, addItem, removeItem, clear, total }), [items, total, addItem, removeItem, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
