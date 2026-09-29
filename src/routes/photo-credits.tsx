import { createFileRoute } from "@tanstack/react-router";

const photos = [
  ["Kenya coast", "Waigera L W", "CC BY-SA 4.0", "Aerial_views_of_Coast_Bandas.jpg"],
  ["Diani Beach", "FredD", "CC BY-SA 3.0", "Diani_beach.JPG"],
  ["Lake Naivasha", "Kenenock", "CC BY-SA 4.0", "Lake_Naivasha_Shoreline.jpg"],
  ["Mount Kenya from Nanyuki", "Martin Kithinji Mwirigi", "CC BY-SA 4.0", "View_of_Mt._Kenya_from_Nanyuki_Municipality.jpg"],
  ["Aberdare National Park", "Nina R from Africa", "CC BY 2.0", "Aberdare_National_Park,_Kenya_(30747173493).jpg"],
  ["Maasai Mara safari", "Ray in Manila", "CC BY 2.0", "Safari_in_The_Maasai_Mara_(43837384641).jpg"],
  ["Maasai Mara vehicles", "Daniel Case", "CC BY-SA 4.0", "Safari_vehicles_in_Maasai_Mara_National_Reserve,_Kenya.jpg"],
  ["Kenyan coach", "Bahnfrend", "CC BY-SA 4.0", "Dreamline_Express_Scania_F310_HB,_Salama,_2025_(01).jpg"],
  ["Kenya Airways aircraft", "Seychelles Tourism Board", "CC BY 4.0", "Kenya_Airways_aircraft.jpg"],
  ["Kenya Railways train", "Erasmus Kamugisha", "CC BY-SA 4.0", "Kenya_Railways_DF8B_locomotive_on_the_new_SGR_line,_06-06-2017.jpg"],
  ["Lamu dhow", "Wikimedia Commons contributor", "CC BY-SA 4.0", "A_dhow_in_Lamu_Island.jpg"],
];

export const Route = createFileRoute("/photo-credits")({
  head: () => ({ meta: [
    { title: "Photo credits | Routebook" },
    { name: "description", content: "Credits and licenses for authentic travel photography used by Routebook." },
    { property: "og:title", content: "Photo credits | Routebook" },
    { property: "og:description", content: "Credits and licenses for authentic travel photography used by Routebook." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <main className="mx-auto max-w-4xl px-6 py-16 sm:px-10"><h1 className="font-display text-4xl">Photo credits</h1><p className="mt-4 text-muted-foreground">Real photographs of Kenyan places and transport, sourced from Wikimedia Commons. Images have been resized for this website.</p><ul className="mt-8 divide-y divide-border">{photos.map(([subject, artist, license, file]) => <li key={file} className="flex flex-wrap items-baseline justify-between gap-2 py-4 text-sm"><span><strong>{subject}</strong> · {artist} · {license}</span><a className="text-primary underline" href={`https://commons.wikimedia.org/wiki/File:${file}`} target="_blank" rel="noopener noreferrer">View original</a></li>)}</ul></main>,
});