import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../components/CategoryPage";

export const Route = createFileRoute("/sky")({
  head: () => ({
    meta: [
      { title: "Flights — Routebook" },
      { name: "description", content: "Book business, economy and bush flights across the region." },
      { property: "og:title", content: "Flights — Routebook" },
      { property: "og:description", content: "Book business, economy and bush flights across the region." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <CategoryPage mode="air" />,
});
