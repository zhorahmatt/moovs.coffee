import { media, type Media } from "./media";

/**
 * Facts and structure. All wording lives in lib/copy (English and Indonesian).
 *
 * Brand facts come from the brand research (18 Nov 2026). Anything it marks
 * as unconfirmed (per-item prices, outlet addresses, the Tastea origin,
 * membership rules) is deliberately left out.
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

/** Navigation targets. Labels come from copy.nav.links; paths are prefixed per language by href(). */
export const navLinks = [
  { key: "day", path: "/#day" },
  { key: "menu", path: "/menu" },
  { key: "stores", path: "/stores" },
  { key: "membership", path: "/#membership" },
  { key: "stories", path: "/#stories" },
] as const;

/** The four moments of "A day in moovs". Titles and stories are in copy.day.moves, in the same order. */
export const moves: Array<{
  time: string;
  /** Menu name, the same in every language. */
  pairing: string;
  photo: Media;
  phase: "morning" | "midday" | "afternoon" | "night";
}> = [
  { time: "07:00", pairing: "Es Kopi Aren", photo: media.outTheDoor, phase: "morning" },
  { time: "10:00", pairing: "Thai Tea", photo: media.betweenClasses, phase: "midday" },
  { time: "15:00", pairing: "So Matcha", photo: media.pause, phase: "afternoon" },
  { time: "19:00", pairing: "Jasmine Peach Tea", photo: media.oneMoreMove, phase: "night" },
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
  /** Also the key for this list's wording in copy.menu.categories. */
  id: string;
  /** Category and item names are the menu's own names, the same in every language. */
  label: string;
  priceFrom: number;
  priceTo: number;
  isNew?: boolean;
  items: MenuItem[];
  photo: Media;
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    label: "Coffee",
    priceFrom: 17000,
    priceTo: 30000,
    items: items("Es Kopi Aren", "Es Kopi Diadu", "Es Kopi Banaroma", "Spanish Latte", "Almond Latte", "Ice Black (Apple)", "Mont Blanc", "Raspberry Cream Latte"),
    photo: media.coffee,
  },
  {
    id: "tea",
    label: "Tea",
    priceFrom: 13000,
    priceTo: 18000,
    items: items("Thai Tea", "Green Tea", "Lemon Tea", "Lychee Tea", "Teh Marimangga", "Milk Tea", "Ovaltine"),
    photo: media.tea,
  },
  {
    id: "fresh-milktea",
    label: "Fresh Milktea",
    priceFrom: 20000,
    priceTo: 25000,
    isNew: true,
    items: items("Jasmine Green Milk Tea", "Earl Grey Milk Tea", "Peach Oolong Milk Tea", "Red Oolong Milk Tea", "Jasmine Peach Tea"),
    photo: media.milktea,
  },
  {
    id: "matcha",
    label: "Matcha",
    priceFrom: 18000,
    priceTo: 28000,
    items: items("So Matcha", "Co Matcha", "Too Matcha"),
    photo: media.matcha,
  },
  {
    id: "non-coffee",
    label: "Non-coffee",
    priceFrom: 15000,
    priceTo: 25000,
    items: items("Chocolate", "Cookies & Cream", "Dark Matter", "Strawberry"),
    photo: media.nonCoffee,
  },
  {
    id: "food",
    label: "Food",
    priceFrom: 5000,
    priceTo: 12000,
    items: items("Donat Gula", "Donat Cokelat", "Donat Kacang", "Salty Bite salt bread", "Extra shot"),
    photo: media.food,
  },
];

export const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;

export const menuHasItemPrices = menu.some((category) =>
  category.items.some((item) => item.small !== undefined || item.large !== undefined),
);

/* ---------- Stores ---------- */

/** Service keys. Their names per language are in copy.storesPage.locator.services. */
export const serviceKeys = ["dine-in", "pickup", "delivery"] as const;
export type Service = (typeof serviceKeys)[number];

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
  /** Marks the newest store. */
  isNewest?: boolean;
};

/**
 * The store list. It is empty on purpose: the 21 addresses, hours and
 * services have not been confirmed by the client yet, and the site does not
 * invent them. Add entries here and the locator, filters and store index
 * fill in on their own.
 */
export const stores: Store[] = [];

/** Photos for the stories, in the same order as copy.stories.items. */
export const storyPhotos: Media[] = [media.storeRoom, media.milkteaStory, media.barista, media.campus, media.sevenAm];
