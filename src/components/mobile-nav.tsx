import { Link, useRouterState } from "@tanstack/react-router";
import { Calendar, Home, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/shop", icon: Search, label: "Shop" },
  { to: "/booking", icon: Calendar, label: "Book" },
  { to: "/cart", icon: ShoppingBag, label: "Cart" },
  { to: "/account", icon: User, label: "Me" },
] as const;

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();
  if (path.startsWith("/admin")) return null;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <ul className="grid grid-cols-5">
        {tabs.map((t) => {
          const active = t.to === "/" ? path === "/" : path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium tracking-wider transition-colors",
                  active ? "text-gold" : "text-muted-foreground",
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.2 : 1.6} />
                  {t.to === "/cart" && count > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-gold-foreground">
                      {count}
                    </span>
                  )}
                </div>
                {t.label.toUpperCase()}
                {active && <span className="absolute -top-px h-0.5 w-8 rounded-b-full bg-gold" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}