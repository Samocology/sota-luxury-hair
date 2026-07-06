import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl">Settings</h1>
        <p className="text-sm text-muted-foreground">Store preferences and integrations.</p>
      </div>

      <Section title="Store details">
        <Row label="Store name" value="SOTA HAIR" />
        <Row label="Contact email" value="hello@sotahair.com" />
        <Row label="Currency" value="Nigerian Naira (₦)" />
        <Row label="Timezone" value="Africa/Lagos (GMT+1)" />
      </Section>

      <Section title="Payments">
        {["Paystack", "Flutterwave", "Apple Pay", "Google Pay"].map((p) => (
          <div key={p} className="flex items-center justify-between border-b border-border/60 py-3 last:border-0">
            <div>
              <div className="font-medium">{p}</div>
              <div className="text-xs text-muted-foreground">Connected · live mode</div>
            </div>
            <span className="rounded-sm bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300">ACTIVE</span>
          </div>
        ))}
      </Section>

      <Section title="Shipping">
        <Row label="Free shipping threshold" value="₦150,000" />
        <Row label="Domestic (NG)" value="2 – 5 business days" />
        <Row label="International" value="5 – 10 business days" />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5">
      <div className="mb-4 text-[11px] font-semibold tracking-[0.3em] text-gold">{title.toUpperCase()}</div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-3 last:border-0">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}