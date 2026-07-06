import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Search, ChevronRight, Clock, Truck, CheckCircle, XCircle, Filter } from "lucide-react";
import { useState } from "react";
import { formatNaira } from "@/lib/data";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "My Orders — SOTA HAIR" }] }),
  component: Orders,
});

const allOrders = [
  { id: "SOT-2024-0892", date: "Dec 15, 2024", items: 3, total: 1250000, status: "Delivered", tracking: "1Z999AA10123456784" },
  { id: "SOT-2024-0915", date: "Dec 28, 2024", items: 1, total: 450000, status: "Shipped", tracking: "1Z999AA10123456785" },
  { id: "SOT-2025-0003", date: "Jan 3, 2025", items: 2, total: 890000, status: "Processing", tracking: null },
  { id: "SOT-2025-0012", date: "Jan 10, 2025", items: 1, total: 380000, status: "Pending", tracking: null },
  { id: "SOT-2024-0780", date: "Nov 20, 2024", items: 4, total: 2100000, status: "Delivered", tracking: "1Z999AA10123456786" },
  { id: "SOT-2024-0815", date: "Dec 1, 2024", items: 1, total: 680000, status: "Cancelled", tracking: null },
];

const statusIcons = {
  Delivered: CheckCircle,
  Shipped: Truck,
  Processing: Clock,
  Pending: Clock,
  Cancelled: XCircle,
};

const filters = ["All", "Delivered", "Shipped", "Processing", "Pending", "Cancelled"];

function Orders() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 md:py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
                Order History
              </div>
              <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
                My Orders
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID..."
              className="w-full h-12 rounded-xl border border-border/60 bg-card pl-11 pr-4 text-sm focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? "bg-gold text-white shadow-sm"
                    : "border border-border/60 bg-card text-muted-foreground hover:border-gold/30 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
              return (
                <div
                  key={order.id}
                  className="group rounded-xl border border-border/60 bg-card p-5 sm:p-6 transition-all hover:border-gold/30 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`hidden sm:flex h-12 w-12 items-center justify-center rounded-xl ${statusBg(order.status)}`}>
                        <StatusIcon className={`h-5 w-5 ${statusIconColor(order.status)}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="text-base font-semibold">{order.id}</p>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{order.date}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                          <span className="text-muted-foreground">{order.items} {order.items === 1 ? "item" : "items"}</span>
                          <span className="hidden sm:inline text-border">•</span>
                          <span className="font-semibold text-gold">{formatNaira(order.total)}</span>
                        </div>
                        {order.tracking && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Tracking: <span className="font-mono text-foreground">{order.tracking}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <Link
                      to="/account"
                      className="flex items-center gap-1 self-end text-sm font-medium text-gold hover:text-gold/80 transition-colors sm:self-center"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Package className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold">No orders found</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              {search ? "Try a different search term or filter." : "You haven't placed any orders yet."}
            </p>
            {!search && (
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-white hover:bg-gold/90 transition-colors"
              >
                Start Shopping
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function statusBg(s: string) {
  return {
    Delivered: "bg-emerald-500/10",
    Shipped: "bg-sky-500/10",
    Processing: "bg-amber-500/10",
    Pending: "bg-muted",
    Cancelled: "bg-destructive/10",
  }[s] || "bg-muted";
}

function statusIconColor(s: string) {
  return {
    Delivered: "text-emerald-600",
    Shipped: "text-sky-600",
    Processing: "text-amber-600",
    Pending: "text-muted-foreground",
    Cancelled: "text-destructive",
  }[s] || "text-muted-foreground";
}

function statusBadge(s: string) {
  return {
    Delivered: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    Shipped: "bg-sky-500/10 text-sky-600 border border-sky-500/20",
    Processing: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
    Pending: "bg-muted text-muted-foreground border border-border",
    Cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
  }[s] || "bg-muted text-muted-foreground border border-border";
}