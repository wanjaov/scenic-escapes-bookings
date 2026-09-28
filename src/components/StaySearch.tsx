import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarDays, ChevronDown, MapPin, Minus, Plus, Search, Users } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const DESTINATIONS = ["Diani", "Lake Naivasha", "Nanyuki", "Aberdare", "Mombasa", "Nairobi", "Maasai Mara", "Watamu", "Lamu", "Kisumu"] as const;

export function StaySearch({ initialDestination = "" }: { initialDestination?: string }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initialDestination);
  const [dates, setDates] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const today = startOfDay(new Date());
  const dateLabel = dates?.from ? `${format(dates.from, "d MMM")} ${dates.to ? `– ${format(dates.to, "d MMM")}` : "– Check out"}` : "Add dates";

  const search = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (dates?.from && dates.to) {
      params.set("checkIn", format(dates.from, "yyyy-MM-dd"));
      params.set("checkOut", format(dates.to, "yyyy-MM-dd"));
    }
    params.set("adults", String(adults));
    params.set("children", String(children));
    if (pets) params.set("pets", "1");
    navigate({ to: `/stays?${params.toString()}` });
  };

  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl border border-border bg-background p-2 shadow-lg sm:p-3">
      <div className="grid gap-2 md:grid-cols-[1.35fr_1.2fr_1fr_auto]">
        <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
          <PopoverTrigger asChild><Button variant="outline" className="h-16 w-full justify-start gap-3 rounded-sm px-4 text-left shadow-none"><MapPin className="size-5 text-primary" /><span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">Destination</span><span className="block truncate text-sm font-semibold">{destination || "Where in Kenya?"}</span></span><ChevronDown className="size-4 text-muted-foreground" /></Button></PopoverTrigger>
          <PopoverContent align="start" className="w-[min(90vw,320px)] p-2"><p className="px-2 py-2 text-xs font-semibold uppercase text-muted-foreground">Popular destinations</p><div className="max-h-64 overflow-y-auto">{DESTINATIONS.map((place) => <Button key={place} variant="ghost" className="w-full justify-start" onClick={() => { setDestination(place); setDestinationOpen(false); }}>{place}</Button>)}</div></PopoverContent>
        </Popover>
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild><Button variant="outline" className="h-16 w-full justify-start gap-3 rounded-sm px-4 text-left shadow-none"><CalendarDays className="size-5 text-primary" /><span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">Check in — Check out</span><span className="block truncate text-sm font-semibold">{dateLabel}</span></span><ChevronDown className="size-4 text-muted-foreground" /></Button></PopoverTrigger>
          <PopoverContent align="start" className="w-auto max-w-[95vw] p-0 pointer-events-auto"><Calendar mode="range" selected={dates} onSelect={(range) => { setDates(range); if (range?.from && range.to) setDateOpen(false); }} disabled={(date) => isBefore(date, today)} numberOfMonths={1} defaultMonth={dates?.from || today} className="pointer-events-auto p-3" /><div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">Choose your arrival and departure dates</div></PopoverContent>
        </Popover>
        <Popover open={guestOpen} onOpenChange={setGuestOpen}>
          <PopoverTrigger asChild><Button variant="outline" className="h-16 w-full justify-start gap-3 rounded-sm px-4 text-left shadow-none"><Users className="size-5 text-primary" /><span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">Guests</span><span className="block truncate text-sm font-semibold">{adults} {adults === 1 ? "adult" : "adults"} · {children} {children === 1 ? "child" : "children"}</span></span><ChevronDown className="size-4 text-muted-foreground" /></Button></PopoverTrigger>
          <PopoverContent align="start" className="w-72 space-y-4 p-4">{([['Adults', adults, setAdults, 1], ['Children', children, setChildren, 0]] as const).map(([label, count, setter, min]) => <div key={label} className="flex items-center justify-between"><span className="text-sm font-medium">{label}</span><div className="flex items-center gap-3"><Button size="icon" variant="outline" aria-label={`Remove ${label.toLowerCase()}`} disabled={count <= min} onClick={() => setter(count - 1)}><Minus /></Button><span className="w-5 text-center text-sm">{count}</span><Button size="icon" variant="outline" aria-label={`Add ${label.toLowerCase()}`} disabled={count >= 12} onClick={() => setter(count + 1)}><Plus /></Button></div></div>)}<div className="flex items-center gap-3 border-t border-border pt-4"><Checkbox id="pets" checked={pets} onCheckedChange={(v) => setPets(v === true)} /><label htmlFor="pets" className="cursor-pointer text-sm">Travelling with pets</label></div><Button className="w-full" onClick={() => setGuestOpen(false)}>Done</Button></PopoverContent>
        </Popover>
        <Button onClick={search} className="h-16 rounded-sm px-8 text-base"><Search className="size-5" /> Search</Button>
      </div>
      <label className="mt-3 flex cursor-pointer items-center gap-2 px-2 pb-1 text-sm text-muted-foreground"><Checkbox checked={pets} onCheckedChange={(v) => setPets(v === true)} aria-label="Travelling with pets" /> Travelling with pets</label>
    </div>
  );
}
