import { createFileRoute } from "@tanstack/react-router";
import { FlightsPage } from "../components/FlightsPage";

export const Route = createFileRoute("/sky")({
  head: () => ({
    meta: [
      { title: "Flights in Kenya — compare and search | Routebook" },
      { name: "description", content: "Search round-trip, one-way and multi-city flights across Kenya with bags, passengers and cabin class." },
      { property: "og:title", content: "Find the right flight | Routebook" },
      { property: "og:description", content: "Search flights across Kenya, see example deals and plan your trip." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlightsPage,
});
