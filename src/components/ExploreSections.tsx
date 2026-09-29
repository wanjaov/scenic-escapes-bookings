import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import coast from "../assets/hotel-oceanfront-photo.jpg.asset.json";
import lake from "../assets/hotel-lakeside-photo.jpg.asset.json";
import mountain from "../assets/hotel-mountain-photo.jpg.asset.json";
import safari from "../assets/attractions-photo.jpg.asset.json";

const propertyTypes = [
  { name: "Hotels", image: lake.url, description: "Scenic stays by the water" },
  { name: "Villas", image: coast.url, description: "Coastal places to unwind" },
  { name: "Apartments", image: mountain.url, description: "A base for longer journeys" },
  { name: "Resorts", image: coast.url, description: "Easy days beside the sea" },
];

const activities = [
  { name: "Beach Trips", image: coast.url, location: "Diani, Kenya", description: "The Indian Ocean coast and its long, open beaches." },
  { name: "Volunteering", image: safari.url, location: "Kenya", description: "Explore meaningful local experiences." },
  { name: "Culinary Adventures", image: lake.url, location: "Kenya", description: "Find a new flavour along the way." },
  { name: "Hiking Activities", image: mountain.url, location: "Mount Kenya region", description: "Head towards the highlands and mountain trails." },
  { name: "Adventure & Exploration", image: safari.url, location: "Maasai Mara, Kenya", description: "Go further into Kenya's great landscapes." },
];

const staySearch = { destination: "", checkIn: "", checkOut: "", adults: 2, children: 0, pets: false };

export function ExploreSections() {
  const [property, setProperty] = useState("All");
  const [tenure, setTenure] = useState("All");
  const [activity, setActivity] = useState(0);
  const visible = property === "All" ? propertyTypes : propertyTypes.filter((item) => item.name === property);
  const selected = activities[activity] ?? activities[0];

  return <>
    <section className="border-t border-border bg-cream py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="text-xs font-semibold uppercase text-terra-deep">Find your kind of place</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">Browse Property Type</h2>
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Property type">
          {["All", ...propertyTypes.map((item) => item.name)].map((type) => <Button key={type} size="sm" variant={property === type ? "default" : "outline"} aria-pressed={property === type} onClick={() => setProperty(type)}>{type}</Button>)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Property availability">
          {["All", "For Sale", "For Lease"].map((type) => <Button key={type} size="sm" variant={tenure === type ? "secondary" : "ghost"} aria-pressed={tenure === type} onClick={() => setTenure(type)}>{type}</Button>)}
        </div>
        {tenure === "All" ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{visible.map((item) => <article key={item.name} className="overflow-hidden rounded-sm border border-border bg-background"><img src={item.image} alt={`Photograph from Kenya for ${item.name.toLowerCase()}`} loading="lazy" width={850} height={600} className="aspect-[16/9] w-full object-cover" /><div className="p-4"><h3 className="font-display text-lg">{item.name}</h3><p className="mt-1 text-sm text-muted-foreground">{item.description}</p><Button variant="link" className="mt-2 h-auto p-0" asChild><Link to="/stays" search={staySearch}>Explore stays <ArrowUpRight className="size-4" /></Link></Button></div></article>)}</div> : <p className="mt-6 border-t border-border py-8 text-sm text-muted-foreground">No verified {tenure === "For Sale" ? "for-sale" : "lease"} properties are listed yet.</p>}
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-18">
      <p className="text-xs font-semibold uppercase text-terra-deep">Go beyond the itinerary</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">Quick & Easy Trip Planner</h2>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Trip categories">{activities.map((item, index) => <Button key={item.name} variant={activity === index ? "default" : "outline"} aria-pressed={activity === index} className="shrink-0" onClick={() => setActivity(index)}>{item.name}</Button>)}</div>
      {selected && <div className="mt-5 grid overflow-hidden border border-border bg-card sm:grid-cols-[minmax(0,320px)_1fr]"><img src={selected.image} alt={`Photograph of ${selected.location}`} loading="lazy" width={850} height={600} className="aspect-[16/9] h-full max-h-56 w-full object-cover sm:max-h-60" /><div className="flex flex-col items-start justify-center p-5 sm:p-7"><p className="text-xs font-medium text-muted-foreground">{selected.location}</p><h3 className="mt-2 font-display text-2xl">{selected.name}</h3><p className="mt-2 text-sm text-muted-foreground">{selected.description}</p><Button className="mt-5" asChild><Link to="/attractions">Explore attractions <ArrowUpRight className="size-4" /></Link></Button></div></div>}
    </section>
  </>;
}