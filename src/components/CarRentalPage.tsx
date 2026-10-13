import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { CarFront, Clock3, MapPin, Search, SlidersHorizontal } from "lucide-react";
import car from "../assets/car-rental-photo.jpg.asset.json";
import scenery from "../assets/hero-coast-photo.jpg.asset.json";
import safari from "../assets/attractions-photo.jpg.asset.json";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { RentalHighlights } from "./RentalHighlights";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const LOCATIONS = ["Nairobi — Jomo Kenyatta Airport", "Nairobi — Wilson Airport", "Nairobi city centre", "Mombasa — Moi Airport", "Diani — Ukunda Airport", "Kisumu Airport", "Naivasha", "Nanyuki"];
const fieldClass = "h-10 w-full min-w-0 bg-transparent text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm";

export function CarRentalPage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [today, setToday] = useState("");
  const [differentLocation, setDifferentLocation] = useState(false);
  const [standardAge, setStandardAge] = useState(false);
  const [age, setAge] = useState(20);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [carType, setCarType] = useState("Any car type");
  const [transmission, setTransmission] = useState("Any transmission");
  const [airConditioning, setAirConditioning] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const now = new Date();
    setToday(format(now, "yyyy-MM-dd"));
    setPickupDate(format(addDays(now, 3), "yyyy-MM-dd"));
    setDropoffDate(format(addDays(now, 6), "yyyy-MM-dd"));
  }, []);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("");
    if (!pickup.trim() || (differentLocation && !dropoff.trim())) {
      setError("Please enter a pick-up location and, if different, a drop-off location.");
      return;
    }
    if (!pickupDate || !dropoffDate || pickupDate < today || `${dropoffDate}T${dropoffTime}` <= `${pickupDate}T${pickupTime}`) {
      setError("Choose a future pick-up time and a drop-off time after pick-up.");
      return;
    }
    setError("");
    const preferences = [carType, transmission, ...(airConditioning ? ["Air conditioning"] : [])].join(" · ");
    setResult(`${pickup.trim()} → ${differentLocation ? dropoff.trim() : pickup.trim()} · ${format(new Date(`${pickupDate}T${pickupTime}`), "d MMM yyyy, HH:mm")} – ${format(new Date(`${dropoffDate}T${dropoffTime}`), "d MMM yyyy, HH:mm")} · Driver ${standardAge ? "30–65" : age} · ${preferences}`);
  }

  return <main>
    <section aria-label="Car rental search" className="relative mx-auto max-w-7xl px-4 pb-10 pt-7 sm:px-10">
      <form onSubmit={search}>
        <div className="grid gap-1 rounded-lg border-4 border-ochre bg-ochre shadow-lg sm:grid-cols-2 lg:grid-cols-[minmax(220px,2fr)_minmax(150px,1fr)_minmax(115px,0.8fr)_minmax(150px,1fr)_minmax(115px,0.8fr)_auto]">
          <label className="flex min-w-0 items-center gap-3 rounded-sm bg-background px-4 py-2 sm:col-span-2 lg:col-span-1"><Search className="size-6 shrink-0 text-muted-foreground" /><span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">Pick-up location</span><input aria-label="Pick-up location" required list="rental-locations" placeholder="Airport, city, or station" value={pickup} onChange={(e) => setPickup(e.target.value)} className={fieldClass} /></span></label>
          <label className="min-w-0 rounded-sm bg-background px-3 py-2"><span className="block text-xs text-muted-foreground">Pick-up date</span><input aria-label="Pick-up date" type="date" required min={today} value={pickupDate} onChange={(e) => { setPickupDate(e.target.value); if (e.target.value > dropoffDate) setDropoffDate(e.target.value); }} className={fieldClass} /></label>
          <label className="min-w-0 rounded-sm bg-background px-3 py-2"><span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />Time</span><input aria-label="Pick-up time" type="time" required value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className={fieldClass} /></label>
          <label className="min-w-0 rounded-sm bg-background px-3 py-2"><span className="block text-xs text-muted-foreground">Drop-off date</span><input aria-label="Drop-off date" type="date" required min={pickupDate || today} value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} className={fieldClass} /></label>
          <label className="min-w-0 rounded-sm bg-background px-3 py-2"><span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />Time</span><input aria-label="Drop-off time" type="time" required value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} className={fieldClass} /></label>
          <Button type="submit" className="h-full min-h-16 rounded-sm px-6 text-base sm:col-span-2 lg:col-span-1"><Search />Search</Button>
        </div>
        <datalist id="rental-locations">{LOCATIONS.map((place) => <option key={place} value={place} />)}</datalist>
        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm">
          <label className="flex cursor-pointer items-center gap-3"><Checkbox checked={differentLocation} onCheckedChange={(v) => setDifferentLocation(v === true)} />Drop car off at different location</label>
          <label className="flex cursor-pointer items-center gap-3"><Checkbox checked={standardAge} onCheckedChange={(v) => setStandardAge(v === true)} />Driver aged 30 – 65?</label>
          {!standardAge && <label className="flex items-center gap-3">Driver’s Age<input aria-label="Driver’s Age" type="number" required min={18} max={99} value={age} onChange={(e) => setAge(Number(e.target.value))} className="h-9 w-20 rounded-sm border border-input bg-background px-2 focus-visible:outline-ring" /></label>}
          <Button variant="link" type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} aria-controls="rental-quick-filters" className="ml-auto px-0 text-base"><SlidersHorizontal />Quick filters</Button>
        </div>
        {differentLocation && <label className="mt-5 flex max-w-xl items-center gap-3 border border-input bg-background px-4 py-3"><MapPin className="size-5 text-primary" /><span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">Drop-off location</span><input aria-label="Drop-off location" list="rental-locations" required value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder="Airport, city, or station" className={fieldClass} /></span></label>}
        {filtersOpen && <div id="rental-quick-filters" className="mt-6 grid items-end gap-5 border-y border-border py-5 sm:grid-cols-3">
          <label className="text-sm">Car type<select aria-label="Car type" value={carType} onChange={(e) => setCarType(e.target.value)} className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3">{["Any car type", "Economy", "Compact", "SUV / 4×4", "People carrier"].map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="text-sm">Transmission<select aria-label="Transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} className="mt-2 h-11 w-full rounded-sm border border-input bg-background px-3">{["Any transmission", "Automatic", "Manual"].map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="flex h-11 cursor-pointer items-center gap-3 text-sm"><Checkbox checked={airConditioning} onCheckedChange={(v) => setAirConditioning(v === true)} />Air conditioning</label>
        </div>}
        {error && <p role="alert" className="mt-5 text-sm text-destructive">{error}</p>}
      </form>
      {result && <div role="status" className="mt-8 border-y border-border py-6"><p className="mb-2 text-sm font-semibold text-terra-deep">Your rental search</p><p className="text-sm leading-relaxed">{result}</p><h2 className="mt-5 text-2xl">No live rental listings yet</h2><p className="mt-2 text-sm text-muted-foreground">Rental providers and availability haven’t been connected. No booking or payment has been made.</p></div>}
      <div className="mt-12 flex items-start gap-4 border-t border-border pt-7"><CarFront className="mt-1 size-7 shrink-0 text-terra-deep" /><div><h2 className="text-2xl">Car rental in Kenya</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">From the city to the coast, plan your next journey at your own pace.</p></div></div>
    </section>
    <section className="bg-pine text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-9 sm:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:pb-20 lg:pt-12">
        <div>
          <p className="mb-4 text-sm font-semibold text-ochre">Preview promotion · not currently available</p>
          <h1 className="max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-6xl">Up to 15% off on rental cars</h1>
          <p className="mt-6 text-lg text-paper/95">Enjoy the freedom of the open road. <Button variant="link" onClick={() => setTermsOpen(true)} className="h-auto p-0 text-lg text-paper underline">Terms apply.</Button></p>
          <p className="mt-4 text-sm text-paper/80">Offer dates and participating rental providers to be confirmed.</p>
        </div>
        <div className="grid h-48 grid-cols-[1.2fr_0.9fr] grid-rows-2 gap-3 sm:h-64 lg:h-80">
          <img src={car.url} alt="Safari rental vehicles in Kenya" width={850} height={600} className="row-span-2 h-full w-full rounded-lg object-cover" />
          <img src={scenery.url} alt="Kenyan coast seen from above" width={850} height={600} className="h-full w-full rounded-lg object-cover" />
          <img src={safari.url} alt="Exploring Kenya on safari" width={850} height={600} className="h-full w-full rounded-lg object-cover" />
        </div>
      </div>
    </section>
    <RentalHighlights />
    <Dialog open={termsOpen} onOpenChange={setTermsOpen}><DialogContent className="max-w-[min(92vw,480px)]"><DialogHeader><DialogTitle>Rental promotion terms</DialogTitle><DialogDescription className="pt-3 leading-relaxed">The 15% promotion is a design preview, not an active offer. No discount, countdown or participating provider is confirmed. Actual prices, eligibility, driver age rules and rental terms will be supplied by the rental provider before booking.</DialogDescription></DialogHeader></DialogContent></Dialog>
  </main>;
}