import { createFileRoute } from "@tanstack/react-router";
import { formatNaira, mockBookings } from "@/lib/data";
import { Badge } from "./admin.index";

export const Route = createFileRoute("/admin/bookings")({ component: AdminBookings });

function AdminBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Bookings</h1>
        <p className="text-sm text-muted-foreground">Manage upcoming appointments and services.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[["Today", "3"], ["This week", "12"], ["Revenue (mo)", formatNaira(890000)]].map(([l, v]) => (
          <div key={l} className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5">
            <div className="text-[10px] tracking-[0.2em] text-muted-foreground">{l.toUpperCase()}</div>
            <div className="font-serif text-2xl text-gold">{v}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-3">
        {mockBookings.map((b) => (
          <div key={b.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border border-border/60 bg-[color:var(--surface)] p-4">
            <div className="grid h-14 w-14 place-items-center rounded-sm border border-gold/60 bg-gold/10 text-center text-[10px] text-gold">
              <div><div className="font-bold text-sm">{b.time.split(" ")[0]}</div><div>{b.time.split(" ")[1]}</div></div>
            </div>
            <div className="min-w-0">
              <div className="font-semibold">{b.customer} — {b.service}</div>
              <div className="text-xs text-muted-foreground">{b.date} · {b.id} · {formatNaira(b.price)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge s={b.status} />
              <button className="hidden rounded-sm border border-border px-3 py-1.5 text-xs hover:border-gold/60 md:inline-block">Reschedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}