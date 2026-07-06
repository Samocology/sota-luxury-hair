import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Sparkles, Truck } from "lucide-react";
import heroModel from "@/assets/hero-model.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — SOTA HAIR" }, { name: "description", content: "The story behind SOTA HAIR — luxury virgin human hair for queens." }] }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0"><img src={heroModel} alt="" className="h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" /></div>
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
          <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">OUR STORY</div>
          <h1 className="mt-2 font-serif text-4xl md:text-7xl">Crafted for the Queens<br /><span className="italic text-gold">Who Know Better.</span></h1>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base">
            SOTA HAIR was born from a simple obsession: hair so beautiful, so pure, so effortlessly luxurious that you never have to compromise. Every strand is 100% virgin human hair, ethically sourced from a single donor and hand-crafted into pieces that live up to a queen's crown.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-4">
          {[[Sparkles, "100% Virgin", "Single-donor virgin hair. No shedding. No tangling. Ever."], [Heart, "Handcrafted", "Every wig hand-tied by master craftswomen with 10+ years of experience."], [Award, "1-Year Guarantee", "Full quality guarantee on every piece we ship."], [Truck, "Global Delivery", "Free delivery in Nigeria on orders ₦150K+. Ships worldwide."]].map(([I, t, d]) => {
            const Icon = I as typeof Sparkles;
            return (
              <div key={t as string} className="rounded-md border border-border/60 bg-[color:var(--surface)] p-6">
                <Icon className="h-6 w-6 text-gold" />
                <div className="mt-4 font-serif text-xl">{t as string}</div>
                <p className="mt-2 text-xs text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 md:pb-24">
        <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">FAQ</div>
        <h2 className="mt-2 font-serif text-3xl md:text-5xl">Questions we get a lot</h2>
        <div className="mt-8 divide-y divide-border/60">
          {[
            ["Is your hair really 100% virgin?", "Yes — every bundle and wig is single-donor, ethically sourced, chemically untreated virgin human hair."],
            ["How long does the hair last?", "With proper care, our hair lasts 2–3 years or longer. We include a care guide with every order."],
            ["Do you ship internationally?", "Yes, we ship worldwide. Delivery in Nigeria is 2–5 business days; international is 5–10."],
            ["What's your return policy?", "Unopened, unworn wigs can be returned within 7 days for a full refund. Custom orders are final sale."],
            ["Do you offer installations?", "Yes! Book directly from the Booking page. We offer installation, revamp, styling and more."],
          ].map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                {q}<span className="text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}