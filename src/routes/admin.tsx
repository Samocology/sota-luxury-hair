import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — SOTA HAIR" }, { name: "robots", content: "noindex" }] }),
  component: AdminShell,
});