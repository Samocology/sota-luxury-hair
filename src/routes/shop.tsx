import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { collections, products } from "@/lib/data";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Wigs — SOTA HAIR" },
      { name: "description", content: "Shop premium 100% virgin human hair wigs. Free delivery on orders above ₦150,000." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [filters, setFilters] = useState<{ collection: string[]; badge: string | null }>({ collection: [], badge: null });
  const [sort, setSort] = useState("bestsellers");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = products.filter((p) =>
      (filters.collection.length === 0 || filters.collection.includes(p.collection)) &&
      (!filters.badge || (filters.badge === "sale" ? !!p.compareAt : p.badge === filters.badge)) &&
      (!q || p.name.toLowerCase().includes(q.toLowerCase())),
    );
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [filters, sort, q]);

  const toggleCol = (slug: string) =>
    setFilters((f) => ({ ...f, collection: f.collection.includes(slug) ? f.collection.filter((s) => s !== slug) : [...f.collection, slug] }));

  return (
    <div>
      <div className="border-b border-border/60 bg-[color:var(--surface)] py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">100% VIRGIN HUMAN HAIR</div>
          <h1 className="mt-2 font-serif text-4xl md:text-6xl">Shop All Wigs</h1>
          <p className="mt-2 text-sm text-muted-foreground">Handcrafted for queens. Free delivery on orders above ₦150,000.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-10 md:grid-cols-[240px_1fr] md:gap-8 md:px-8">
        <aside className="hidden md:block">
          <div className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-gold">FILTER BY</div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search wigs…"
            className="mb-6 w-full rounded-sm border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
          <FilterGroup title="Collection">
            {collections.map((c) => (
              <label key={c.slug} className="flex cursor-pointer items-center justify-between gap-2 py-1.5 text-sm">
                <span className="flex items-center gap-2">
                  <input type="checkbox" checked={filters.collection.includes(c.slug)} onChange={() => toggleCol(c.slug)} className="accent-[color:var(--gold)]" />
                  {c.name}
                </span>
                <span className="text-xs text-muted-foreground">({c.count})</span>
              </label>
            ))}
          </FilterGroup>
          <FilterGroup title="Lace Type">
            {["13x4 HD", "13x6 HD", "4x4 Closure", "Full Lace", "5x5 Closure"].map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                <input type="checkbox" className="accent-[color:var(--gold)]" /> {t}
              </label>
            ))}
          </FilterGroup>
          <FilterGroup title="Length">
            {["12 – 16 inches", "18 – 22 inches", "24 – 28 inches", "30 inches +"].map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                <input type="checkbox" className="accent-[color:var(--gold)]" /> {t}
              </label>
            ))}
          </FilterGroup>
          <FilterGroup title="Price Range">
            {["Under ₦100,000", "₦100K – ₦200K", "₦200K – ₦300K", "Above ₦300K"].map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                <input type="checkbox" className="accent-[color:var(--gold)]" /> {t}
              </label>
            ))}
          </FilterGroup>
          <button className="mt-4 w-full gradient-gold rounded-sm py-3 text-[11px] font-bold tracking-[0.2em]">APPLY FILTERS</button>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">Showing <span className="text-foreground">{list.length}</span> wigs</div>
            <div className="flex flex-wrap items-center gap-2">
              {(["all", "BESTSELLER", "NEW", "sale", "TRENDING"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setFilters((f) => ({ ...f, badge: b === "all" ? null : b }))}
                  className={`rounded-sm border px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] transition-colors ${((b === "all" && !filters.badge) || filters.badge === b) ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/60"}`}
                >
                  {b === "all" ? "ALL" : b === "sale" ? "ON SALE" : b}
                </button>
              ))}
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-sm border border-border bg-input px-3 py-1.5 text-xs outline-none">
                <option value="bestsellers">Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {list.length === 0 && (
            <div className="grid place-items-center rounded-md border border-border/60 py-20 text-center text-muted-foreground">
              No wigs match those filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 border-b border-border/60 pb-5">
      <div className="mb-2 text-[11px] font-semibold tracking-[0.25em] text-foreground/80">{title.toUpperCase()}</div>
      {children}
    </div>
  );
}