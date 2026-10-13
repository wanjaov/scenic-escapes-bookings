import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarCheck, FerrisWheel, Gift, Headset, MapPin, Search, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import beach from "../assets/hotel-oceanfront-photo.jpg.asset.json";
import mombasa from "../assets/attraction-fort_jesus_mombasa.jpg.asset.json";
import safari from "../assets/attractions-photo.jpg.asset.json";
import lake from "../assets/hotel-lakeside-photo.jpg.asset.json";
import lamu from "../assets/stays-lamu.jpg.asset.json";
import paris from "../assets/attraction-paris.jpg.asset.json";
import istanbul from "../assets/attraction-istanbul.jpg.asset.json";
import sydney from "../assets/attraction-sydney.jpg.asset.json";
import newYork from "../assets/attraction-new_york.jpg.asset.json";
import { KENYA_ATTRACTIONS, ATTRACTION_REGIONS, type Attraction } from "../lib/attractions";
import { AttractionSearch } from "./AttractionSearch";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const nearby = [
  { name: "Diani Beach", location: "Kwale County", image: beach.url, query: "Diani" },
  { name: "Mombasa", location: "Mombasa County", image: mombasa.url, query: "Mombasa" },
  { name: "Maasai Mara", location: "Narok County", image: safari.url, query: "Maasai Mara" },
];
const continents = ["Europe", "North America", "Asia", "Africa", "Oceania", "Middle East", "South America", "Caribbean", "Central America"];
const places: Record<string, { name: string; location: string; image?: string; query?: string }[]> = {
  Europe: [{ name: "Paris", location: "France", image: paris.url }, { name: "Istanbul", location: "Türkiye", image: istanbul.url }],
  "North America": [{ name: "New York", location: "United States", image: newYork.url }],
  Asia: [{ name: "Tokyo", location: "Japan" }, { name: "Bangkok", location: "Thailand" }, { name: "Singapore", location: "Singapore" }, { name: "Bali", location: "Indonesia" }],
  Africa: [...nearby, { name: "Lake Naivasha", location: "Nakuru County", image: lake.url, query: "Naivasha" }, { name: "Lamu", location: "Lamu County", image: lamu.url, query: "Lamu" }],
  Oceania: [{ name: "Sydney", location: "Australia", image: sydney.url }],
  "Middle East": [{ name: "Dubai", location: "United Arab Emirates" }, { name: "Abu Dhabi", location: "United Arab Emirates" }, { name: "Doha", location: "Qatar" }, { name: "Muscat", location: "Oman" }],
  "South America": [{ name: "Rio de Janeiro", location: "Brazil" }, { name: "Buenos Aires", location: "Argentina" }, { name: "Cusco", location: "Peru" }],
  Caribbean: [{ name: "Havana", location: "Cuba" }, { name: "Bridgetown", location: "Barbados" }, { name: "Kingston", location: "Jamaica" }],
  "Central America": [{ name: "San José", location: "Costa Rica" }, { name: "Panama City", location: "Panama" }, { name: "Antigua Guatemala", location: "Guatemala" }],
};
const wrap = "mx-auto max-w-7xl px-6 sm:px-10";
function mapsUrl(query: string) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`; }

export function AttractionsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All Kenya");
  const [kind, setKind] = useState("All types");
  const [dateSummary, setDateSummary] = useState("");
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<Attraction | null>(null);
  const directory = useRef<HTMLElement>(null);
  const results = KENYA_ATTRACTIONS.filter((item) => (region === "All Kenya" || item.region === region) && (kind === "All types" || item.category === kind) && `${item.name} ${item.location} ${item.description}`.toLowerCase().includes(query.toLowerCase()));
  const categories = [...new Set(KENYA_ATTRACTIONS.map((item) => item.category))].sort();
  function search(destination: string, dates?: DateRange) {
    setQuery(destination); setRegion("All Kenya"); setKind("All types"); setSearched(true);
    setDateSummary(dates?.from ? `${format(dates.from, "d MMM yyyy")}${dates.to ? ` – ${format(dates.to, "d MMM yyyy")}` : ""}` : "");
    directory.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <main>
    <section className="relative overflow-hidden bg-pine text-paper">
      <img src={safari.url} alt="Wildlife safari in the Maasai Mara, Kenya" className="absolute inset-0 h-full w-full object-cover" width={850} height={600} />
      <div className="absolute inset-0 bg-ink/65" />
      <div className={`${wrap} relative py-12 pb-20 sm:py-16 sm:pb-24`}>
        <p className="mb-5 text-sm font-semibold text-ochre">01 / Discover</p>
        <h1 className="max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-6xl">Attractions, activities, and experiences</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl">Discover new activities and experiences to match your interests and travel style</p>
      </div>
    </section>
    <div className={`${wrap} relative -mt-9`}><AttractionSearch onSearch={search} /></div>

    <section className={`${wrap} py-12`} aria-labelledby="nearby-title">
      <p className="mb-3 text-sm font-semibold text-terra-deep">02 / Close to home</p>
      <h2 id="nearby-title" className="text-3xl">Nearby destinations</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">{nearby.map((place) => <Button key={place.name} variant="ghost" onClick={() => search(place.query)} className="group relative h-auto overflow-hidden rounded-lg p-0 text-left">
        <img src={place.image} alt={place.name === "Mombasa" ? "Fort Jesus overlooking Mombasa's coast" : `Real photograph of ${place.name}`} width={640} height={400} className="aspect-[16/10] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" />
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-ink/80 px-4 py-3 text-paper"><span className="min-w-0"><span className="block whitespace-normal font-display text-xl">{place.name}</span><span className="block text-xs font-normal">{place.location}</span></span><ArrowUpRight className="size-5 shrink-0" /></span>
      </Button>)}</div>
      <div className="mt-10 border-t border-border pt-9"><h2 className="text-3xl">Your account, your travel</h2><div className="mt-5 flex items-center justify-between gap-6 border-y border-border py-7"><div><h3 className="text-xl">All your trip details in one place</h3><p className="mt-3 text-sm sm:text-base">Sign in to your Routebook account and plan your next adventure.</p><div className="mt-4 flex gap-3"><Button asChild className="motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"><Link to="/auth" search={{ mode: "signin" }}>Sign in</Link></Button><Button variant="ghost" asChild><Link to="/auth" search={{ mode: "register" }}>Register</Link></Button></div></div><Gift className="hidden size-24 shrink-0 text-primary sm:block" strokeWidth={1.5} /></div></div>
    </section>

    <section className="bg-secondary" aria-labelledby="covered-title"><div className={`${wrap} py-10`}><p className="mb-3 text-sm font-semibold text-terra-deep">03 / Go further</p><h2 id="covered-title" className="text-3xl">We've got you covered</h2><div className="mt-7 grid gap-7 lg:grid-cols-3">
      <div className="flex gap-4"><FerrisWheel className="size-8 shrink-0 text-pine" /><div><h3 className="text-lg">Explore top activities</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Discover wildlife, heritage, beaches and outdoor adventures across Kenya.</p></div></div>
      <div className="flex gap-4"><CalendarCheck className="size-8 shrink-0 text-pine" /><div><h3 className="text-lg">Plan with flexibility</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Check opening times, entry requirements and cancellation terms with the attraction before you travel.</p></div></div>
      <div className="flex gap-4"><Headset className="size-8 shrink-0 text-pine" /><div><h3 className="text-lg">Support when you need it</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Contact your activity operator for visit arrangements and support. No 24/7 service is confirmed.</p></div></div>
    </div></div></section>
    <section className={`${wrap} py-12`} aria-labelledby="explore-title"><h2 id="explore-title" className="text-3xl">Explore more destinations</h2><p className="mt-3 text-muted-foreground">Find inspiration in cities around the world</p>
      <Tabs defaultValue="Europe" className="mt-7"><div className="overflow-x-auto"><TabsList className="h-auto w-max justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">{continents.map((continent) => <TabsTrigger key={continent} value={continent} className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none">{continent}</TabsTrigger>)}</TabsList></div>
        {continents.map((continent) => <TabsContent key={continent} value={continent} className="mt-6"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{places[continent]?.map((place) => place.image ? <a key={place.name} href={mapsUrl(`${place.name} ${place.location} attractions`)} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-lg focus-visible:outline-ring"><img src={place.image} alt={`Photograph of ${place.name}`} width={640} height={400} loading="lazy" className="aspect-[16/10] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-ink/80 px-4 py-3 text-paper"><span className="block font-display text-xl">{place.name}</span><span className="text-xs">{place.location} <ArrowUpRight className="ml-1 inline size-3" /></span></span></a> : <a key={place.name} href={mapsUrl(`${place.name} attractions`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border-b border-border py-5 text-primary"><span><strong className="block">{place.name}</strong><span className="text-xs text-muted-foreground">{place.location}</span></span><ArrowUpRight className="size-4" /></a>)}</div></TabsContent>)}
      </Tabs><p className="mt-5 text-xs text-muted-foreground">International destinations open Google Maps. Live activity inventory is not connected.</p>
    </section>

    <section ref={directory} id="kenya-attractions" className="scroll-mt-6 border-t border-border" aria-labelledby="directory-title"><div className={`${wrap} py-12`}><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mb-3 text-sm font-semibold text-terra-deep">The Kenya directory</p><h2 id="directory-title" className="text-3xl sm:text-4xl">Attraction sites in Kenya</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Explore parks, beaches, museums and heritage sites across the country. This growing directory is not an exhaustive list.</p></div><span className="text-sm text-muted-foreground">{results.length} of {KENYA_ATTRACTIONS.length} sites</span></div>
      <div className="mt-7 grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]"><label className="text-xs font-medium">Find a site<div className="mt-2 flex items-center gap-2 rounded-sm border border-input bg-background px-3"><Search className="size-4 text-muted-foreground" /><input aria-label="Find an attraction" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, city or county" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div></label><label className="text-xs font-medium">Region<select aria-label="Attraction region" value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 text-sm">{ATTRACTION_REGIONS.map((value) => <option key={value}>{value}</option>)}</select></label><label className="text-xs font-medium">Attraction type<select aria-label="Attraction type" value={kind} onChange={(event) => setKind(event.target.value)} className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3 text-sm">{["All types", ...categories].map((value) => <option key={value}>{value}</option>)}</select></label></div>
      {searched && <p role="status" className="mt-4 text-sm">{results.length} matching sites{dateSummary ? ` · Planned visit: ${dateSummary}` : ""}. Dates do not confirm availability; no booking has been made.</p>}
      <p className="mt-4 text-xs text-muted-foreground">Routebook has no verified visitor reviews yet. Each site's review link opens Google Maps.</p>
      <div className="mt-7 grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">{results.map((item) => <article key={item.name} className="flex flex-col border-t border-border py-5"><p className="text-xs font-semibold text-terra-deep">{item.category} · {item.region}</p><h3 className="mt-2 text-xl">{item.name}</h3><p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5 shrink-0" />{item.location}, Kenya</p><p className="mt-3 flex-1 text-sm leading-relaxed">{item.description}</p><p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><MessageSquare className="size-3.5" />No verified Routebook reviews</p><div className="mt-4 flex flex-wrap items-center gap-4"><Button variant="outline" size="sm" onClick={() => setSelected(item)}>View details</Button><a href={mapsUrl(`${item.name} ${item.location} Kenya`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary underline">Map & visitor reviews<ArrowUpRight className="size-3" /></a></div></article>)}</div>
      {!results.length && <div className="py-10"><h3 className="text-xl">No matching sites</h3><p className="mt-2 text-muted-foreground">Try a different destination or clear the filters.</p><Button variant="outline" className="mt-4" onClick={() => { setQuery(""); setRegion("All Kenya"); setKind("All types"); }}>Show all sites</Button></div>}
      <div className="mt-8 flex flex-wrap gap-4 border-t border-border pt-5 text-xs text-muted-foreground"><span>Visit information:</span><a href="https://www.kws.go.ke/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Kenya Wildlife Service</a><a href="https://museums.or.ke/" target="_blank" rel="noopener noreferrer" className="text-primary underline">National Museums of Kenya</a><a href="https://whc.unesco.org/en/statesparties/ke/" target="_blank" rel="noopener noreferrer" className="text-primary underline">UNESCO Kenya</a></div>
    </div></section>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}><DialogContent className="max-w-[min(92vw,520px)]"><DialogHeader><DialogTitle>{selected?.name}</DialogTitle><DialogDescription>{selected?.location}, Kenya</DialogDescription></DialogHeader><p className="text-sm leading-relaxed">{selected?.description}</p><p className="text-sm text-muted-foreground">Check entry fees, opening hours and access with the attraction before travelling. No live tickets or verified Routebook reviews are available.</p>{selected && <Button asChild><a href={mapsUrl(`${selected.name} ${selected.location} Kenya`)} target="_blank" rel="noopener noreferrer"><MapPin />Map & visitor reviews<ArrowUpRight /></a></Button>}</DialogContent></Dialog>
  </main>;
}