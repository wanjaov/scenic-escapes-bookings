import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../components/CategoryPage";

export const Route = createFileRoute("/water")({
  head: () => ({
    meta: [
      { title: "Ferries & cruises — Routebook" },
      { name: "description", content: "Book dhow crossings, houseboats and sunset cruises." },
      { property: "og:title", content: "Ferries & cruises — Routebook" },
      { property: "og:description", content: "Book dhow crossings, houseboats and sunset cruises." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <CategoryPage mode="water" />,
});
