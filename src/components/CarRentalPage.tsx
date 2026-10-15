import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { Clock3, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { RentalHighlights } from "./RentalHighlights";

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
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl">Car rental in Kenya</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">From the city to the coast, plan your next journey at your own pace.</p>
      </div>
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
    </section>
    <RentalHighlights />
  </main>;
}