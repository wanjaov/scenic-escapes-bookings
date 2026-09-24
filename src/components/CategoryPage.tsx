import { useState } from "react";
import { MODES_BY_ID, offersFor, type ModeId, type Offer } from "../lib/catalog";
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

export function CategoryPage({ mode }: { mode: ModeId }) {
  const [offer, setOffer] = useState<Offer | null>(null);
  const style = STYLES[mode];
  return (
    <main>
      <CategoryBand
        mode={MODES_BY_ID[mode]}
        offers={offersFor(mode)}
        tone={style.tone}
        layout={style.layout}
        columns={style.columns}
        onBook={setOffer}
      />
      {offer && (
        <BookingSheet
          offer={offer}
          travellers={2}
          nights={2}
          onClose={() => setOffer(null)}
          onConfirm={addBooking}
        />
      )}
    </main>
  );
}
