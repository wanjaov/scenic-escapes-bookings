import { useEffect, useRef, useState } from "react";
import { formatKes, type Booking, type Offer } from "../lib/catalog";

interface BookingSheetProps {
  offer: Offer;
  travellers: number;
  nights: number;
  onClose: () => void;
  onConfirm: (booking: Booking) => void;
}

function makeRef(): string {
  const chars = "ACDEFGHJKLMNPQRTUVWXY3479";
  let out = "";
  for (let i = 0; i < 5; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `RB-${out}`;
}

function Stepper({
  label,
  value,
  onChange,
  min = 1,
  max = 12,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid size-7 place-items-center rounded-full ring-1 ring-border text-lg leading-none transition-colors hover:bg-secondary disabled:opacity-40"
        >
          &minus;
        </button>
        <span className="min-w-6 text-center font-display text-lg font-semibold">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid size-7 place-items-center rounded-full ring-1 ring-border text-lg leading-none transition-colors hover:bg-secondary disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function BookingSheet({
  offer,
  travellers,
  nights,
  onClose,
  onConfirm,
}: BookingSheetProps) {
  const isStay = offer.mode === "hotel";
  const [seats, setSeats] = useState(Math.max(1, travellers));
  const [rooms, setRooms] = useState(1);
  const [stayNights, setStayNights] = useState(Math.max(1, nights));
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const total = isStay ? offer.price * stayNights * rooms : offer.price * seats;

  const confirm = () => {
    const booking: Booking = {
      ref: makeRef(),
      offerId: offer.id,
      title: offer.title,
      category: offer.category,
      mode: offer.mode,
      seats: isStay ? rooms : seats,
      nights: isStay ? stayNights : 0,
      total,
      when: new Date().toISOString(),
    };
    setConfirmed(booking);
    onConfirm(booking);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${offer.title}`}
    >
      <div
        className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-lg animate-pop-in overflow-hidden rounded-panel bg-popover shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] outline-none ring-1 ring-border"
      >
        <div className="flex items-start gap-4 p-5">
          <img
            src={offer.image}
            alt=""
            width={offer.imageWidth}
            height={offer.imageHeight}
            className="size-20 shrink-0 rounded-field object-cover"
          />
          <div className="grow">
            <span className="label-micro text-primary">{offer.category}</span>
            <h3 className="mt-1 font-display text-xl font-semibold">{offer.title}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{offer.meta}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="grid size-8 shrink-0 place-items-center rounded-full ring-1 ring-border text-lg leading-none transition-colors hover:bg-secondary"
          >
            ×
          </button>
        </div>

        {confirmed ? (
          <div className="border-t border-border px-5 py-6 text-center">
            <span className="label-micro text-ochre">Booking confirmed</span>
            <p className="mt-3 font-display text-3xl font-semibold">{confirmed.ref}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {confirmed.seats} {isStay ? "room" : "seat"}
              {confirmed.seats === 1 ? "" : "s"}
              {isStay && ` · ${confirmed.nights} night${confirmed.nights === 1 ? "" : "s"}`} ·{" "}
              {formatKes(confirmed.total)}
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Demo booking — nothing was charged and no seat was held.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-field bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y divide-border border-t border-border px-5">
              {isStay ? (
                <>
                  <Stepper label="Rooms" value={rooms} onChange={setRooms} />
                  <Stepper label="Nights" value={stayNights} onChange={setStayNights} max={21} />
                </>
              ) : (
                <Stepper label="Seats" value={seats} onChange={setSeats} max={9} />
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border bg-secondary/60 px-5 py-4">
              <span className="text-sm text-muted-foreground">
                {formatKes(offer.price)} {isStay ? "per night" : "per seat"}
              </span>
              <span className="font-display text-2xl font-semibold">{formatKes(total)}</span>
            </div>

            <div className="p-5">
              <button
                type="button"
                onClick={confirm}
                className="w-full rounded-field bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground"
              >
                Confirm booking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
