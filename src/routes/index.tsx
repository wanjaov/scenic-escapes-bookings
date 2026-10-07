import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroCoast from "../assets/hero-coast-photo.jpg.asset.json";
import hotelOceanfront from "../assets/hotel-oceanfront-photo.jpg.asset.json";
import hotelLakeside from "../assets/hotel-lakeside-photo.jpg.asset.json";
import hotelMountain from "../assets/hotel-mountain-photo.jpg.asset.json";
import hotelRainforest from "../assets/hotel-rainforest-photo.jpg.asset.json";
import { StaySearch } from "../components/StaySearch";
import { ExploreSections } from "../components/ExploreSections";
import { PromoSections } from "../components/PromoSections";

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
  { name: "Diani Beach", location: "Kwale County, Kenya", image: hotelOceanfront.url, search: "Diani", price: "KES 18,900" },
  { name: "Lake Naivasha", location: "Nakuru County, Kenya", image: hotelLakeside.url, search: "Lake Naivasha", price: "KES 12,500" },
  { name: "Nanyuki", location: "Laikipia County, Kenya", image: hotelMountain.url, search: "Nanyuki", price: "KES 15,200" },
  { name: "Aberdare", location: "Central Highlands, Kenya", image: hotelRainforest.url, search: "Aberdare", price: "KES 11,700" },
];

function Home() {
  return <main>
    <section className="relative min-h-[360px] overflow-hidden bg-pine text-paper sm:min-h-[430px]">
      <img src={heroCoast.url} alt="Aerial view of Kenya's coastline" width={1920} height={900} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-center px-6 pb-20 pt-12 sm:min-h-[430px] sm:px-10">
        <p className="mb-5 text-xs font-semibold uppercase text-paper/90">Stay somewhere worth remembering</p>
        <h1 className="max-w-2xl font-display text-5xl font-semibold leading-tight sm:text-7xl">Find your next stay.</h1>
        <p className="mt-5 max-w-lg text-lg text-paper/95 sm:text-xl">Search deals on hotels, homes, and much more.</p>
      </div>
    </section>
    <div className="relative z-10 -mt-10 px-4 sm:px-8"><StaySearch /></div>
    <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-xs font-semibold uppercase text-terra-deep">Places worth the journey</p><h2 className="font-display text-3xl font-semibold sm:text-4xl">Destinations with Offers</h2></div><Link to="/stays" search={{ destination: "", checkIn: "", checkOut: "", adults: 2, children: 0, pets: false }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Explore all stays <ArrowUpRight className="size-4" /></Link></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{destinations.map((place) => <Link key={place.name} to="/stays" search={{ destination: place.search, checkIn: "", checkOut: "", adults: 2, children: 0, pets: false }} className="group overflow-hidden rounded-sm border border-border bg-card"><div className="overflow-hidden"><img src={place.image} alt={`Photograph of ${place.name}`} width={850} height={600} loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-4"><p className="text-xs font-medium text-muted-foreground">{place.location}</p><h3 className="mt-1 font-display text-lg font-semibold">{place.name}</h3><p className="mt-2 text-sm font-semibold">Featured stays from {place.price}/night</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore <ArrowUpRight className="size-4" /></span></div></Link>)}</div>
    </section>
    <ExploreSections />
    <PromoSections />
  </main>;
}
