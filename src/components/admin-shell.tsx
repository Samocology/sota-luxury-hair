import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { BarChart3, Calendar, LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Users, Menu, Bell, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-border/60 bg-[color:var(--sidebar)] transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0", open && "translate-x-0")}>
        <div className="flex h-16 items-center gap-3 border-b border-border/60 px-6">
          <div className="grid h-8 w-8 place-items-center rounded-sm bg-gold text-gold-foreground font-serif font-bold">S</div>
          <div>
            <div className="font-serif text-sm tracking-[0.2em] text-gold">SOTA</div>
            <div className="text-[9px] tracking-[0.2em] text-muted-foreground">ADMIN CONSOLE</div>
          </div>
        </div>
        <nav className="p-3">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "mb-1 flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors",
                  active ? "bg-gold/10 text-gold" : "text-foreground/80 hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                {n.label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-3 bottom-3">
          <Link to="/" className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted">
            <LogOut className="h-4 w-4" /> Back to store
          </Link>
        </div>
      </aside>
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/60 md:hidden" />}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/60 bg-background/95 px-4 backdrop-blur md:px-8">
          <button onClick={() => setOpen((o) => !o)} className="md:hidden"><Menu className="h-5 w-5" /></button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search orders, products, customers…" className="w-full rounded-sm border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-gold" />
          </div>
          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <button className="relative rounded-full p-2 hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
            </button>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gold/20 text-xs font-bold text-gold">AD</div>
              <div className="hidden text-xs md:block">
                <div className="font-semibold">Admin</div>
                <div className="text-muted-foreground">Super admin</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}