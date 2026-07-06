import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "./data";

type CartItem = { id: string; qty: number };

type CartCtx = {
  items: CartItem[];
  wishlist: string[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  count: number;
  subtotal: number;
  hydrated: { items: (CartItem & { product: Product })[] };
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("sota-cart");
      const w = localStorage.getItem("sota-wish");
      if (c) setItems(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("sota-cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("sota-wish", JSON.stringify(wishlist)); }, [wishlist]);

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.id === id);
      if (ex) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
    const p = products.find((p) => p.id === id);
    toast.success(`${p?.name ?? "Item"} added to cart`);
  }, []);
  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const setQty = useCallback((id: string, qty: number) =>
    setItems((p) => (qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i)))), []);
  const clear = useCallback(() => setItems([]), []);
  const toggleWish = useCallback((id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      toast.success(has ? "Removed from wishlist" : "Added to wishlist");
      return has ? prev.filter((i) => i !== id) : [...prev, id];
    });
  }, []);

  const value = useMemo<CartCtx>(() => {
    const hydrated = {
      items: items
        .map((i) => {
          const product = products.find((p) => p.id === i.id);
          return product ? { ...i, product } : null;
        })
        .filter((x): x is CartItem & { product: Product } => !!x),
    };
    return {
      items,
      wishlist,
      add,
      remove,
      setQty,
      clear,
      toggleWish,
      count: items.reduce((a, b) => a + b.qty, 0),
      subtotal: hydrated.items.reduce((a, b) => a + b.product.price * b.qty, 0),
      hydrated,
    };
  }, [items, wishlist, add, remove, setQty, clear, toggleWish]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
};