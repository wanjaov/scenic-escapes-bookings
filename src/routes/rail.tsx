import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../components/CategoryPage";

export const Route = createFileRoute("/rail")({
  head: () => ({
    meta: [
      { title: "Train tickets — Routebook" },
      { name: "description", content: "Book overnight sleepers, express trains and scenic rail journeys." },
      { property: "og:title", content: "Train tickets — Routebook" },
      { property: "og:description", content: "Book overnight sleepers, express trains and scenic rail journeys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <CategoryPage mode="rail" />,
});
