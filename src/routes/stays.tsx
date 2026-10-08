import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "../components/CategoryPage";
import { StaySearch } from "../components/StaySearch";
import { StaysLanding } from "../components/StaysLanding";

export const Route = createFileRoute("/stays")({
  validateSearch: (search: Record<string, unknown>) => ({
    destination: typeof search['destination'] === "string" && search['destination'].length <= 80 ? search['destination'] : "",
    checkIn: typeof search['checkIn'] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search['checkIn']) ? search['checkIn'] : "",
    checkOut: typeof search['checkOut'] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search['checkOut']) ? search['checkOut'] : "",
    adults: typeof search['adults'] === "string" || typeof search['adults'] === "number" ? Math.min(12, Math.max(1, Number(search['adults']) || 2)) : 2,
    children: typeof search['children'] === "string" || typeof search['children'] === "number" ? Math.min(12, Math.max(0, Number(search['children']) || 0)) : 0,
    pets: search['pets'] === "1" || search['pets'] === 1 || search['pets'] === true,
  }),
  head: () => ({
    meta: [
      { title: "Stays in Kenya — offers, beaches & unique properties | Routebook" },
      { name: "description", content: "Find stays across Kenya: Late Escape offers, beach trips and unique hotels and resorts." },
      { property: "og:title", content: "Stays in Kenya | Routebook" },
      { property: "og:description", content: "Late Escape offers, beach trips and unique hotels and resorts across Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Stays,
});

function Stays() {
  const search = Route.useSearch();
  return (
    <main>
      <section className="bg-pine px-4 pb-16 pt-10 text-paper sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">Stays</h1>
          <p className="mt-2 text-paper/90">Enter a destination, pick your dates and set occupancy.</p>
        </div>
      </section>
      <div className="relative z-10 -mt-10 px-4 sm:px-8"><StaySearch initialDestination={search.destination} /></div>
      <StaysLanding />
      <div id="listings"><CategoryPage mode="hotel" staySearch={search} /></div>
    </main>
  );
}
