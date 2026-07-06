import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/data";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — SOTA HAIR" }] }),
  component: Wish,
});

function Wish() {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-2 font-serif text-4xl md:text-5xl">Your Wishlist</h1>
      <p className="mb-8 text-sm text-muted-foreground">{items.length} saved styles</p>
      {items.length === 0 ? (
        <div className="grid place-items-center rounded-md border border-border/60 py-20 text-center">
          <Heart className="mb-3 h-10 w-10 text-gold" />
          <div className="font-serif text-2xl">No favorites yet</div>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="mt-4 gradient-gold rounded-sm px-5 py-2.5 text-xs font-bold tracking-[0.2em]">BROWSE WIGS</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}