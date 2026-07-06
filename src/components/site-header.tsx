import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/collections", label: "COLLECTIONS" },
  { to: "/shop", label: "WIGS" },
  { to: "/shop", label: "RAW HAIR", search: { collection: "bone-straight" as const } },
  { to: "/booking", label: "BOOKING" },
  { to: "/about", label: "ABOUT" },
];

export function SiteHeader() {
  const { count, wishlist } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <Link to="/" className="font-serif text-xl tracking-[0.25em] text-gold md:text-2xl">
          SOTA HAIR
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={cn(
                "text-[11px] font-medium tracking-[0.2em] text-foreground/80 transition-colors hover:text-gold",
                path === item.to && "text-gold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/login"
            className="hidden text-[11px] font-semibold tracking-[0.2em] text-foreground/80 transition-colors hover:text-gold md:block"
          >
            LOGIN
          </Link>
          <Link
            to="/shop"
            className="hidden gradient-gold rounded-sm px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] transition-transform hover:scale-[1.02] md:inline-block"
          >
            SHOP NOW
          </Link>
          <button aria-label="Search" className="rounded-full p-2 text-foreground/80 hover:text-gold">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/wishlist" className="relative rounded-full p-2 text-foreground/80 hover:text-gold" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-gold-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 text-foreground/80 hover:text-gold" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0 -top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-gold-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link to="/account" className="hidden rounded-full p-2 text-foreground/80 hover:text-gold md:block" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}