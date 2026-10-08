import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import diani from "../assets/hotel-oceanfront-photo.jpg.asset.json";
import watamu from "../assets/stays-watamu.jpg.asset.json";
import malindi from "../assets/stays-malindi.jpg.asset.json";
import lamu from "../assets/stays-lamu.jpg.asset.json";
import nyali from "../assets/stays-nyali.jpg.asset.json";
import resort from "../assets/stays-resort.jpg.asset.json";
import giraffe from "../assets/stays-giraffe.jpg.asset.json";
import tented from "../assets/stays-tented.jpg.asset.json";
import fairmont from "../assets/stays-fairmont.jpg.asset.json";
import { TravelMoreSection } from "./PromoSections";

const base = { checkIn: "", checkOut: "", adults: 2, children: 0, pets: false };

const BEACHES = [
  { name: "Diani Beach", near: "Near Southern Palms Beach Resort", county: "Kwale County", img: diani.url, alt: "White sand and turquoise water at Diani Beach", q: "Diani" },
  { name: "Watamu", near: "Near Hemingways Watamu", county: "Kilifi County", img: watamu.url, alt: "Starfish in clear shallow water at Watamu Beach", q: "Watamu" },
  { name: "Malindi", near: "Near Malindi's seafront hotels", county: "Kilifi County", img: malindi.url, alt: "Visitors enjoying activities on Malindi Beach", q: "Malindi" },
  { name: "Shela, Lamu", near: "Near Peponi Hotel", county: "Lamu County", img: lamu.url, alt: "Long sandy shoreline of Shela Beach on Lamu Island", q: "Lamu" },
  { name: "Nyali, Mombasa", near: "Near Mombasa Beach Hotel", county: "Mombasa County", img: nyali.url, alt: "Mombasa Beach Hotel seen from Nyali Beach", q: "Mombasa" },
];

const PROPERTIES = [
  { name: "Giraffe Manor", type: "Hotel", loc: "Langata, Nairobi", img: giraffe.url, alt: "Ivy-covered Giraffe Manor building in Nairobi" },
  { name: "Fairmont Mount Kenya Safari Club", type: "Resort", loc: "Nanyuki, Laikipia", img: fairmont.url, alt: "Gardens of the Fairmont Mount Kenya Safari Club" },
  { name: "Southern Palms Beach Resort", type: "Resort", loc: "Diani, Kwale", img: resort.url, alt: "Swimming pool at Southern Palms Beach Resort" },
  { name: "Mombasa Beach Hotel", type: "Hotel", loc: "Nyali, Mombasa", img: nyali.url, alt: "Mombasa Beach Hotel above Nyali Beach" },
  { name: "Ol Moran Tented Camp", type: "Resort", loc: "Kenya", img: tented.url, alt: "Safari tent at Ol Moran camp" },
];

export function StaysLanding() {
  const [saved, setSaved] = useState<string[]>([]);
  const toggle = (n: string) => setSaved((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Offers</h2>
        <p className="mt-1 text-muted-foreground">Promotion, deals and special offers for you</p>
        <div className="mt-6 grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[1fr_minmax(0,22rem)]">
          <div className="order-2 p-6 sm:p-8 md:order-1">
            <p className="text-xs font-semibold uppercase text-terra-deep">Late Escape deals</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">15% or more off end-of-year stays</h3>
            <p className="mt-3 text-muted-foreground">
              Get away for less with Late Escape deals. Book by <strong className="text-foreground">Jan 7, 2027</strong> for stays between Oct 1, 2027 and Jan 7, 2027.
            </p>
            <p className="mt-2 text-xs text-terra-deep">Stay dates to be confirmed — the end date falls before the start date.</p>
            <Link to="/stays" search={{ ...base, destination: "" }} hash="listings" className="mt-5 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90">
              Search deals
            </Link>
          </div>
          <img src={resort.url} alt="Poolside at Southern Palms Beach Resort, Diani" width={850} height={600} loading="lazy" className="order-1 aspect-[16/9] h-full w-full object-cover md:order-2 md:aspect-auto" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 sm:px-10">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Looking for a beach trip?</h2>
        <p className="mt-1 text-muted-foreground">Explore beaches, flights and more to start planning.</p>
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {BEACHES.map((b) => (
            <Link key={b.name} to="/stays" search={{ ...base, destination: b.q }} className="group w-56 shrink-0 snap-start lg:w-auto">
              <div className="overflow-hidden rounded-xl">
                <img src={b.img} alt={b.alt} width={850} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-2 font-semibold">{b.name}</h3>
              <p className="text-xs text-muted-foreground">{b.near} · {b.county}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-4 sm:px-10">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Stay at our top unique properties</h2>
        <p className="mt-1 text-muted-foreground">From castles and villas to boats and igloos, we have it all.</p>
        <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {PROPERTIES.map((p) => {
            const on = saved.includes(p.name);
            return (
              <article key={p.name} className="w-60 shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card lg:w-auto">
                <div className="relative">
                  <img src={p.img} alt={p.alt} width={850} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <button type="button" onClick={() => toggle(p.name)} aria-pressed={on} aria-label={on ? `Remove ${p.name} from saved` : `Save ${p.name}`} className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-background/90 shadow transition hover:scale-110">
                    <Heart className={`size-5 ${on ? "fill-primary text-primary" : "text-foreground"}`} />
                  </button>
                </div>
                <div className="p-3">
                  <span className="text-xs font-semibold uppercase text-terra-deep">{p.type}</span>
                  <h3 className="mt-1 font-semibold leading-snug">{p.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3.5 shrink-0" />{p.loc}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Rating & reviews: to be supplied</p>
                  <p className="text-xs text-muted-foreground">Genius offer: to be confirmed</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <TravelMoreSection />
    </>
  );
}
