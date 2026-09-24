import { formatKes, type Offer } from "../lib/catalog";

interface OfferCardProps {
  offer: Offer;
  cardClass: string;
  pillClass: string;
  onBook: (offer: Offer) => void;
}

export function OfferCard({ offer, cardClass, pillClass, onBook }: OfferCardProps) {
  const isStay = offer.mode === "hotel";

  return (
    <article className={`group flex flex-col overflow-hidden rounded-card ring-1 ring-border ${cardClass}`}>
      <div className="overflow-hidden">
        <img
          src={offer.image}
          alt={`${offer.category}: ${offer.title}`}
          width={offer.imageWidth}
          height={offer.imageHeight}
          loading="lazy"
          className="aspect-3/4 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex grow flex-col gap-3 p-5">
        <span
          className={`self-start rounded-full px-3 py-1 text-xs font-medium ${pillClass}`}
        >
          {offer.category}
        </span>
        <h3 className="font-display text-xl font-semibold">{offer.title}</h3>
        <p className="grow text-sm text-muted-foreground">{offer.blurb}</p>
        <p className="text-xs text-muted-foreground">{offer.meta}</p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-muted-foreground">
            from{" "}
            <span className="font-display text-lg font-semibold text-foreground">
              {formatKes(offer.price)}
            </span>
            {isStay && <span className="text-xs">/night</span>}
          </span>
          <button
            type="button"
            onClick={() => onBook(offer)}
            className="rounded-full bg-primary py-2 pr-3 pl-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}
