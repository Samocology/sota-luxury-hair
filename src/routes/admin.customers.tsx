import { createFileRoute } from "@tanstack/react-router";
import { formatNaira, mockCustomers } from "@/lib/data";

export const Route = createFileRoute("/admin/customers")({ component: AdminCustomers });

function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Customers</h1>
        <p className="text-sm text-muted-foreground">{mockCustomers.length.toLocaleString()}+ registered queens</p>
      </div>
      <div className="overflow-hidden rounded-md border border-border/60 bg-[color:var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-border/60 bg-muted/40 text-left text-[10px] tracking-[0.15em] text-muted-foreground">
              <tr><th className="p-3 font-medium">CUSTOMER</th><th className="p-3 font-medium">EMAIL</th><th className="p-3 font-medium">ORDERS</th><th className="p-3 font-medium">SPENT</th><th className="p-3 font-medium">JOINED</th></tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {mockCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/20 text-xs font-bold text-gold">{c.name.split(" ").map((n) => n[0]).join("")}</div>
                      <div><div className="font-medium">{c.name}</div><div className="text-[10px] text-muted-foreground">{c.id}</div></div>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{c.email}</td>
                  <td className="p-3">{c.orders}</td>
                  <td className="p-3 font-semibold text-gold">{formatNaira(c.spent)}</td>
                  <td className="p-3 text-muted-foreground">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}