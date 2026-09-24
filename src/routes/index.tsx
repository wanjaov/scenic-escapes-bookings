import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroCoast from "../assets/hero-coast.jpg";
import { SearchDesk } from "../components/SearchDesk";
import {
  MODES_BY_ID,
  cheapestFor,
  formatKes,
  offersFor,
  type ModeId,
  type SearchValues,
} from "../lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Routebook — Book buses, flights, trains, ferries & scenic stays" },
      {
        name: "description",
        content:
          "One search for five ways to travel: sleeper coaches, regional flights, scenic rail, dhow crossings and hotels picked for the view out the window.",
      },
      { property: "og:title", content: "Routebook — Book buses, flights, trains, ferries & stays" },
      {
        property: "og:description",
        content:
          "Compare coaches, cabins, carriages, crossings and rooms with a view, then book the one you want in a couple of clicks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const DEFAULTS: SearchValues = {
  from: "Nairobi",
  to: "Mombasa",
  depart: "",
  checkIn: "",
  checkOut: "",
  travellers: 2,
};

const PAGES = [
  { id: "bus", to: "/road" },
  { id: "rail", to: "/rail" },
  { id: "air", to: "/sky" },
  { id: "water", to: "/water" },
  { id: "hotel", to: "/stays" },
] as const satisfies readonly { id: ModeId; to: string }[];

function isoDate(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function Home() {
  const navigate = useNavigate();
  const [modeId, setModeId] = useState<ModeId>("bus");
  const [values, setValues] = useState<SearchValues>(DEFAULTS);
  const mode = MODES_BY_ID[modeId];

  useEffect(() => {
    setValues((c) => ({
      ...c,
      depart: c.depart || isoDate(7),
      checkIn: c.checkIn || isoDate(7),
      checkOut: c.checkOut || isoDate(9),
    }));
  }, []);

  const handleSearch = () => {
    const page = PAGES.find((p) => p.id === modeId);
    if (page) navigate({ to: page.to });
  };

  return (
    <>
      <header className="px-6 pb-16 pt-4 sm:px-10">
        <h1 className="max-w-[40ch] font-display text-5xl leading-none font-semibold sm:text-6xl lg:text-7xl">
          Where to next, <span className="text-primary">fellow traveller?</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-base text-muted-foreground sm:text-lg">
          Five ways to move and rest, hand-picked by the Routebook desk. Pick a category above or
          search below.
        </p>

        <SearchDesk
          mode={mode}
          values={values}
          onModeChange={setModeId}
          onChange={(patch) => setValues((c) => ({ ...c, ...patch }))}
          onSearch={handleSearch}
          summary={null}
          onClearSummary={() => {}}
        />

        <div className="mt-10 overflow-hidden rounded-panel ring-1 ring-border">
          <img
            src={heroCoast}
            alt="Aerial view of the Kenyan coast at golden hour"
            width={1920}
            height={900}
            className="aspect-16/8 w-full object-cover"
          />
        </div>
      </header>

      <main className="px-6 pb-16 sm:px-10">
        <h2 className="mb-6 font-display text-3xl font-semibold">Browse by category</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PAGES.map((p) => {
            const m = MODES_BY_ID[p.id];
            const cover = offersFor(p.id)[0];
            const low = cheapestFor(p.id);
            return (
              <Link
                key={p.id}
                to={p.to}
                className="group overflow-hidden rounded-card bg-card ring-1 ring-border"
              >
                {cover && (
                  <img
                    src={cover.image}
                    alt={m.kicker}
                    loading="lazy"
                    className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="p-4">
                  <span className="label-micro text-terra-deep">{m.kicker}</span>
                  <p className="mt-1 font-display text-lg font-semibold">{m.label}</p>
                  {low && (
                    <p className="text-sm text-muted-foreground">from {formatKes(low.price)}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
