import { media, type Media } from "./media";

/**
 * Brand facts come from riset-brand-moovs-coffee.md (18 Nov 2026).
 * Anything the research marks as unconfirmed (per-item prices, outlet
 * addresses, the Tastea origin, membership rules) is deliberately left out.
 */
export const site = {
  name: "Moovs Coffee",
  city: "Makassar",
  timeZone: "Asia/Makassar",
  opens: 7,
  closes: 22,
  storeCount: 21,
  links: {
    // The ESB Order deep link is not public yet, so ordering routes through
    // the Instagram profile, where the live order link sits in the bio.
    order: "https://www.instagram.com/moovs.coffee/",
    instagram: "https://www.instagram.com/moovs.coffee/",
    parent: "https://www.instagram.com/ruang.saturasa/",
  },
} as const;

export const navLinks = [
  { href: "/#day", label: "Our day" },
  { href: "/menu", label: "Menu" },
  { href: "/stores", label: "Stores" },
  { href: "/#membership", label: "Membership" },
  { href: "/#stories", label: "Stories" },
] as const;

export type Move = {
  time: string;
  title: string;
  body: string;
  pairing: string;
  pairingNote: string;
  photo: Media;
  phase: "morning" | "midday" | "afternoon" | "night";
};

export const moves: Move[] = [
  {
    time: "07:00",
    title: "Out the door.",
    body: "The city is still stretching. Doors open at seven, so the first cup is ready when you pass.",
    pairing: "Es Kopi Aren",
    pairingNote: "Large, 22 oz",
    photo: media.outTheDoor,
    phase: "morning",
  },
  {
    time: "10:00",
    title: "Between classes.",
    body: "Twenty minutes, a short walk, a long list. Something cold turns the gap into a break.",
    pairing: "Thai Tea",
    pairingNote: "Tea from Rp13.000",
    photo: media.betweenClasses,
    phase: "midday",
  },
  {
    time: "15:00",
    title: "A place to pause.",
    body: "The afternoon slows down. Sit a while. Nobody is counting.",
    pairing: "So Matcha",
    pairingNote: "Exclusive Matcha",
    photo: media.pause,
    phase: "afternoon",
  },
  {
    time: "19:00",
    title: "One more move.",
    body: "Work is done, the day isn't. One for the ride home, or for whoever is still waiting.",
    pairing: "Jasmine Peach Tea",
    pairingNote: "Fresh Milktea",
    photo: media.oneMoreMove,
    phase: "night",
  },
];

/**
 * A menu item. `small` (12 oz) and `large` (22 oz) are prices in rupiah.
 * They are empty for now: the research only has a price range per list.
 * Fill them in from the client's menu and the menu page shows per-item
 * prices and its Small / Large switch on its own.
 */
export type MenuItem = {
  name: string;
  small?: number;
  large?: number;
  isNew?: boolean;
};

const items = (...names: string[]): MenuItem[] => names.map((name) => ({ name }));

export type MenuCategory = {
  id: string;
  label: string;
  note: string;
  priceFrom: number;
  priceTo: number;
  sizes: string;
  isNew?: boolean;
  items: MenuItem[];
  photo: Media;
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    label: "Coffee",
    note: "Palm sugar, espresso, and the ones you already know by heart.",
    priceFrom: 17000,
    priceTo: 30000,
    sizes: "12 oz · 22 oz",
    items: items("Es Kopi Aren", "Es Kopi Diadu", "Es Kopi Banaroma", "Spanish Latte", "Almond Latte", "Ice Black (Apple)", "Mont Blanc", "Raspberry Cream Latte"),
    photo: media.coffee,
  },
  {
    id: "tea",
    label: "Tea",
    note: "Cold, bright, and easy to carry across campus.",
    priceFrom: 13000,
    priceTo: 18000,
    sizes: "12 oz · 22 oz",
    items: items("Thai Tea", "Green Tea", "Lemon Tea", "Lychee Tea", "Teh Marimangga", "Milk Tea", "Ovaltine"),
    photo: media.tea,
  },
  {
    id: "fresh-milktea",
    label: "Fresh Milktea",
    note: "Brewed leaves, fresh milk. On the menu since September 2026.",
    priceFrom: 20000,
    priceTo: 25000,
    sizes: "Made to order",
    isNew: true,
    items: items("Jasmine Green Milk Tea", "Earl Grey Milk Tea", "Peach Oolong Milk Tea", "Red Oolong Milk Tea", "Jasmine Peach Tea"),
    photo: media.milktea,
  },
  {
    id: "matcha",
    label: "Matcha",
    note: "Three ways to take it. Pick your depth.",
    priceFrom: 18000,
    priceTo: 28000,
    sizes: "Exclusive Matcha",
    items: items("So Matcha", "Co Matcha", "Too Matcha"),
    photo: media.matcha,
  },
  {
    id: "non-coffee",
    label: "Non-coffee",
    note: "For the days that don't need caffeine to keep going.",
    priceFrom: 15000,
    priceTo: 25000,
    sizes: "12 oz · 22 oz",
    items: items("Chocolate", "Cookies & Cream", "Dark Matter", "Strawberry"),
    photo: media.nonCoffee,
  },
  {
    id: "food",
    label: "Food",
    note: "Small things for one hand, so the other stays free.",
    priceFrom: 5000,
    priceTo: 12000,
    sizes: "Add-ons",
    items: items("Donat Gula", "Donat Cokelat", "Donat Kacang", "Salty Bite salt bread", "Extra shot"),
    photo: media.food,
  },
];

export const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

export const menuHasItemPrices = menu.some((category) =>
  category.items.some((item) => item.small !== undefined || item.large !== undefined),
);

/* ---------- Stores ---------- */

export const services = {
  "dine-in": "Dine-in",
  pickup: "Pick-up by QR",
  delivery: "Delivery",
} as const;

export type Service = keyof typeof services;

export type Store = {
  /** The store's number, as in "Store #21". */
  number: number;
  name: string;
  /** District or neighbourhood, used by the area filter. */
  area: string;
  address: string;
  /** Opening hours on Makassar time, "HH:MM". Some stores differ from 07:00 to 22:00. */
  opens: string;
  closes: string;
  services: Service[];
  /** ESB Order link for this store. */
  orderUrl?: string;
  /** Google Maps link for directions. */
  mapsUrl?: string;
  note?: string;
};

/**
 * The store list. It is empty on purpose: the 21 addresses, hours and
 * services have not been confirmed by the client yet (see question 4 in the
 * research document), and the site does not invent them. Add entries here
 * and the locator, filters and store index fill in on their own.
 */
export const stores: Store[] = [];

export type Story = {
  tag: string;
  date: string;
  title: string;
  body: string;
  photo: Media;
};

export const stories: Story[] = [
  {
    tag: "New store",
    date: "August 2026",
    title: "Store #21. Something's a little different.",
    body: "Our twenty-first door opened in August. Same cup, a slightly different room.",
    photo: media.storeRoom,
  },
  {
    tag: "New on the menu",
    date: "September 2026",
    title: "Fresh Milktea has landed.",
    body: "Jasmine Green, Earl Grey, Peach Oolong, Red Oolong, and a Jasmine Peach Tea.",
    photo: media.milkteaStory,
  },
  {
    tag: "Collaboration",
    date: "Moovs × Mamu",
    title: "What our baristas wear to work.",
    body: "A uniform made with MAMU, for the people behind the bar.",
    photo: media.barista,
  },
  {
    tag: "Campus",
    date: "With Gojek",
    title: "A little moovs for UNHAS Day.",
    body: "A campus day with Gojek, spent with the students who keep us busy.",
    photo: media.campus,
  },
  {
    tag: "Opening hours",
    date: "October 2026",
    title: "7 A.M. ready.",
    body: "We moved opening time to seven, because your day starts before nine.",
    photo: media.sevenAm,
  },
];

export const membershipSteps = [
  {
    n: "01",
    title: "Order",
    body: "Scan the Pick Up Order QR at any store, or order ahead and skip the queue.",
  },
  {
    n: "02",
    title: "Collect",
    body: "Points build up on your membership as you go about your week.",
  },
  {
    n: "03",
    title: "Redeem",
    body: "Trade them for vouchers on the next cup. That's the whole programme.",
  },
] as const;
