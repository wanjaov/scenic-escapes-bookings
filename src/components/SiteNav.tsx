import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { formatKes } from "../lib/catalog";
import { useBookings } from "../lib/trips";
import { supabase } from "../integrations/supabase/client";

const LINKS = [
  { to: "/stays", label: "Stays" },
  { to: "/sky", label: "Flights" },
  { to: "/car-rental", label: "Car Rental" },
  { to: "/attractions", label: "Attractions" },
  { to: "/transfers", label: "Transfers" },
] as const;

export function SiteNav() {
  const bookings = useBookings();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user))); const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session))); return () => listener.subscription.unsubscribe(); }, []);
  return <header className="relative z-20 bg-background"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-10"><Link to="/" className="font-display text-2xl font-semibold">Routebook<span className="text-primary">.</span></Link><div className="flex items-center gap-2"><div ref={ref} className="relative" onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node | null)) setOpen(false); }}><Button variant="ghost" onClick={() => setOpen((o) => !o)}>My trips{bookings.length > 0 && <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">{bookings.length}</span>}</Button>{open && <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-sm border border-border bg-popover p-4 shadow-lg">{bookings.length === 0 ? <p className="text-sm text-muted-foreground">Nothing booked yet.</p> : <ul className="divide-y divide-border">{bookings.map((b) => <li key={b.ref} className="flex justify-between gap-3 py-2 text-sm"><span>{b.title}<small className="block text-muted-foreground">{b.ref}</small></span><span>{formatKes(b.total)}</span></li>)}</ul>}</div>}</div>{signedIn ? <Button variant="outline" asChild><Link to="/auth" search={{ mode: "signin" }}><UserRound /> Account</Link></Button> : <><Button variant="outline" asChild><Link to="/auth" search={{ mode: "signin" }}>Sign In</Link></Button><Button asChild><Link to="/auth" search={{ mode: "register" }}>Register</Link></Button></>}</div></div><nav aria-label="Main navigation" className="border-t border-border"><div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-8">{LINKS.map((link) => <Link key={link.to} to={link.to} className="shrink-0 border-b-2 border-transparent px-3 py-3 text-sm font-medium text-foreground transition-colors hover:text-primary" activeProps={{ className: "border-primary text-primary" }}>{link.label}</Link>)}</div></nav></header>;
}
