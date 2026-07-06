import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Crown, Scissors, Sparkles, Star } from "lucide-react";
import heroModel from "@/assets/hero-model.jpg";
import { ProductCard } from "@/components/product-card";
import { collections, products, services, testimonials, formatNaira } from "@/lib/data";

export const Route = createFileRoute("/")({ component: Index });

const iconMap = { sparkles: Sparkles, scissors: Scissors, crown: Crown } as const;

function Index() {
  const bestsellers = products.slice(0, 4);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroModel} alt="" className="h-full w-full object-cover object-right md:object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent md:from-background md:via-background/70" />
        </div>
        <div className="relative mx-auto grid min-h-[600px] max-w-[1400px] items-center px-4 py-16 md:min-h-[720px] md:px-8 md:py-24">
          <div className="max-w-xl">
            <div className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-gold">
              THE PREMIUM COLLECTION — 2026
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
              Luxury Hair
              <br />
              <span className="italic text-gold">For Every Queen</span>
            </h1>
            <p className="mt-6 max-w-md text-sm text-muted-foreground md:text-base">
              Handcrafted 100% virgin human hair wigs. Undetectable HD lace. Flawless finish — made for royalty.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="gradient-gold rounded-sm px-6 py-3 text-xs font-bold tracking-[0.2em]">
                SHOP WIGS
              </Link>
              <Link to="/collections" className="rounded-sm border border-gold/60 px-6 py-3 text-xs font-bold tracking-[0.2em] text-gold hover:bg-gold/10">
                EXPLORE COLLECTIONS
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                ["10K+", "Happy Queens"],
                ["100%", "Virgin Hair"],
                ["4.9★", "Avg Rating"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-2xl text-gold">{n}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">BROWSE BY STYLE</div>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl">Our Collections</h2>
          </div>
          <Link to="/collections" className="hidden text-[11px] font-semibold tracking-[0.2em] text-gold hover:underline md:block">
            VIEW ALL COLLECTIONS →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              className="group relative aspect-[4/3] overflow-hidden rounded-md border border-border/60"
            >
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
                <span className="font-serif text-lg md:text-2xl">{c.name}</span>
                <span className="rounded-sm border border-gold/70 bg-background/70 px-2 py-1 text-[9px] font-bold tracking-widest text-gold opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  SHOP
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="bg-[color:var(--surface)] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">HANDPICKED FOR YOU</div>
              <h2 className="mt-2 font-serif text-3xl md:text-5xl">Bestsellers</h2>
            </div>
            <Link to="/shop" className="hidden text-[11px] font-semibold tracking-[0.2em] text-gold hover:underline md:block">
              VIEW ALL PRODUCTS →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">PROFESSIONAL SERVICES</div>
            <h2 className="mt-2 font-serif text-3xl md:text-5xl">Book a Session</h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Our talented stylists bring out the best in every wig. Book your appointment online and pay securely.
            </p>
            <div className="mt-8 space-y-4">
              {services.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap];
                return (
                  <div key={s.id} className="flex items-start gap-4 border-b border-border/60 pb-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/60 bg-gold/10 text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-sm font-bold text-gold">{formatNaira(s.price)}</div>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-6 md:p-8">
            <div className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-gold">SCHEDULE YOUR APPOINTMENT</div>
            <div className="space-y-5">
              <Field label="Select Service">
                <select className="w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold">
                  {services.map((s) => <option key={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date"><input type="date" defaultValue="2026-07-08" className="w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold" /></Field>
                <Field label="Stylist"><select className="w-full rounded-sm border border-border bg-input px-3 py-3 text-sm outline-none focus:border-gold"><option>Any available</option><option>Chloe A.</option><option>Ada B.</option></select></Field>
              </div>
              <div>
                <div className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">CHOOSE TIME</div>
                <div className="grid grid-cols-3 gap-2">
                  {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "03:00 PM"].map((t, i) => (
                    <button
                      key={t}
                      className={`rounded-sm border px-2 py-2.5 text-xs transition-colors ${i === 2 ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/60"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-4">
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-muted-foreground">TOTAL</div>
                  <div className="font-serif text-2xl text-gold">₦25,000</div>
                </div>
                <Link to="/booking" className="gradient-gold rounded-sm px-6 py-3 text-[11px] font-bold tracking-[0.2em]">
                  BOOK & PAY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[color:var(--surface)] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">REAL QUEENS. REAL REVIEWS.</div>
              <h2 className="mt-2 font-serif text-3xl md:text-5xl">What Our Customers Say</h2>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-serif text-3xl text-gold">4.9</span>
              <span className="text-gold">★★★★★</span>
              <span className="text-muted-foreground">from 2,400+ reviews</span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-4 rounded-md border border-border/60 bg-background p-5">
                <div className="text-gold text-sm">★★★★★</div>
                <p className="text-sm text-foreground/85">"{t.quote}"</p>
                <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/20 text-xs font-semibold text-gold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-[10px] tracking-widest text-muted-foreground">{t.handle.toUpperCase()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">{label.toUpperCase()}</div>
      {children}
    </div>
  );
}
