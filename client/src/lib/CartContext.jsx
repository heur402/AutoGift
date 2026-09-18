/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

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

  const addItem = (product) => {
    const existing = items.find((item) => item.id === product.id);
    const next = existing
      ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...product, quantity: 1 }];
    save(next);
  };

  const removeItem = (id) => save(items.filter((item) => item.id !== id));
  const clear = () => save([]);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({ items, addItem, removeItem, clear, total }), [items, total, addItem, removeItem, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
