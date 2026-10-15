import { Link } from "@tanstack/react-router";
import { CalendarCheck, ExternalLink, Gift, Headset, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";

const COMPANIES = [
  { name: "Autounion", url: "https://www.autounioncarrental.com/" },
  { name: "Greenmotion", url: "https://greenmotion.com/" },
  { name: "Europcar", url: "https://www.europcar.com/" },
];

export function RentalHighlights() {
  return (
    <>
      <section aria-labelledby="rental-companies" className="mx-auto max-w-7xl border-t border-border px-6 pb-10 pt-9 sm:px-10">
        <h2 id="rental-companies" className="text-2xl sm:text-3xl">Popular rental car companies</h2>
        <div className="mt-6 grid max-w-xl grid-cols-3 gap-3 sm:gap-6">
          {COMPANIES.map((company) => (
            <a key={company.name} href={company.url} target="_blank" rel="noopener noreferrer" className="group min-w-0 text-center focus-visible:outline-ring">
              <div className="flex h-20 items-center justify-center rounded-md border border-border bg-secondary px-2 font-display text-sm font-semibold text-pine transition-colors group-hover:bg-accent sm:text-lg">{company.name}</div>
              <span className="mt-3 inline-flex items-center gap-1 text-xs underline decoration-border underline-offset-4 group-hover:text-primary sm:text-sm">{company.name}<ExternalLink className="size-3" /></span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Independent company websites. No partnership or rental availability is confirmed.</p>
      </section>

      <section aria-label="Rental travel essentials" className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-9 sm:px-10 lg:grid-cols-3">
          <div className="flex items-start gap-4"><Headset aria-hidden="true" className="size-10 shrink-0 text-primary" /><div><h3 className="text-lg">We're here for you</h3><p className="mt-2 text-sm text-muted-foreground">Customer support options and languages will be confirmed by your rental provider.</p></div></div>
          <div className="flex items-start gap-4"><CalendarCheck aria-hidden="true" className="size-10 shrink-0 text-pine" /><div><h3 className="text-lg">Free cancellation</h3><p className="mt-2 text-sm text-muted-foreground">Cancellation windows vary. Check the provider’s policy before booking.</p></div></div>
          <div className="flex items-start gap-4"><ThumbsUp aria-hidden="true" className="size-10 shrink-0 text-terra-deep" /><div><h3 className="text-lg">Verified customer reviews</h3><p className="mt-2 text-sm text-muted-foreground">Verified rental reviews are not available yet.</p></div></div>
        </div>
      </section>

      <section aria-labelledby="rental-savings" className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <h2 id="rental-savings" className="text-2xl sm:text-3xl">Travel more, spend less</h2>
        <div className="mt-5 flex items-center justify-between gap-6 border-y border-border py-7 sm:gap-10">
          <div className="min-w-0">
            <h3 className="text-xl">Sign in, save money</h3>
            <p className="mt-3 text-sm sm:text-base">Save 10% on select rental cars — look for the Genius label.</p>
            <p className="mt-2 text-xs text-muted-foreground">Preview promotion only. No Genius programme or rental discount is currently available.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"><Link to="/auth" search={{ mode: "signin" }}>Sign in</Link></Button>
              <Button asChild variant="ghost" className="text-primary motion-safe:transition-transform motion-safe:hover:-translate-y-0.5"><Link to="/auth" search={{ mode: "register" }}>Register</Link></Button>
            </div>
          </div>
          <Gift aria-hidden="true" className="hidden size-24 shrink-0 text-primary sm:block" strokeWidth={1.5} />
        </div>
      </section>

    </>
  );
}