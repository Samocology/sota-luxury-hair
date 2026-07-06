import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { add, wishlist, toggleWish } = useCart();
  const wished = wishlist.includes(product.id);
  const badgeColor: Record<string, string> = {
    BESTSELLER: "bg-gold text-gold-foreground",
    NEW: "bg-emerald-500 text-white",
    SALE: "bg-destructive text-destructive-foreground",
    LIMITED: "bg-purple-500 text-white",
    TRENDING: "bg-sky-500 text-white",
  };
  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-border/60 bg-[color:var(--surface)] transition-all hover:border-gold/60">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className={cn("absolute left-2 top-2 rounded-sm px-2 py-1 text-[9px] font-bold tracking-[0.15em]", badgeColor[product.badge])}>
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggleWish(product.id)}
          aria-label="Wishlist"
          className={cn(
            "absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/80 backdrop-blur-sm transition-colors",
            wished ? "text-gold" : "text-foreground/70 hover:text-gold",
          )}
        >
          <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <Link to="/product/$id" params={{ id: product.id }} className="text-sm font-medium leading-tight hover:text-gold">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <span className="text-gold">★★★★★</span>
          <span>({product.reviews})</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {[product.density, product.lace, product.length].map((t) => (
            <span key={t} className="rounded-sm border border-border/60 px-1.5 py-0.5 text-[9px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{formatNaira(product.price)}</span>
            {product.compareAt && (
              <span className="text-[10px] text-muted-foreground line-through">{formatNaira(product.compareAt)}</span>
            )}
          </div>
          <button
            onClick={() => add(product.id)}
            className="gradient-gold rounded-sm px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] transition-transform hover:scale-[1.02]"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}