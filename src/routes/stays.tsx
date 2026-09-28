import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../components/CategoryPage";

export const Route = createFileRoute("/stays")({
  validateSearch: (search: Record<string, unknown>) => ({
    destination: typeof search.destination === "string" && search.destination.length <= 80 ? search.destination : "",
    checkIn: typeof search.checkIn === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.checkIn) ? search.checkIn : "",
    checkOut: typeof search.checkOut === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.checkOut) ? search.checkOut : "",
    adults: typeof search.adults === "string" ? Math.min(12, Math.max(1, Number(search.adults) || 2)) : 2,
    children: typeof search.children === "string" ? Math.min(12, Math.max(0, Number(search.children) || 0)) : 0,
    pets: search.pets === "1",
  }),
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
  component: Stays,
});

function Stays() {
  const search = Route.useSearch();
  return <CategoryPage mode="hotel" staySearch={search} />;
}
