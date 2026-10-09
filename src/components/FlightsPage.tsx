import { useRef, useState, type ReactNode } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import {
  ArrowRight, BellRing, Bot, CalendarDays, Compass, Luggage, Map, Minus, Palmtree, Plane, Plus, Search, Star, Ticket, TrendingUp, UserRound, Users,
} from "lucide-react";
import windowPhoto from "../assets/air-economy-photo.jpg.asset.json";
import coast from "../assets/hero-coast-photo.jpg.asset.json";
import diani from "../assets/hotel-oceanfront-photo.jpg.asset.json";
import lake from "../assets/hotel-lakeside-photo.jpg.asset.json";
import mountain from "../assets/hotel-mountain-photo.jpg.asset.json";
import mara from "../assets/attractions-photo.jpg.asset.json";
import lamu from "../assets/stays-lamu.jpg.asset.json";
import malindi from "../assets/stays-malindi.jpg.asset.json";
import watamu from "../assets/stays-watamu.jpg.asset.json";
import dhow from "../assets/water-dhow-photo.jpg.asset.json";
import road from "../assets/car-rental-photo.jpg.asset.json";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { CategoryPage } from "./CategoryPage";
import { formatKes } from "../lib/catalog";

type TripType = "Round trip" | "One way" | "Multi city";
const CABINS = ["Economy", "Premium economy", "Business", "First class"] as const;

const DEALS = [
  { to: "Mombasa", code: "MBA", img: coast.url, price: 9500, dur: "1h 05m" },
  { to: "Kisumu", code: "KIS", img: lake.url, price: 8200, dur: "55m" },
  { to: "Malindi", code: "MYD", img: malindi.url, price: 10500, dur: "1h 10m" },
  { to: "Ukunda (Diani)", code: "UKA", img: diani.url, price: 12500, dur: "1h 15m" },
  { to: "Lamu", code: "LAU", img: lamu.url, price: 16500, dur: "1h 40m" },
  { to: "Amboseli", code: "ASV", img: road.url, price: 26000, dur: "50m" },
  { to: "Maasai Mara (Keekorok)", code: "KEU", img: mara.url, price: 28000, dur: "45m" },
  { to: "Nanyuki", code: "NYK", img: mountain.url, price: 15500, dur: "50m" },
  { to: "Watamu via Malindi", code: "MYD", img: watamu.url, price: 10900, dur: "1h 10m" },
  { to: "Shimoni via Ukunda", code: "UKA", img: dhow.url, price: 12900, dur: "1h 15m" },
];

const PLACES: [string, string, string][] = [
  ["Mombasa", "MBA", "Moi International · coast, Old Town"],
  ["Kisumu", "KIS", "Kisumu International · Lake Victoria"],
  ["Malindi", "MYD", "Malindi Airport · beaches, marine park"],
  ["Ukunda", "UKA", "Ukunda Airstrip · Diani Beach"],
  ["Lamu", "LAU", "Manda Airport · Lamu Old Town"],
  ["Eldoret", "EDL", "Eldoret International · highlands"],
  ["Kitale", "KTL", "Kitale Airport · Mount Elgon"],
  ["Lodwar", "LOK", "Lodwar Airport · Lake Turkana"],
  ["Wajir", "WJR", "Wajir Airport · North Eastern"],
  ["Garissa", "GAS", "Garissa Airport · Tana River"],
  ["Nanyuki", "NYK", "Nanyuki Airstrip · Mount Kenya"],
  ["Maasai Mara", "KEU", "Keekorok Airstrip · safari"],
  ["Amboseli", "ASV", "Amboseli Airstrip · Kilimanjaro views"],
  ["Samburu", "UAS", "Samburu Airstrip · Buffalo Springs"],
  ["Lokichogio", "LKG", "Lokichogio Airport · Turkana"],
  ["Mandera", "NDE", "Mandera Airport · North East"],
  ["Marsabit", "RBT", "Marsabit Airport · northern Kenya"],
  ["Homa Bay", "HBA", "Kabunde Airstrip · Lake Victoria"],
  ["Lewa", "LWA", "Lewa Airstrip · Lewa conservancy"],
  ["Nairobi Wilson", "WIL", "Wilson Airport · domestic hub"],
];

const PROS: { t: string; d: string; icons: [typeof Plane, typeof Plane] }[] = [
  { t: "Plan with AI", d: "Get travel questions answered.", icons: [UserRound, Bot] },
  { t: "Airfare trends", d: "See weekly trends in flights.", icons: [Plane, TrendingUp] },
  { t: "Monthly flight deals", d: "See great prices from your local airport.", icons: [CalendarDays, Plane] },
  { t: "Trips", d: "See destinations on your budget.", icons: [Palmtree, UserRound] },
  { t: "Explore", d: "See destinations on your budget.", icons: [Map, Luggage] },
  { t: "Price alerts", d: "Know when prices change.", icons: [Ticket, BellRing] },
  { t: "Flight tracker", d: "See real-time delays.", icons: [Map, Plane] },
];

const FAQS: [string, string][] = [
  ["How do I search for a flight?", "Choose Round trip, One way or Multi city, enter where you're flying from and to, pick your dates, passengers, bags and cabin class, then press Search."],
  ["Are the fares shown final?", "No. Prices on this page are example fares that still need verification. The final price is confirmed before you pay."],
  ["How many bags can I add?", "You can select up to 5 bags in the search. Each airline sets its own allowance and fees, which are shown before booking."],
  ["Who counts as an adult, child or infant?", "Adults are 18 or older, children are 0–17 with their own seat, and infants under 2 travel on an adult's lap. Each infant needs one adult."],
  ["What's the difference between cabin classes?", "Economy is the standard fare. Premium economy adds legroom, Business adds lie-flat or wider seats and lounge access, and First class is the most premium service where offered."],
  ["Is my booking confirmed straight away?", "Bookings on Routebook are currently demos — nothing is charged and no seat is held. You'll see a reference under My trips."],
];

function Counter({ label, value, set, min = 0, max = 9 }: { label: string; value: number; set: (n: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" aria-label={`Fewer ${label}`} disabled={value <= min} onClick={() => set(value - 1)} className="grid size-8 place-items-center rounded-full ring-1 ring-border hover:bg-secondary disabled:opacity-40"><Minus className="size-4" /></button>
        <span className="w-5 text-center text-sm font-semibold">{value}</span>
        <button type="button" aria-label={`More ${label}`} disabled={value >= max} onClick={() => set(value + 1)} className="grid size-8 place-items-center rounded-full ring-1 ring-border hover:bg-secondary disabled:opacity-40"><Plus className="size-4" /></button>
      </div>
    </div>
  );
}

function Box({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-sm bg-background px-3 py-2 ring-1 ring-border focus-within:ring-2 focus-within:ring-ring ${className}`}>
      <span className="block text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

export function FlightsPage() {
  const [trip, setTrip] = useState<TripType>("Round trip");
  const [from, setFrom] = useState("Nairobi (NBO)");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState<Date | undefined>();
  const [ret, setRet] = useState<Date | undefined>();
  const [bags, setBags] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState<(typeof CABINS)[number]>("Economy");
  const [summary, setSummary] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const toRef = useRef<HTMLInputElement>(null);
  const today = startOfDay(new Date());

  const search = () => {
    const parts = [`${from || "Anywhere"} → ${to || "Anywhere"}`, trip, depart ? format(depart, "d MMM") : "Any date"];
    if (trip === "Round trip" && ret) parts.push(`return ${format(ret, "d MMM")}`);
    parts.push(`${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}${infants ? `, ${infants} infant${infants > 1 ? "s" : ""}` : ""}`, `${bags} bag${bags === 1 ? "" : "s"}`, cabin);
    setSummary(parts.join(" · "));
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const pick = (place: string) => { setTo(place); window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => toRef.current?.focus(), 400); };

  return (
    <main>
      <section className="bg-pine px-4 pt-8 pb-6 text-paper sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-2xl font-semibold">Routebook</span>
            <button type="button" onClick={() => setAiOpen((o) => !o)} aria-expanded={aiOpen} className="inline-flex items-center gap-1.5 rounded-full bg-paper/15 px-3 py-1.5 text-sm font-medium ring-1 ring-paper/30 transition hover:bg-paper/25">
              <Bot className="size-4" /> Ask AI
            </button>
          </div>
          {aiOpen && <p className="mt-3 max-w-xl rounded-sm bg-paper/10 px-4 py-3 text-sm">The AI travel assistant is coming soon. For now, use the search below or browse the FAQs at the bottom of this page.</p>}
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">Find the right flight from 100s of sites</h1>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-border bg-card/95 px-4 py-3 shadow-sm backdrop-blur sm:px-8">
        <form onSubmit={(e) => { e.preventDefault(); search(); }} className="mx-auto max-w-7xl">
          <div className="mb-2 flex flex-wrap items-center gap-1" role="radiogroup" aria-label="Trip type">
            {(["Round trip", "One way", "Multi city"] as TripType[]).map((t) => (
              <button key={t} type="button" role="radio" aria-checked={trip === t} onClick={() => setTrip(t)} className={`rounded-full px-3 py-1 text-sm font-medium transition ${trip === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>{t}</button>
            ))}
            {trip === "Multi city" && <span className="ml-2 text-xs text-muted-foreground">Search your first leg; add the next legs after booking.</span>}
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1fr_auto_auto_auto_auto_auto_auto]">
            <Box label="From"><input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="City or airport" className="w-full bg-transparent text-sm font-semibold focus:outline-none" /></Box>
            <Box label="To"><input ref={toRef} value={to} onChange={(e) => setTo(e.target.value)} placeholder="City or airport" className="w-full bg-transparent text-sm font-semibold focus:outline-none" /></Box>
            <Popover>
              <PopoverTrigger asChild><button type="button" className="text-left"><Box label={trip === "Round trip" ? "Departure — Return" : "Departure"}><span className="block whitespace-nowrap text-sm font-semibold">{depart ? format(depart, "d MMM") : "Add date"}{trip === "Round trip" && ` – ${ret ? format(ret, "d MMM") : "Return"}`}</span></Box></button></PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {trip === "Round trip" ? (
                  <Calendar mode="range" selected={{ from: depart, to: ret }} onSelect={(r) => { setDepart(r?.from); setRet(r?.to); }} disabled={(d) => isBefore(d, today)} className="p-3" />
                ) : (
                  <Calendar mode="single" selected={depart} onSelect={setDepart} disabled={(d) => isBefore(d, today)} className="p-3" />
                )}
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild><button type="button" className="text-left"><Box label="Bags"><span className="flex items-center gap-1 text-sm font-semibold"><Luggage className="size-4" />{bags}</span></Box></button></PopoverTrigger>
              <PopoverContent className="w-60 p-4"><Counter label="Bags" value={bags} set={setBags} max={5} /></PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild><button type="button" className="text-left"><Box label="Passengers"><span className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold"><Users className="size-4" />{adults + children + infants}</span></Box></button></PopoverTrigger>
              <PopoverContent className="w-72 space-y-4 p-4">
                <Counter label="Adults (18+)" value={adults} set={(n) => { setAdults(n); if (infants > n) setInfants(n); }} min={1} />
                <Counter label="Children (0–17)" value={children} set={setChildren} />
                <Counter label="Infants on lap (under 2)" value={infants} set={setInfants} max={adults} />
              </PopoverContent>
            </Popover>
            <Box label="Cabin class">
              <select value={cabin} onChange={(e) => setCabin(e.target.value as (typeof CABINS)[number])} className="w-full bg-transparent text-sm font-semibold focus:outline-none">
                {CABINS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Box>
            <button type="submit" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 lg:col-span-1"><Search className="size-4" /> Search</button>
            <img src={windowPhoto.url} alt="View through an aircraft cabin window" width={96} height={64} className="hidden h-14 w-20 self-center rounded-sm object-cover xl:block" />
          </div>
        </form>
      </div>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:px-10 md:grid-cols-3">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 7 }, (_, i) => <span key={i} className="grid h-8 min-w-12 place-items-center rounded-sm bg-secondary px-2 text-[10px] font-semibold uppercase text-muted-foreground">Partner {i + 1}</span>)}
          </div>
          <p className="mt-3 font-semibold">Save when you compare.</p>
          <p className="text-sm text-muted-foreground">More deals, more sites, one search.</p>
          <p className="mt-1 text-xs text-muted-foreground">Placeholder partner marks — no partnerships implied.</p>
        </div>
        <div>
          <div className="flex -space-x-2">{Array.from({ length: 5 }, (_, i) => <span key={i} className="grid size-9 place-items-center rounded-full bg-secondary ring-2 ring-background"><UserRound className="size-4 text-muted-foreground" /></span>)}</div>
          <p className="mt-3 font-display text-2xl font-semibold">41,000,000+</p>
          <p className="text-sm text-muted-foreground">Searches this week</p>
          <p className="mt-1 text-xs text-muted-foreground">Example figure — needs a verified source.</p>
        </div>
        <div>
          <div className="flex gap-0.5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-6 fill-accent text-accent" />)}</div>
          <p className="mt-3 font-semibold">Travellers love us</p>
          <p className="text-sm text-muted-foreground">1m+ ratings on our app</p>
          <p className="mt-1 text-xs text-muted-foreground">Example figure — needs a verified source.</p>
        </div>
      </section>

      {summary && (
        <section id="results" className="scroll-mt-40 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 pt-6 sm:px-10"><p className="text-sm font-semibold">{summary}</p><p className="text-xs text-muted-foreground">Showing featured flights. Live availability isn't connected yet.</p></div>
          <CategoryPage mode="air" />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Travel deals under KSh 51,938</h2>
            <p className="mt-1 text-xs text-muted-foreground">Example one-way economy fares from Nairobi for 1 adult — prices and dates need verification before booking.</p>
          </div>
          <button type="button" onClick={() => document.getElementById("planning")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Explore more <ArrowRight className="size-4" /></button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DEALS.map((d) => (
            <button key={d.to} type="button" onClick={() => pick(`${d.to} (${d.code})`)} className="group overflow-hidden rounded-sm border border-border bg-card text-left">
              <div className="overflow-hidden"><img src={d.img} alt={`Scenery near ${d.to}`} width={600} height={400} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="p-3">
                <h3 className="text-sm font-semibold">{d.to}</h3>
                <p className="text-xs text-muted-foreground">NBO → {d.code} · {d.dur} direct</p>
                <p className="text-xs text-muted-foreground">Departs any day · return flexible</p>
                <p className="mt-1 font-display font-semibold">from {formatKes(d.price)}<span className="text-xs font-normal text-muted-foreground"> example</span></p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">For travel pros</h2>
        <div className="mt-6 flex snap-x gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
          {PROS.map(({ t, d, icons: [A, B] }) => (
            <div key={t} className="w-44 shrink-0 snap-start rounded-sm border border-border bg-card p-3 lg:w-auto">
              <div className="relative grid h-20 place-items-center rounded-sm bg-secondary" aria-hidden="true">
                <A className="size-9 text-primary" />
                <span className="absolute right-3 bottom-2 grid size-8 place-items-center rounded-full bg-background shadow-sm"><B className="size-4 text-terra-deep" /></span>
              </div>
              <h3 className="mt-3 text-sm font-semibold">{t}</h3>
              <p className="text-xs text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="planning" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-10 sm:px-10">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Start your travel planning here</h2>
        <p className="mt-1 font-medium text-muted-foreground">Search flights</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {PLACES.map(([city, code, info]) => (
            <li key={code}>
              <button type="button" onClick={() => pick(`${city} (${code})`)} className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left transition hover:bg-secondary">
                <Compass className="size-4 shrink-0 text-primary" />
                <span className="min-w-0"><span className="block text-sm font-semibold">Flights to {city} <span className="text-muted-foreground">({code})</span></span><span className="block truncate text-xs text-muted-foreground">{info}</span></span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">Scheduled service varies by airport; some airstrips are served by charter only.</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10 sm:px-10">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {FAQS.map(([q, a]) => (
            <AccordionItem key={q} value={q}><AccordionTrigger className="text-left">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
