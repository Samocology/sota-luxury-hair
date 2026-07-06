import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create Account — SOTA HAIR" }] }),
  component: SignUp,
});

function SignUp() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 md:py-24">
      <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">JOIN THE QUEENS</div>
      <h1 className="mt-2 font-serif text-5xl">Create Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-gold underline">Sign in</Link></p>

      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <Input label="First name" placeholder="Adaeze" />
          <Input label="Last name" placeholder="Okafor" />
        </div>
        <Input label="Email address" type="email" placeholder="adaeze@email.com" />
        <Input label="Phone number" placeholder="+234…" />
        <Input label="Password" type="password" placeholder="••••••••••" />
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="mt-0.5 accent-[color:var(--gold)]" /> Send me exclusive drops, early access & 10% off my first order.
        </label>
        <button className="w-full gradient-gold rounded-sm py-3.5 text-xs font-bold tracking-[0.3em]">CREATE ACCOUNT</button>
      </form>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">{label.toUpperCase()}</label>
      <input {...props} className="w-full rounded-sm border border-border bg-input px-3 py-3.5 text-sm outline-none focus:border-gold" />
    </div>
  );
}