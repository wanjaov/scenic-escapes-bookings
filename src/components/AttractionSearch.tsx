import { useEffect, useState } from "react";
import { CalendarDays, Search } from "lucide-react";
import { format, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function AttractionSearch({ onSearch }: { onSearch: (destination: string, dates?: DateRange) => void }) {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState<DateRange>();
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState<Date>();
  useEffect(() => setToday(startOfDay(new Date())), []);
  return <form aria-label="Attraction search" onSubmit={(event) => { event.preventDefault(); onSearch(destination.trim(), dates); }} className="grid gap-1 rounded-lg border-4 border-ochre bg-ochre shadow-lg md:grid-cols-[1fr_1fr_auto]">
    <label className="flex min-w-0 items-center gap-3 rounded-sm bg-background px-4 py-3"><Search className="size-6 shrink-0 text-muted-foreground" /><span className="min-w-0 flex-1"><span className="block text-xs text-muted-foreground">Destination</span><input aria-label="Attraction destination" list="attraction-destinations" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Where are you going?" className="h-8 w-full bg-transparent text-base outline-none focus-visible:ring-2 focus-visible:ring-ring" /></span></label>
    <datalist id="attraction-destinations">{["Diani", "Mombasa", "Nairobi", "Naivasha", "Maasai Mara", "Watamu", "Lamu", "Kisumu", "Amboseli"].map((name) => <option key={name} value={name} />)}</datalist>
    <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button type="button" variant="outline" className="h-[76px] justify-start gap-3 rounded-sm border-0 px-4 text-left"><CalendarDays className="size-6 text-muted-foreground" /><span><span className="block text-xs font-normal text-muted-foreground">Dates</span><span className="block text-base font-normal">{dates?.from ? `${format(dates.from, "d MMM yyyy")}${dates.to ? ` – ${format(dates.to, "d MMM")}` : ""}` : "Select dates"}</span></span></Button></PopoverTrigger><PopoverContent align="start" className="w-auto p-0"><Calendar mode="range" selected={dates} onSelect={(value) => { setDates(value); if (value?.to) setOpen(false); }} disabled={today ? { before: today } : undefined} /><Button type="button" variant="ghost" className="w-full" onClick={() => { setDates(undefined); setOpen(false); }}>Clear dates</Button></PopoverContent></Popover>
    <Button type="submit" className="h-full min-h-14 rounded-sm px-8 text-base"><Search className="size-5" />Search</Button>
  </form>;
}