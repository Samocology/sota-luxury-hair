import { createFileRoute, Link } from "@tanstack/react-router";
import { collections, productsByCollection } from "@/lib/data";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — SOTA HAIR" },
      { name: "description", content: "Explore our curated wig collections — bone straight, curly, water wave, deep wave and more." },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div>
      <div className="border-b border-border/60 bg-[color:var(--surface)] py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">BROWSE BY STYLE</div>
          <h1 className="mt-2 font-serif text-4xl md:text-6xl">Our Collections</h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">Every texture, every finish. Curated for queens who know exactly what they want.</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1400px] gap-4 px-4 py-10 md:grid-cols-3 md:gap-6 md:px-8">
        {collections.map((c) => {
          const count = productsByCollection(c.slug).length;
          return (
            <Link key={c.slug} to="/shop" className="group relative aspect-[3/4] overflow-hidden rounded-md border border-border/60">
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="text-[10px] tracking-[0.25em] text-gold">{count} STYLES</div>
                <div className="mt-1 font-serif text-2xl md:text-3xl">{c.name}</div>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold">
                  SHOP COLLECTION →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}