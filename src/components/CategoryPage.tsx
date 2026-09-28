import { useState } from "react";
import { MODES_BY_ID, nightsBetween, offersFor, type ModeId, type Offer } from "../lib/catalog";
import { addBooking } from "../lib/trips";
import { BookingSheet } from "./BookingSheet";
import { CategoryBand, type BandLayout, type BandTone } from "./CategoryBand";

const STYLES: Record<ModeId, { tone: BandTone; layout: BandLayout; columns: 3 | 4 }> = {
  bus: { tone: "paper", layout: "cards", columns: 3 },
  rail: { tone: "pine", layout: "cards", columns: 3 },
  air: { tone: "cream", layout: "cards", columns: 3 },
  water: { tone: "paper", layout: "feature", columns: 3 },
  hotel: { tone: "terra", layout: "cards", columns: 4 },
};

export function CategoryPage({ mode, staySearch }: { mode: ModeId; staySearch?: { destination: string; checkIn: string; checkOut: string; adults: number; children: number; pets: boolean } }) {
  const [offer, setOffer] = useState<Offer | null>(null);
  const style = STYLES[mode];
  const allOffers = offersFor(mode);
  const matches = staySearch?.destination ? allOffers.filter((item) => item.meta.toLowerCase().includes(staySearch.destination.toLowerCase())) : allOffers;
  const searchApplied = Boolean(staySearch?.destination || staySearch?.checkIn || staySearch?.pets);
  return (
    <main>
      {mode === "hotel" && searchApplied && <div className="border-b border-border px-6 py-6 sm:px-10"><p className="text-sm font-semibold">{staySearch?.destination || "All destinations"} {staySearch?.checkIn && staySearch?.checkOut ? `· ${staySearch.checkIn} – ${staySearch.checkOut}` : ""} · {staySearch?.adults} adults{staySearch?.children ? ` · ${staySearch.children} children` : ""}{staySearch?.pets ? " · Travelling with pets" : ""}</p><p className="mt-1 text-sm text-muted-foreground">{matches.length ? `${matches.length} featured ${matches.length === 1 ? "stay" : "stays"} to explore. Dates, guest capacity and pet policies are not yet verified.` : "No featured stays in this destination yet. Explore the other stays below."}</p></div>}
      <CategoryBand
        mode={MODES_BY_ID[mode]}
        offers={matches.length ? matches : allOffers}
        tone={style.tone}
        layout={style.layout}
        columns={style.columns}
        onBook={setOffer}
      />
      {offer && (
        <BookingSheet
          offer={offer}
          travellers={staySearch?.adults ?? 2}
          nights={staySearch?.checkIn && staySearch.checkOut ? nightsBetween(staySearch.checkIn, staySearch.checkOut) : 2}
          onClose={() => setOffer(null)}
          onConfirm={addBooking}
        />
      )}
    </main>
  );
}
