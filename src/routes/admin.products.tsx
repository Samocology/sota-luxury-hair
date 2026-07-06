import { createFileRoute } from "@tanstack/react-router";
import { Edit, Plus, Trash2 } from "lucide-react";
import { formatNaira, products } from "@/lib/data";

export const Route = createFileRoute("/admin/products")({ component: AdminProducts });

function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="font-serif text-3xl">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} products · {products.reduce((a, b) => a + b.stock, 0)} in stock</p>
        </div>
        <button className="gradient-gold inline-flex items-center gap-2 rounded-sm px-4 py-2 text-[11px] font-bold tracking-[0.2em]"><Plus className="h-3.5 w-3.5" /> ADD PRODUCT</button>
      </div>
      <div className="overflow-hidden rounded-md border border-border/60 bg-[color:var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-border/60 bg-muted/40 text-left text-[10px] tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">PRODUCT</th>
                <th className="p-3 font-medium">COLLECTION</th>
                <th className="p-3 font-medium">PRICE</th>
                <th className="p-3 font-medium">STOCK</th>
                <th className="p-3 font-medium">RATING</th>
                <th className="p-3 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-10 w-10 rounded-sm object-cover" />
                      <div><div className="font-medium">{p.name}</div><div className="text-[10px] text-muted-foreground">{p.id}</div></div>
                    </div>
                  </td>
                  <td className="p-3 capitalize">{p.collection.replace("-", " ")}</td>
                  <td className="p-3 font-semibold text-gold">{formatNaira(p.price)}</td>
                  <td className="p-3"><span className={`rounded-sm px-2 py-0.5 text-[10px] font-bold ${p.stock < 10 ? "bg-destructive/20 text-destructive" : "bg-emerald-500/20 text-emerald-300"}`}>{p.stock}</span></td>
                  <td className="p-3 text-gold">★ {p.rating}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button className="grid h-8 w-8 place-items-center rounded-sm border border-border hover:border-gold/60 hover:text-gold"><Edit className="h-3.5 w-3.5" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-sm border border-border hover:border-destructive/60 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}