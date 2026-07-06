import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 border-t border-border/60 bg-[color:var(--surface)] pb-24 pt-16 md:pb-16">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-serif text-xl tracking-[0.25em] text-gold">SOTA HAIR</div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium 100% virgin human hair wigs. Crafted for queens who deserve nothing but the best.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="rounded-full border border-border p-2.5 text-foreground/70 hover:border-gold hover:text-gold">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Collections" links={[["/collections", "Bone Straight"], ["/collections", "Curly"], ["/collections", "Water Wave"], ["/collections", "Deep Wave"], ["/collections", "Bob Wigs"], ["/collections", "Frontal"], ["/collections", "Raw Hair"]]} />
        <FooterCol title="Services" links={[["/booking", "Wig Installation"], ["/booking", "Hair Styling"], ["/booking", "Wig Revamp"], ["/account", "Loyalty Program"], ["/account", "Track My Order"]]} />
        <FooterCol title="Help" links={[["/about", "FAQ"], ["/about", "Shipping & Delivery"], ["/about", "Returns & Refunds"], ["/about", "Contact Us"], ["/about", "WhatsApp Support"]]} />
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col items-center justify-between gap-4 border-t border-border/60 px-4 pt-6 text-xs text-muted-foreground md:flex-row md:px-8">
        <div>© 2026 SOTA HAIR. All rights reserved.</div>
        <div className="flex gap-4">
          <span>We accept:</span>
          {["Paystack", "Flutterwave", "Apple Pay", "Google Pay"].map((p) => (
            <span key={p} className="rounded border border-border px-2 py-1">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-gold">{title.toUpperCase()}</div>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map(([to, label]) => (
          <li key={label}>
            <Link to={to} className="transition-colors hover:text-gold">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}