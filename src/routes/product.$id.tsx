import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, Shield, Sparkles, Truck } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart";
import { formatNaira, productBySlug, products } from "@/lib/data";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = productBySlug(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.product.name} — SOTA HAIR` }, { name: "description", content: `${loaderData.product.name} — premium virgin human hair wig.` }]
      : [{ title: "Product — SOTA HAIR" }],
  }),
  notFoundComponent: () => <div className="mx-auto max-w-2xl px-4 py-24 text-center"><h1 className="font-serif text-3xl">Product not found</h1><Link to="/shop" className="mt-4 inline-block text-gold underline">Back to shop</Link></div>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, toggleWish, wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [length, setLength] = useState(product.length);
  const wished = wishlist.includes(product.id);
  const related = products.filter((p) => p.collection === product.collection && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 md:py-14">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop" className="hover:text-gold">Shop</Link> / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 md:gap-14">
        <div className="space-y-3">
          <div className="aspect-[4/5] overflow-hidden rounded-md border border-border/60 bg-[color:var(--surface)]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <div key={i} className={`aspect-square overflow-hidden rounded-sm border ${i === 0 ? "border-gold" : "border-border/60"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          {product.badge && <div className="mb-2 inline-block rounded-sm bg-gold px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-gold-foreground">{product.badge}</div>}
          <h1 className="font-serif text-3xl md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="text-gold">★★★★★</span>
            <span className="text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <span className="font-serif text-4xl text-gold">{formatNaira(product.price)}</span>
            {product.compareAt && <span className="text-lg text-muted-foreground line-through">{formatNaira(product.compareAt)}</span>}
          </div>
          <p className="mt-5 max-w-lg text-sm text-muted-foreground">
            Premium 100% virgin human hair. Ethically sourced from a single donor. Undetectable HD lace, pre-plucked hairline, bleached knots. Comes with satin bonnet, wig cap and gentle care card.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <div className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">LENGTH</div>
              <div className="flex flex-wrap gap-2">
                {['14"', '18"', '22"', '26"', '30"'].map((l) => (
                  <button key={l} onClick={() => setLength(l)} className={`rounded-sm border px-4 py-2 text-sm ${length === l ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/60"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">DENSITY</div>
              <div className="flex flex-wrap gap-2">
                {["130%", "150%", "180%", "200%"].map((d) => (
                  <button key={d} className={`rounded-sm border px-4 py-2 text-sm ${d === product.density ? "border-gold bg-gold text-gold-foreground" : "border-border hover:border-gold/60"}`}>{d}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-sm border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center hover:text-gold"><Minus className="h-4 w-4" /></button>
              <div className="w-10 text-center text-sm font-semibold">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center hover:text-gold"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(product.id, qty)} className="flex-1 gradient-gold rounded-sm px-6 py-3.5 text-xs font-bold tracking-[0.2em]">
              ADD TO CART · {formatNaira(product.price * qty)}
            </button>
            <button onClick={() => toggleWish(product.id)} className={`grid h-11 w-11 place-items-center rounded-sm border ${wished ? "border-gold text-gold" : "border-border hover:border-gold/60"}`}>
              <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[[Truck, "Free delivery ₦150K+"], [Shield, "1-year quality guarantee"], [Sparkles, "Free wig cap & bonnet"]].map(([Icon, label], i) => {
              const I = Icon as typeof Truck;
              return (
                <div key={i} className="flex items-center gap-2 rounded-sm border border-border/60 bg-[color:var(--surface)] p-3">
                  <I className="h-4 w-4 text-gold" />
                  <span>{label as string}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-serif text-2xl md:text-3xl">You may also love</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}