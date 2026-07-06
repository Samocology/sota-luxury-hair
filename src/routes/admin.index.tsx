import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatNaira, mockBookings, mockOrders, products, revenueSeries } from "@/lib/data";

export const Route = createFileRoute("/admin/")({ component: Overview });

function Overview() {
  const totalRevenue = revenueSeries.reduce((a, b) => a + b.v, 0);
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Overview</h1>
          <p className="text-sm text-muted-foreground">Welcome back — here's what's happening in your store today.</p>
        </div>
        <div className="flex gap-2">
          <select className="rounded-sm border border-border bg-input px-3 py-2 text-xs outline-none"><option>Last 7 days</option><option>Last 30 days</option><option>This year</option></select>
          <button className="gradient-gold rounded-sm px-4 py-2 text-[11px] font-bold tracking-[0.2em]">EXPORT</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={DollarSign} label="Revenue" value={formatNaira(totalRevenue)} change="+18.2%" />
        <Stat icon={ShoppingCart} label="Orders" value="1,284" change="+9.4%" />
        <Stat icon={Users} label="Customers" value="10,432" change="+12.1%" />
        <Stat icon={Package} label="Products in stock" value={String(products.reduce((a, b) => a + b.stock, 0))} change="-2.3%" negative />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Revenue</div>
              <div className="font-serif text-2xl">{formatNaira(totalRevenue)}</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400"><TrendingUp className="h-3 w-3" />+18.2% vs last period</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${(v/1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 12 }} />
                <Area dataKey="v" stroke="var(--gold)" fill="url(#g)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-semibold">Top products</div>
            <Link to="/admin/products" className="text-[10px] tracking-[0.2em] text-gold">VIEW ALL</Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt="" className="h-10 w-10 shrink-0 rounded-sm object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground">{p.reviews} sold</div>
                </div>
                <div className="text-sm font-semibold text-gold">{formatNaira(p.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Recent orders" href="/admin/orders">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] tracking-[0.15em] text-muted-foreground">
              <tr><th className="pb-2 font-medium">ORDER</th><th className="pb-2 font-medium">CUSTOMER</th><th className="pb-2 font-medium">TOTAL</th><th className="pb-2 font-medium">STATUS</th></tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {mockOrders.slice(0, 5).map((o) => (
                <tr key={o.id}>
                  <td className="py-2.5 font-mono text-xs">{o.id}</td>
                  <td className="py-2.5">{o.customer}</td>
                  <td className="py-2.5 text-gold">{formatNaira(o.total)}</td>
                  <td className="py-2.5"><Badge s={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel title="Upcoming bookings" href="/admin/bookings">
          <div className="divide-y divide-border/60">
            {mockBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 py-2.5 text-sm">
                <div className="grid h-10 w-10 place-items-center rounded-sm border border-gold/60 bg-gold/10 text-[10px] text-gold">{b.time.split(" ")[0]}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate">{b.customer} — {b.service}</div>
                  <div className="text-[10px] text-muted-foreground">{b.date}</div>
                </div>
                <Badge s={b.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, change, negative }: { icon: typeof DollarSign; label: string; value: string; change: string; negative?: boolean }) {
  return (
    <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5">
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-sm bg-gold/10 text-gold"><Icon className="h-4 w-4" /></div>
        <div className={`flex items-center gap-1 text-[11px] ${negative ? "text-destructive" : "text-emerald-400"}`}>
          <ArrowUpRight className={`h-3 w-3 ${negative ? "rotate-90" : ""}`} /> {change}
        </div>
      </div>
      <div className="mt-4 text-[10px] tracking-[0.2em] text-muted-foreground">{label.toUpperCase()}</div>
      <div className="font-serif text-2xl">{value}</div>
    </div>
  );
}

function Panel({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <Link to={href} className="text-[10px] tracking-[0.2em] text-gold">VIEW ALL</Link>
      </div>
      {children}
    </div>
  );
}

export function Badge({ s }: { s: string }) {
  const c: Record<string, string> = {
    Delivered: "bg-emerald-500/20 text-emerald-300",
    Shipped: "bg-sky-500/20 text-sky-300",
    Processing: "bg-amber-500/20 text-amber-300",
    Pending: "bg-muted text-muted-foreground",
    Cancelled: "bg-destructive/20 text-destructive",
    Confirmed: "bg-emerald-500/20 text-emerald-300",
  };
  return <span className={`rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-widest ${c[s] || "bg-muted"}`}>{s.toUpperCase()}</span>;
}