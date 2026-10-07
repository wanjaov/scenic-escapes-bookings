import { useState } from "react";
import { Link } from "@tanstack/react-router";

const TABS = {
  "Domestic cities": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Malindi"],
  "International cities": ["Dubai", "Kampala", "Kigali", "Dar es Salaam", "Johannesburg", "London"],
  Regions: ["Kenyan Coast", "Rift Valley", "Mount Kenya", "Maasai Mara", "Lake Victoria", "Amboseli"],
  Countries: ["Tanzania", "Uganda", "Rwanda", "South Africa", "United Arab Emirates", "Ethiopia"],
  "Places to stay": ["Hotels", "Villas", "Apartments", "Resorts", "Lodges", "Tented camps"],
  "Things to do": ["Game drives", "Snorkelling", "Hiking", "Dhow cruises", "Cultural tours", "Hot-air balloon"],
} as const;
type Tab = keyof typeof TABS;

function GiftBox() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0 sm:h-28 sm:w-28" aria-hidden="true">
      <circle cx="60" cy="62" r="54" className="fill-secondary" />
      <rect x="22" y="56" width="76" height="46" rx="6" className="fill-primary" />
      <rect x="16" y="40" width="88" height="20" rx="5" className="fill-accent" />
      <rect x="53" y="40" width="14" height="62" className="fill-background" />
      <path d="M60 40 C44 18 26 28 38 38 Z" className="fill-accent stroke-foreground" strokeWidth="2" />
      <path d="M60 40 C76 18 94 28 82 38 Z" className="fill-accent stroke-foreground" strokeWidth="2" />
      <circle cx="98" cy="22" r="4" className="fill-accent" />
      <circle cx="18" cy="26" r="3" className="fill-primary" />
    </svg>
  );
}

export function PromoSections() {
  const [tab, setTab] = useState<Tab>("Domestic cities");
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Travel more, spend less.</h2>
          <p className="mt-3 text-lg font-medium">Sign in, save money.</p>
          <div className="mt-2 flex items-center justify-between gap-6">
            <p className="min-w-0 text-muted-foreground">
              Save 10% or more at participating properties — just look for the blue Genius label.
            </p>
            <GiftBox />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/auth" search={{ mode: "signin" }} className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90">
              Sign in
            </Link>
            <Link to="/auth" search={{ mode: "register" }} className="rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-secondary">
              Register
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 sm:px-10">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Popular with travellers from Kenya</h2>
        <div role="tablist" className="mt-4 flex gap-2 overflow-x-auto border-b border-border pb-2">
          {(Object.keys(TABS) as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TABS[tab].map((name) => (
            <li key={name}>
              <Link to="/stays" search={{ destination: name }} className="block rounded-lg px-3 py-2 text-sm transition hover:bg-secondary hover:text-primary">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
