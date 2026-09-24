import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../components/CategoryPage";

export const Route = createFileRoute("/stays")({
  head: () => ({
    meta: [
      { title: "Scenic hotels — Routebook" },
      { name: "description", content: "Book lakeside, oceanfront, mountain and rainforest hotels." },
      { property: "og:title", content: "Scenic hotels — Routebook" },
      { property: "og:description", content: "Book lakeside, oceanfront, mountain and rainforest hotels." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <CategoryPage mode="hotel" />,
});
