import { createFileRoute } from "@tanstack/react-router";
import { Crown, Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatNaira, services } from "@/lib/data";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [{ title: "Book a Session — SOTA HAIR" }] }),
  component: Booking,
});

const iconMap = { sparkles: Sparkles, scissors: Scissors, crown: Crown } as const;

function Booking() {
  const [service, setService] = useState(services[0]);
  const [time, setTime] = useState("11:00 AM");
  const [date, setDate] = useState("2026-07-08");
  return (
    <div>
      <div className="border-b border-border/60 bg-[color:var(--surface)] py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">PROFESSIONAL SERVICES</div>
          <h1 className="mt-2 font-serif text-4xl md:text-6xl">Book a Session</h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">Our talented stylists bring out the best in every wig. Choose your service, pick a time, and we'll take it from there.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 md:grid-cols-3 md:gap-10 md:px-8">
        <div className="space-y-4 md:col-span-1">
          {services.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            const active = service.id === s.id;
            return (
              <button key={s.id} onClick={() => setService(s)} className={`flex w-full items-start gap-4 rounded-md border p-5 text-left transition-colors ${active ? "border-gold bg-gold/5" : "border-border/60 hover:border-gold/60"}`}>
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-sm ${active ? "bg-gold text-gold-foreground" : "border border-gold/60 bg-gold/10 text-gold"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm font-bold text-gold">{formatNaira(s.price)}</div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-6 md:col-span-2 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl">Your appointment</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">DATE</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">STYLIST</label>
              <select className="w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold"><option>Any available</option><option>Chloe A.</option><option>Ada B.</option><option>Nkiru O.</option></select>
            </div>
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">TIME SLOT</label>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"].map((t) => (
                <button key={t} onClick={() => setTime(t)} className={`rounded-sm border px-2 py-2.5 text-xs ${time === t ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/60"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input placeholder="Your name" className="w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold" />
            <input placeholder="Phone number" className="w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold" />
          </div>
          <textarea placeholder="Notes (optional)" rows={3} className="mt-4 w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold" />
          <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground">TOTAL — {service.name}</div>
              <div className="font-serif text-3xl text-gold">{formatNaira(service.price)}</div>
            </div>
            <button onClick={() => toast.success("Booking confirmed! Check your email.")} className="gradient-gold rounded-sm px-6 py-3.5 text-xs font-bold tracking-[0.2em]">
              CONFIRM BOOKING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}