import { useState } from "react";
import car from "../assets/car-rental-photo.jpg.asset.json";
import scenery from "../assets/hero-coast-photo.jpg.asset.json";
import safari from "../assets/attractions-photo.jpg.asset.json";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function RentalPromo() {
  const [termsOpen, setTermsOpen] = useState(false);
  return <section aria-label="Rental promotion" className="bg-pine text-paper">
    <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-9 sm:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:py-12">
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
    <Dialog open={termsOpen} onOpenChange={setTermsOpen}><DialogContent className="max-w-[min(92vw,480px)]"><DialogHeader><DialogTitle>Rental promotion terms</DialogTitle><DialogDescription className="pt-3 leading-relaxed">The 15% promotion is a design preview, not an active offer. No discount, countdown or participating provider is confirmed. Actual prices, eligibility, driver age rules and rental terms will be supplied by the rental provider before booking.</DialogDescription></DialogHeader></DialogContent></Dialog>
  </section>;
}
