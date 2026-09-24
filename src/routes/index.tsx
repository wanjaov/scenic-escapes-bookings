import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import heroCoast from "../assets/hero-coast.jpg";
import { BookingSheet } from "../components/BookingSheet";
import { CategoryBand, type BandLayout, type BandTone } from "../components/CategoryBand";
import { SearchDesk } from "../components/SearchDesk";
import {
  MODES,
  buildSummary,
  formatKes,
  nightsBetween,
  offersFor,
  type Booking,
  type ModeId,
  type Offer,
  type SearchValues,
} from "../lib/catalog";
import { cn } from "../lib/utils";

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

const BAND_STYLES: Record<
  ModeId,
  { tone: BandTone; layout: BandLayout; columns: 3 | 4 }
> = {
  bus: { tone: "paper", layout: "cards", columns: 3 },
  rail: { tone: "pine", layout: "cards", columns: 3 },
  air: { tone: "cream", layout: "cards", columns: 3 },
  water: { tone: "paper", layout: "feature", columns: 3 },
  hotel: { tone: "terra", layout: "cards", columns: 4 },
};

const BAND_ORDER: ModeId[] = ["bus", "rail", "air", "water", "hotel"];

function isoDate(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export default function Home() {
  const [modeId, setModeId] = useState<ModeId>("bus");
  const [values, setValues] = useState<SearchValues>(DEFAULTS);
  const [summary, setSummary] = useState<string | null>(null);
  const [bookingOffer, setBookingOffer] = useState<Offer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tripsOpen, setTripsOpen] = useState(false);
  const tripsRef = useRef<HTMLDivElement>(null);

  const mode = useMemo(() => MODES.find((entry) => entry.id === modeId) ?? MODES[0], [modeId]);
  const nights = nightsBetween(values.checkIn, values.checkOut);

  useEffect(() => {
    setValues((current) => ({
      ...current,
      depart: current.depart || isoDate(7),
      checkIn: current.checkIn || isoDate(7),
      checkOut: current.checkOut || isoDate(9),
    }));
  }, []);

  const handleModeChange = (id: ModeId) => {
    setModeId(id);
    setSummary(null);
  };

  const handleSearch = () => {
    const result = buildSummary(mode, values);
    setSummary(result.text);
    document
      .getElementById(result.bandId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleConfirm = (booking: Booking) => {
    setBookings((current) => [booking, ...current]);
  };

  return (
    <div className="min-h-screen grain bg-background text-foreground">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold">Routebook</span>
          <span className="label-micro hidden text-muted-foreground sm:inline">
            Travel Annual
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {BAND_ORDER.map((id) => {
            const entry = MODES.find((item) => item.id === id);
            if (!entry) return null;
            return (
              <a
                key={id}
                href={`#${entry.bandId}`}
                className="text-foreground/70 transition-colors hover:text-primary"
              >
                {entry.kicker}
              </a>
            );
          })}
        </div>

        <div
          ref={tripsRef}
          tabIndex={-1}
          className="relative"
          onBlur={(event) => {
            const next = event.relatedTarget as Node | null;
            if (!tripsRef.current?.contains(next)) setTripsOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setTripsOpen((open) => !open)}
            className="rounded-full border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            My trips
            {bookings.length > 0 && (
              <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                {bookings.length}
              </span>
            )}
          </button>

          {tripsOpen && (
            <div className="absolute right-0 top-full z-40 mt-2 w-80 animate-pop-in rounded-card bg-popover p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] ring-1 ring-border">
              {bookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nothing booked yet. Search a route or pick a stay and it will appear here.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {bookings.map((booking) => (
                    <li key={booking.ref} className="flex items-baseline justify-between gap-3 py-2.5">
                      <span>
                        <span className="block text-sm font-medium">{booking.title}</span>
                        <span className="block text-xs text-muted-foreground">
                          {booking.ref}
                          {booking.nights > 0 && ` · ${booking.nights} nights`}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-medium">
                        {formatKes(booking.total)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header className="px-6 pb-16 pt-4 sm:px-10">
        <h1 className="max-w-[40ch] font-display text-5xl leading-none font-semibold sm:text-6xl lg:text-7xl">
          Where to next, <span className="text-primary">fellow traveller?</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-base text-muted-foreground sm:text-lg">
          Five ways to move and rest, hand-picked by the Routebook desk. Bus, air, rail, water
          and the best-scenery hotels — all in one annual.
        </p>

        <SearchDesk
          mode={mode}
          values={values}
          onModeChange={handleModeChange}
          onChange={(patch) => setValues((current) => ({ ...current, ...patch }))}
          onSearch={handleSearch}
          summary={summary}
          onClearSummary={() => setSummary(null)}
        />

        <div className="relative mt-10">
          <div className="overflow-hidden rounded-panel ring-1 ring-border">
            <img
              src={heroCoast}
              alt="Aerial view of the Kenyan coast at golden hour"
              width={1920}
              height={900}
              className="aspect-16/8 w-full object-cover"
            />
          </div>
          <div className="absolute bottom-5 left-6 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-ink ring-1 ring-black/5 sm:left-10">
            One desk · five ways to travel
          </div>
        </div>
      </header>

      {/* CATEGORY BANDS */}
      <main>
        {BAND_ORDER.map((id) => {
          const entry = MODES.find((item) => item.id === id);
          if (!entry) return null;
          const style = BAND_STYLES[id];
          return (
            <CategoryBand
              key={id}
              mode={entry}
              offers={offersFor(id)}
              tone={style.tone}
              layout={style.layout}
              columns={style.columns}
              onBook={setBookingOffer}
            />
          );
        })}
      </main>

      {/* FOOTER */}
      <footer className="flex flex-col items-start justify-between gap-4 px-6 py-12 sm:flex-row sm:items-center sm:px-10">
        <span className="font-display text-xl font-semibold">Routebook</span>
        <p className="text-sm text-muted-foreground">
          A hand-set annual for bus, air, rail, water and stays. Clip it, file it, go.
        </p>
        <span className="text-sm text-muted-foreground">© 2026 Routebook Travel</span>
      </footer>

      {bookingOffer && (
        <BookingSheet
          offer={bookingOffer}
          travellers={values.travellers}
          nights={nights}
          onClose={() => setBookingOffer(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
