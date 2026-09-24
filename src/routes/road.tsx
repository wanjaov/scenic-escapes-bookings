import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../components/CategoryPage";

export const Route = createFileRoute("/road")({
  head: () => ({
    meta: [
      { title: "Bus & coach tickets — Routebook" },
      { name: "description", content: "Book sleeper coaches, daytime expresses and door-to-door shuttles." },
      { property: "og:title", content: "Bus & coach tickets — Routebook" },
      { property: "og:description", content: "Book sleeper coaches, daytime expresses and door-to-door shuttles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <CategoryPage mode="bus" />,
});
