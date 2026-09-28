import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import heroCoast from "../assets/hero-coast.jpg";
import hotelOceanfront from "../assets/hotel-oceanfront.jpg";
import hotelLakeside from "../assets/hotel-lakeside.jpg";
import hotelMountain from "../assets/hotel-mountain.jpg";
import hotelRainforest from "../assets/hotel-rainforest.jpg";
import { StaySearch } from "../components/StaySearch";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Find your next stay in Kenya | Routebook" },
    { name: "description", content: "Explore scenic stays and destination offers across Kenya. Choose dates and guests, then find your next stay." },
    { property: "og:title", content: "Find your next stay in Kenya | Routebook" },
    { property: "og:description", content: "Explore scenic stays and destination offers across Kenya." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

const destinations = [
  { name: "Diani Beach", location: "Coast", image: hotelOceanfront, rating: "4.8", reviews: "Guest favourite", search: "Diani" },
  { name: "Lake Naivasha", location: "Great Rift Valley", image: hotelLakeside, rating: "4.7", reviews: "Guest favourite", search: "Lake Naivasha" },
  { name: "Nanyuki", location: "Mount Kenya", image: hotelMountain, rating: "4.9", reviews: "Guest favourite", search: "Nanyuki" },
  { name: "Aberdare", location: "Central Highlands", image: hotelRainforest, rating: "4.6", reviews: "Guest favourite", search: "Aberdare" },
];

function Home() {
  return <main>
    <section className="relative min-h-[540px] overflow-hidden bg-pine text-paper sm:min-h-[590px]">
      <img src={heroCoast} alt="Aerial view of Kenya's coastline" width={1920} height={900} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative mx-auto flex min-h-[540px] max-w-7xl flex-col justify-center px-6 pb-28 pt-16 sm:min-h-[590px] sm:px-10">
        <p className="mb-5 text-xs font-semibold uppercase text-paper/90">Stay somewhere worth remembering</p>
        <h1 className="max-w-2xl font-display text-5xl font-semibold leading-tight sm:text-7xl">Find your next stay.</h1>
        <p className="mt-5 max-w-lg text-lg text-paper/95 sm:text-xl">Search deals on hotels, homes, and much more.</p>
      </div>
    </section>
    <div className="relative z-10 -mt-16 px-4 sm:px-8"><StaySearch /></div>
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-xs font-semibold uppercase text-terra-deep">Places worth the journey</p><h2 className="font-display text-3xl font-semibold sm:text-4xl">Destinations with Offers</h2></div><Link to="/stays" search={{ destination: "", checkIn: "", checkOut: "", adults: 2, children: 0, pets: false }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Explore all stays <ArrowUpRight className="size-4" /></Link></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{destinations.map((place) => <Link key={place.name} to="/stays" search={{ destination: place.search, checkIn: "", checkOut: "", adults: 2, children: 0, pets: false }} className="group overflow-hidden rounded-sm border border-border bg-card"><div className="overflow-hidden"><img src={place.image} alt={`Scenic stay in ${place.name}`} width={912} height={1200} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-4"><p className="text-xs font-medium text-muted-foreground">{place.location}</p><div className="mt-1 flex items-start justify-between gap-2"><h3 className="font-display text-xl font-semibold">{place.name}</h3><span className="flex items-center gap-1 text-sm font-semibold"><Star className="size-4 fill-ochre text-ochre" />{place.rating}</span></div><p className="mt-2 text-xs text-muted-foreground">{place.reviews} · Sample rating</p></div></Link>)}</div>
    </section>
  </main>;
}
