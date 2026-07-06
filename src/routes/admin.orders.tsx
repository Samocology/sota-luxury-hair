import { createFileRoute } from "@tanstack/react-router";
import { formatNaira, mockOrders } from "@/lib/data";
import { Badge } from "./admin.index";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

function AdminOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Orders</h1>
        <p className="text-sm text-muted-foreground">{mockOrders.length} total orders</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((t, i) => (
          <button key={t} className={`rounded-sm border px-3 py-1.5 text-[11px] tracking-widest ${i === 0 ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/60"}`}>{t.toUpperCase()}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-md border border-border/60 bg-[color:var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-border/60 bg-muted/40 text-left text-[10px] tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">ORDER</th>
                <th className="p-3 font-medium">CUSTOMER</th>
                <th className="p-3 font-medium">DATE</th>
                <th className="p-3 font-medium">ITEMS</th>
                <th className="p-3 font-medium">TOTAL</th>
                <th className="p-3 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {mockOrders.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <td className="p-3 font-mono text-xs text-gold">{o.id}</td>
                  <td className="p-3"><div>{o.customer}</div><div className="text-[10px] text-muted-foreground">{o.email}</div></td>
                  <td className="p-3 text-muted-foreground">{o.date}</td>
                  <td className="p-3">{o.items}</td>
                  <td className="p-3 font-semibold text-gold">{formatNaira(o.total)}</td>
                  <td className="p-3"><Badge s={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}