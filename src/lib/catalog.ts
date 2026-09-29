import busSleeper from "../assets/bus-standard-photo.jpg.asset.json";
import busStandard from "../assets/bus-standard-photo.jpg.asset.json";
import busShuttle from "../assets/car-rental-photo.jpg.asset.json";
import airBusiness from "../assets/air-economy-photo.jpg.asset.json";
import airEconomy from "../assets/air-economy-photo.jpg.asset.json";
import airBush from "../assets/air-economy-photo.jpg.asset.json";
import railSleeper from "../assets/rail-express-photo.jpg.asset.json";
import railExpress from "../assets/rail-express-photo.jpg.asset.json";
import railScenic from "../assets/rail-express-photo.jpg.asset.json";
import waterDhow from "../assets/hero-coast-photo.jpg.asset.json";
import hotelLakeside from "../assets/hotel-lakeside-photo.jpg.asset.json";
import hotelOceanfront from "../assets/hotel-oceanfront-photo.jpg.asset.json";
import hotelMountain from "../assets/hotel-mountain-photo.jpg.asset.json";
import hotelRainforest from "../assets/hotel-rainforest-photo.jpg.asset.json";

export type ModeId = "bus" | "air" | "rail" | "water" | "hotel";

export interface ModeMeta {
  id: ModeId;
  label: string;
  bandId: string;
  index: string;
  kicker: string;
  heading: string;
  subheading: string;
  /** Where the traveller starts. Empty string means a single-destination search. */
  fromLabel: string;
  toLabel: string;
  /** Seats for a journey, nights for a stay. */
  unit: "seat" | "night";
}

export interface Offer {
  id: string;
  mode: ModeId;
  category: string;
  title: string;
  blurb: string;
  meta: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** Price in KES: per seat for journeys, per night for stays. */
  price: number;
}

export const MODES: ModeMeta[] = [
  {
    id: "bus",
    label: "Bus",
    bandId: "road",
    index: "01",
    kicker: "Road",
    heading: "Coaches, shuttles and the long way round",
    subheading:
      "Night sleepers that arrive rested, daytime expresses that run on the hour, and small shuttles that find the door.",
    fromLabel: "From",
    toLabel: "To",
    unit: "seat",
  },
  {
    id: "air",
    label: "Flight",
    bandId: "sky",
    index: "03",
    kicker: "Sky",
    heading: "Cabin classes for every kind of hour",
    subheading:
      "Lie-flat suites for the long haul, honest economy fares, and little prop planes for the strips that have no terminal.",
    fromLabel: "From",
    toLabel: "To",
    unit: "seat",
  },
  {
    id: "rail",
    label: "Rail",
    bandId: "rail",
    index: "02",
    kicker: "Rail",
    heading: "Rail, the slow and scenic way",
    subheading:
      "Private berths, reserved seats and panoramic cars — three services that treat the window as the main event.",
    fromLabel: "From",
    toLabel: "To",
    unit: "seat",
  },
  {
    id: "water",
    label: "Ferry",
    bandId: "water",
    index: "04",
    kicker: "Water",
    heading: "Out on the water",
    subheading:
      "Dhow crossings, floating berths and evening sails — the routes that only exist because the land runs out.",
    fromLabel: "From",
    toLabel: "To",
    unit: "seat",
  },
  {
    id: "hotel",
    label: "Hotel",
    bandId: "stays",
    index: "05",
    kicker: "Stays",
    heading: "Hotels by the scenery you want",
    subheading:
      "Lakeside, oceanfront, mountain-view and rainforest. Picked for the view out the window, not the lobby.",
    fromLabel: "",
    toLabel: "Destination",
    unit: "night",
  },
];

export const MODES_BY_ID = Object.fromEntries(
  MODES.map((entry) => [entry.id, entry]),
) as Record<ModeId, ModeMeta>;

export const OFFERS: Offer[] = [
  // 01 — Road
  {
    id: "sleeper-coach",
    mode: "bus",
    category: "Sleeper coach",
    title: "Nairobi — Arusha Night",
    blurb: "Full-flat berths, a curtain you can close and breakfast at the border.",
    meta: "20:30 → 06:15 · 9h 45m",
    image: busSleeper.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 4500,
  },
  {
    id: "standard-coach",
    mode: "bus",
    category: "Standard coach",
    title: "Highlands Express",
    blurb: "Daytime seating across the ridges, two stops and a very good chai.",
    meta: "07:00 → 14:30 · 7h 30m",
    image: busStandard.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 1800,
  },
  {
    id: "minibus-shuttle",
    mode: "bus",
    category: "Minibus shuttle",
    title: "Door-to-Door Shuttle",
    blurb: "Eight seats, one driver who knows the shortcuts, luggage included.",
    meta: "Flexible times · up to 8 travellers",
    image: busShuttle.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 950,
  },

  // 02 — Rail
  {
    id: "rail-night",
    mode: "rail",
    category: "Overnight sleeper",
    title: "Nairobi — Mombasa Night",
    blurb: "Private berths, dawn coffee before the coast arrives.",
    meta: "19:10 → 08:45 · 13h 35m",
    image: railSleeper.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 4800,
  },
  {
    id: "rail-express",
    mode: "rail",
    category: "Express",
    title: "Savannah Express",
    blurb: "A three-hour hop across the plains, reserved seating.",
    meta: "08:00 → 14:15 · 6h 15m",
    image: railExpress.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 1950,
  },
  {
    id: "rail-scenic",
    mode: "rail",
    category: "Scenic",
    title: "Highland Scenic",
    blurb: "Slow climb through the escarpment, panoramic car.",
    meta: "09:40 → 15:20 · 5h 40m",
    image: railScenic.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 2600,
  },

  // 03 — Sky
  {
    id: "air-business",
    mode: "air",
    category: "Business cabin",
    title: "Nairobi — Zanzibar",
    blurb: "Lie-flat suite, lounge access, a short hop to the islands.",
    meta: "06:45 → 08:30 · 1h 45m",
    image: airBusiness.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 86500,
  },
  {
    id: "air-economy",
    mode: "air",
    category: "Economy",
    title: "Nairobi — Mombasa",
    blurb: "Smart fares on the main regional routes, twice an hour.",
    meta: "11:20 → 12:25 · 1h 05m",
    image: airEconomy.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 12400,
  },
  {
    id: "air-bush",
    mode: "air",
    category: "Bush & island hop",
    title: "Wilson — Maasai Mara Airstrip",
    blurb: "Small prop, big windows, and the last stretch is all plains.",
    meta: "10:05 → 11:10 · 1h 05m",
    image: airBush.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 24900,
  },

  // 04 — Water
  {
    id: "water-dhow",
    mode: "water",
    category: "Island hop",
    title: "Coastal Dhow Crossing",
    blurb: "Mombasa — Lamu, sail and engine, three islands en route.",
    meta: "08:30 → 16:00 · daily",
    image: waterDhow.url,
    imageWidth: 1008,
    imageHeight: 1264,
    price: 3200,
  },
  {
    id: "water-houseboat",
    mode: "water",
    category: "Houseboat",
    title: "Lake Victoria Houseboat",
    blurb: "Two nights on a floating berth, fishing at first light.",
    meta: "Kisumu · 2 nights, full board",
    image: waterDhow.url,
    imageWidth: 1008,
    imageHeight: 1264,
    price: 9400,
  },
  {
    id: "water-cruise",
    mode: "water",
    category: "Cruise",
    title: "Sunset Bay Cruise",
    blurb: "Evening sail on the open deck, back before dark.",
    meta: "17:30 → 19:30 · Tue to Sun",
    image: waterDhow.url,
    imageWidth: 1008,
    imageHeight: 1264,
    price: 2100,
  },

  // 05 — Stays
  {
    id: "stay-lakeside",
    mode: "hotel",
    category: "Lakeside",
    title: "Laguna Rest",
    blurb: "Nine rooms above still water, sunrise from the deck.",
    meta: "Lake Naivasha · 9 rooms",
    image: hotelLakeside.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 12500,
  },
  {
    id: "stay-oceanfront",
    mode: "hotel",
    category: "Oceanfront",
    title: "Coralline Bay",
    blurb: "Terrace toes-in-the-sand rooms, reef ten metres out.",
    meta: "Diani · 14 rooms",
    image: hotelOceanfront.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 18900,
  },
  {
    id: "stay-mountain",
    mode: "hotel",
    category: "Mountain-view",
    title: "Kilimanjaro Ridge",
    blurb: "Stone lodge on the escarpment, blankets on the terrace.",
    meta: "Nanyuki · 11 rooms",
    image: hotelMountain.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 15200,
  },
  {
    id: "stay-rainforest",
    mode: "hotel",
    category: "Rainforest",
    title: "Misty Canopy House",
    blurb: "Balconies in the canopy, colobus at the rail by seven.",
    meta: "Aberdare · 7 rooms",
    image: hotelRainforest.url,
    imageWidth: 912,
    imageHeight: 1200,
    price: 11700,
  },
];

export interface Booking {
  ref: string;
  offerId: string;
  title: string;
  category: string;
  mode: ModeId;
  seats: number;
  nights: number;
  total: number;
  when: string;
}

export interface SearchValues {
  from: string;
  to: string;
  depart: string;
  checkIn: string;
  checkOut: string;
  travellers: number;
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 1;
  return Math.max(1, Math.round((b - a) / 86_400_000));
}

export function buildSummary(
  mode: ModeMeta,
  values: SearchValues,
): { bandId: string; text: string } {
  const count = offersFor(mode.id).length;
  const low = cheapestFor(mode.id);
  const from = values.from.trim();
  const to = values.to.trim();

  if (mode.unit === "night") {
    const where = to ? ` near ${to}` : "";
    return {
      bandId: mode.bandId,
      text: `${count} stays${where} — from ${low ? formatKes(low.price) : "—"} per night`,
    };
  }

  const route = from && to ? ` · ${from} → ${to}` : "";
  const when = values.depart ? ` · ${values.depart}` : "";
  return {
    bandId: mode.bandId,
    text: `${count} ${mode.kicker.toLowerCase()} departures${route}${when} — from ${low ? formatKes(low.price) : "—"}`,
  };
}


export function offersFor(mode: ModeId): Offer[] {
  return OFFERS.filter((offer) => offer.mode === mode);
}

export function cheapestFor(mode: ModeId): Offer | undefined {
  return offersFor(mode).reduce<Offer | undefined>(
    (lowest, offer) => (!lowest || offer.price < lowest.price ? offer : lowest),
    undefined,
  );
}

export function formatKes(amount: number): string {
  return `KES ${new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}
