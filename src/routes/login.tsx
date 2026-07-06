import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — SOTA HAIR" }] }),
  component: Login,
});

function Login() {
  const [show, setShow] = useState(false);
  return (
    <div className="mx-auto grid max-w-[1400px] px-4 py-10 md:grid-cols-2 md:gap-16 md:px-8 md:py-16">
      <div className="hidden flex-col justify-between rounded-md border border-border/60 bg-[color:var(--surface)] p-10 md:flex">
        <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">SOTA HAIR</div>
        <div>
          <h2 className="font-serif text-4xl leading-tight">Your Crown. <span className="italic text-gold">Your Story.</span></h2>
          <p className="mt-4 text-sm text-muted-foreground">Join 10,000+ queens who wear SOTA HAIR with confidence every day.</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (<div key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-gold/30 text-[10px] font-bold text-gold">Q{i}</div>))}
            </div>
            <span className="text-xs text-muted-foreground">+9,800 Queens</span>
          </div>
        </div>
      </div>

      <div className="max-w-md">
        <div className="text-[11px] font-semibold tracking-[0.3em] text-gold">WELCOME BACK</div>
        <h1 className="mt-2 font-serif text-5xl">Sign In</h1>
        <p className="mt-2 text-sm text-muted-foreground">Don't have an account? <Link to="/signup" className="text-gold underline">Create one free</Link></p>

        <div className="mt-8 space-y-3">
          <button className="flex w-full items-center justify-center gap-3 rounded-sm border border-border bg-[color:var(--surface)] py-3.5 text-sm hover:border-gold/60">
            <Mail className="h-4 w-4" /> Continue with Google
          </button>
          <button className="flex w-full items-center justify-center gap-3 rounded-sm border border-border bg-[color:var(--surface)] py-3.5 text-sm hover:border-gold/60">
            <MessageSquare className="h-4 w-4" /> Continue with OTP
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-[10px] tracking-[0.2em] text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> OR SIGN IN WITH EMAIL <div className="h-px flex-1 bg-border" />
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="email" placeholder="adaeze@email.com" className="w-full rounded-sm border border-border bg-input py-3.5 pl-10 pr-3 text-sm outline-none focus:border-gold" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">PASSWORD</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type={show ? "text" : "password"} placeholder="••••••••••" className="w-full rounded-sm border border-border bg-input py-3.5 pl-10 pr-10 text-sm outline-none focus:border-gold" />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold"><Eye className="h-4 w-4" /></button>
            </div>
            <div className="mt-2 text-right"><a className="text-xs text-gold underline">Forgot password?</a></div>
          </div>
          <button className="w-full gradient-gold rounded-sm py-3.5 text-xs font-bold tracking-[0.3em]">SIGN IN</button>
          <p className="text-center text-xs text-muted-foreground">By signing in you agree to our <a className="text-gold underline">Terms</a> and <a className="text-gold underline">Privacy Policy</a>.</p>
        </form>
      </div>
    </div>
  );
}