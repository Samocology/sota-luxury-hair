import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — SOTA HAIR" }] }),
  component: CartPage,
});

function CartPage() {
  const { hydrated, setQty, remove, subtotal, clear } = useCart();
  const shipping = subtotal > 150000 || subtotal === 0 ? 0 : 5000;
  const items = hydrated.items;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mb-4 inline-grid h-16 w-16 place-items-center rounded-full border border-border">
          <ShoppingBag className="h-7 w-7 text-gold" />
        </div>
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start with our bestsellers — free delivery over ₦150,000.</p>
        <Link to="/shop" className="mt-6 inline-block gradient-gold rounded-sm px-6 py-3 text-xs font-bold tracking-[0.2em]">SHOP NOW</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-8 font-serif text-4xl md:text-5xl">Your Cart <span className="text-muted-foreground text-lg">({items.length})</span></h1>
      <div className="grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="divide-y divide-border/60 rounded-md border border-border/60 bg-[color:var(--surface)]">
          {items.map((i) => (
            <div key={i.id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-4 md:grid-cols-[100px_1fr_auto_auto] md:p-5">
              <img src={i.product.image} alt={i.product.name} className="aspect-square w-20 rounded-sm object-cover md:w-24" />
              <div className="min-w-0">
                <div className="truncate font-semibold">{i.product.name}</div>
                <div className="text-xs text-muted-foreground">{i.product.density} · {i.product.lace} · {i.product.length}</div>
                <div className="mt-2 md:hidden font-semibold text-gold">{formatNaira(i.product.price * i.qty)}</div>
              </div>
              <div className="flex items-center rounded-sm border border-border">
                <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-9 w-9 place-items-center hover:text-gold"><Minus className="h-3.5 w-3.5" /></button>
                <div className="w-8 text-center text-sm">{i.qty}</div>
                <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-9 w-9 place-items-center hover:text-gold"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="w-28 text-right font-semibold text-gold">{formatNaira(i.product.price * i.qty)}</div>
                <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
              <button onClick={() => remove(i.id)} className="col-span-3 justify-self-end text-xs text-muted-foreground hover:text-destructive md:hidden">Remove</button>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-md border border-border/60 bg-[color:var(--surface)] p-6">
          <div className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-gold">ORDER SUMMARY</div>
          <div className="space-y-2 text-sm">
            <Row l="Subtotal" v={formatNaira(subtotal)} />
            <Row l="Shipping" v={shipping === 0 ? "FREE" : formatNaira(shipping)} />
            <Row l="Estimated tax" v={formatNaira(Math.round(subtotal * 0.075))} />
          </div>
          <div className="my-4 border-t border-border/60" />
          <div className="flex items-center justify-between">
            <div className="text-xs tracking-[0.2em] text-muted-foreground">TOTAL</div>
            <div className="font-serif text-2xl text-gold">{formatNaira(subtotal + shipping + Math.round(subtotal * 0.075))}</div>
          </div>
          <button className="mt-5 w-full gradient-gold rounded-sm py-3.5 text-xs font-bold tracking-[0.2em]">CHECKOUT</button>
          <button onClick={clear} className="mt-2 w-full py-2 text-xs text-muted-foreground hover:text-destructive">Clear cart</button>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px] text-muted-foreground">
            {["Paystack", "Flutterwave", "Apple Pay", "Google Pay"].map((p) => <span key={p} className="rounded border border-border px-2 py-1">{p}</span>)}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}