import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { collections, productsByCollection, revenueSeries } from "@/lib/data";

export const Route = createFileRoute("/admin/analytics")({ component: AdminAnalytics });

function AdminAnalytics() {
  const byCol = collections.map((c) => ({ name: c.name, value: productsByCollection(c.slug).length }));
  const COLORS = ["#d4a44a", "#b0872f", "#e8c47b", "#8f6a23", "#c9a04a", "#6b4d10"];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Analytics</h1>
        <p className="text-sm text-muted-foreground">Deep insights on sales performance.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5">
          <div className="mb-4 font-semibold">Monthly revenue</div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={revenueSeries}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₦${(v/1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--gold)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-md border border-border/60 bg-[color:var(--surface)] p-5">
          <div className="mb-4 font-semibold">Products by collection</div>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byCol} dataKey="value" nameKey="name" outerRadius={100} label={{ fontSize: 11, fill: "var(--muted-foreground)" }}>
                  {byCol.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}