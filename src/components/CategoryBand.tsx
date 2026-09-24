import { formatKes, type ModeMeta, type Offer } from "../lib/catalog";
import { OfferCard } from "./OfferCard";

export type BandTone = "paper" | "cream" | "pine" | "terra";
export type BandLayout = "cards" | "feature";

interface CategoryBandProps {
  mode: ModeMeta;
  offers: Offer[];
  tone: BandTone;
  layout?: BandLayout;
  columns?: 3 | 4;
  onBook: (offer: Offer) => void;
}

const TONES: Record<
  BandTone,
  { band: string; card: string; pill: string; count: string }
> = {
  paper: {
    band: "bg-background text-foreground",
    card: "bg-card",
    pill: "bg-pine/10 text-pine",
    count: "text-muted-foreground",
  },
  cream: {
    band: "bg-cream text-foreground",
    card: "bg-paper",
    pill: "bg-terra/10 text-terra",
    count: "text-muted-foreground",
  },
  pine: {
    band: "bg-pine text-paper",
    card: "bg-cream",
    pill: "bg-pine/10 text-pine",
    count: "text-paper/60",
  },
  terra: {
    band: "bg-terra text-paper",
    card: "bg-paper",
    pill: "bg-ink/10 text-ink",
    count: "text-paper/70",
  },
};

export function CategoryBand({
  mode,
  offers,
  tone,
  layout = "cards",
  columns = 3,
  onBook,
}: CategoryBandProps) {
  const t = TONES[tone];
  const gridClass =
    layout === "cards"
      ? columns === 4
        ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        : "grid gap-5 md:grid-cols-3"
      : "grid items-center gap-8 lg:grid-cols-2";

  return (
    <section id={mode.bandId} className={`${t.band} scroll-mt-6`}>
      <div className="px-6 py-16 sm:px-10">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span
              className={`label-micro ${tone === "pine" ? "text-ochre" : "text-primary"}`}
            >
              {mode.index} — {mode.kicker}
            </span>
            <h2 className="mt-2 max-w-[48ch] font-display text-3xl font-semibold sm:text-4xl">
              {mode.heading}
            </h2>
          </div>
          <span className={`hidden shrink-0 text-sm sm:block ${t.count}`}>
            {offers.length} {mode.unit === "night" ? "stays" : "services"}
          </span>
        </header>

        {layout === "feature" ? (
          <FeatureBand mode={mode} offers={offers} onBook={onBook} />
        ) : (
          <>
            <p className="mb-8 max-w-[56ch] text-base text-muted-foreground sm:text-lg">
              {mode.subheading}
            </p>
            <div className={gridClass}>
              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  cardClass={t.card}
                  pillClass={t.pill}
                  onBook={onBook}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function FeatureBand({
  mode,
  offers,
  onBook,
}: {
  mode: ModeMeta;
  offers: Offer[];
  onBook: (offer: Offer) => void;
}) {
  const feature = offers[0];
  if (!feature) return null;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <div className="overflow-hidden rounded-panel ring-1 ring-border">
          <img
            src={feature.image}
            alt={`${mode.kicker}: ${feature.title}`}
            width={feature.imageWidth}
            height={feature.imageHeight}
            loading="lazy"
            className="aspect-4/5 w-full object-cover"
          />
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <p className="max-w-[46ch] text-base text-muted-foreground sm:text-lg">
          {mode.subheading}
        </p>

        <div className="mt-6 divide-y divide-border">
          {offers.map((offer) => (
            <button
              key={offer.id}
              type="button"
              onClick={() => onBook(offer)}
              className="group flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span>
                <span className="block font-display text-lg font-semibold">{offer.title}</span>
                <span className="block text-sm text-muted-foreground">{offer.meta}</span>
              </span>
              <span
                className="shrink-0 rounded-full bg-accent/25 px-3 py-1 text-sm font-medium text-ink transition-transform group-hover:-translate-y-0.5"
              >
                from {formatKes(offer.price)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
