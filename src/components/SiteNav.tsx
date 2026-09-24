import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { formatKes } from "../lib/catalog";
import { useBookings } from "../lib/trips";

const LINKS = [
  { to: "/road", label: "Road" },
  { to: "/rail", label: "Rail" },
  { to: "/sky", label: "Sky" },
  { to: "/water", label: "Water" },
  { to: "/stays", label: "Stays" },
] as const;

export function SiteNav() {
  const bookings = useBookings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
      <Link to="/" className="flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold">Routebook</span>
        <span className="label-micro hidden text-muted-foreground sm:inline">Travel Annual</span>
      </Link>

      <div className="order-3 flex w-full items-center gap-1 overflow-x-auto text-sm font-medium md:order-none md:w-auto">
        {LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-full px-4 py-2 transition-colors hover:text-primary"
            activeProps={{ className: "bg-foreground text-background hover:text-background" }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div
        ref={ref}
        className="relative"
        onBlur={(e) => {
          if (!ref.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          My trips
          {bookings.length > 0 && (
            <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
              {bookings.length}
            </span>
          )}
        </button>
        {open && (
          <div className="absolute right-0 top-full z-40 mt-2 w-80 animate-pop-in rounded-card bg-popover p-4 shadow-lg ring-1 ring-border">
            {bookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nothing booked yet. Pick a category and book a trip — it will appear here.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {bookings.map((b) => (
                  <li key={b.ref} className="flex items-baseline justify-between gap-3 py-2.5">
                    <span>
                      <span className="block text-sm font-medium">{b.title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {b.ref}
                        {b.nights > 0 && ` · ${b.nights} nights`}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-medium">{formatKes(b.total)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
