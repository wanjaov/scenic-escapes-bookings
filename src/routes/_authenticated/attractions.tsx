import { createFileRoute } from "@tanstack/react-router";
import { AttractionsPage } from "../../components/AttractionsPage";
export const Route = createFileRoute("/_authenticated/attractions")({
  head: () => ({ meta: [
    { title: "Kenya Attractions, Activities & Experiences | Routebook" },
    { name: "description", content: "Explore Kenya's parks, beaches, museums and heritage sites. Find attraction locations, visitor review links and destination inspiration with Routebook." },
    { property: "og:title", content: "Kenya Attractions, Activities & Experiences | Routebook" },
    { property: "og:description", content: "Discover Kenyan attractions, filter by destination and explore locations and visitor review links." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AttractionsPage,
});
