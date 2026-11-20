/**
 * English copy. The shape of this object is the contract for every language
 * (see `Copy` below); Indonesian lives in ./id.ts with the same keys.
 *
 * Lines the brand already uses (taglines, "Pick Up Order", "Stores & counting",
 * menu names) are the same in both languages on purpose.
 */
export const en = {
  meta: {
    home: {
      title: "Moovs Coffee, Makassar. To accompany your next move.",
      description:
        "Coffee, tea, fresh milktea and matcha for the everyday move. Twenty-one stores across Makassar, open 07:00 to 22:00.",
    },
    menu: {
      title: "Menu. Moovs Coffee, Makassar.",
      description:
        "Coffee, tea, fresh milktea, matcha, non-coffee and small bites at Moovs Coffee, with the price range for every list.",
    },
    stores: {
      title: "Stores. Moovs Coffee, Makassar.",
      description: "Twenty-one Moovs Coffee stores across Makassar, open 07:00 to 22:00.",
    },
  },

  common: {
    order: "Order Now",
    /** Short form for the navigation bar on small screens. */
    orderShort: "Order",
    findStore: "Find a Store",
    orderPickup: "Order for pick-up",
    newBadge: "New",
    to: "to",
    openUntil: (time: string) => `Open now · until ${time}`,
    closedUntil: (time: string) => `Closed · opens ${time}`,
    hoursVary: "Hours can vary by store.",
  },

  nav: {
    skip: "Skip to content",
    home: "Moovs Coffee, home",
    primary: "Primary",
    mobile: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    links: { day: "Our day", menu: "Menu", stores: "Stores", membership: "Membership", stories: "Stories" },
  },

  hero: {
    meta: ["Makassar", "07:00 to 22:00", "Store #01 to #21"],
    title: ["To accompany", "your next move."],
    lede: "Whatever gets you out the door, we’re here from 7 AM to 10 PM. Twenty-one stores across Makassar, and counting.",
    ticker: ["7 A.M. ready", "To accompany your next move", "21 stores & counting", "A place to pause", "A place to step forward"],
    videoAlt: "Ice, then coffee and milk, poured into a glass on a wooden table in warm light",
    pause: "Pause",
    play: "Play",
    pauseLabel: "Pause background video",
    playLabel: "Play background video",
  },

  manifesto: {
    label: "Why “moovs”",
    text: "Moovs means to move. Not the big leaps. The small ones. Out the door at seven. Across campus by ten. One more hour when the light goes gold. We don't make the move for you. We just keep you company.",
    caption: "In motion since morning.",
    facts: [
      { value: "21", label: "Stores, and counting" },
      { value: "07:00", label: "First cup of the day" },
      { value: "22:00", label: "Last one before close" },
      { value: "Rp13K", label: "Where the menu starts" },
    ],
  },

  day: {
    overline: "A day in moovs",
    title: "One day, a few small moves.",
    lede: "Follow the clock from the first cup to the last. Somewhere in here is the part of the day that’s yours.",
    hint: "Keep scrolling",
    moveLabel: "Move",
    closeLabel: "Close",
    goesWith: "Goes with",
    moves: [
      {
        title: "Out the door.",
        body: "The city is still stretching. Doors open at seven, so the first cup is ready when you pass.",
        note: "Large, 22 oz",
      },
      {
        title: "Between classes.",
        body: "Twenty minutes, a short walk, a long list. Something cold turns the gap into a break.",
        note: "Tea from Rp13.000",
      },
      {
        title: "A place to pause.",
        body: "The afternoon slows down. Sit a while. Nobody is counting.",
        note: "Exclusive Matcha",
      },
      {
        title: "One more move.",
        body: "Work is done, the day isn't. One for the ride home, or for whoever is still waiting.",
        note: "Fresh Milktea",
      },
    ],
    endTitle: ["Lights out.", "Back at seven."],
    endCta: "See the menu",
  },

  menu: {
    overline: "The menu",
    title: "The balance you keep coming back for.",
    lede: "Six short lists and two cup sizes, priced so it can be an everyday thing.",
    tablist: "Menu categories",
    priceRange: "Price range",
    served: "Served",
    full: "See the full menu",
    fineprint: "Prices are the range for each list. Every store’s full menu and exact prices live on ESB Order.",
    categories: {
      coffee: { note: "Palm sugar, espresso, and the ones you already know by heart.", sizes: "12 oz · 22 oz" },
      tea: { note: "Cold, bright, and easy to carry across campus.", sizes: "12 oz · 22 oz" },
      "fresh-milktea": { note: "Brewed leaves, fresh milk. On the menu since September 2026.", sizes: "Made to order" },
      matcha: { note: "Three ways to take it. Pick your depth.", sizes: "Exclusive Matcha" },
      "non-coffee": { note: "For the days that don't need caffeine to keep going.", sizes: "12 oz · 22 oz" },
      food: { note: "Small things for one hand, so the other stays free.", sizes: "Add-ons" },
    } as Record<string, { note: string; sizes: string }>,
  },

  stores: {
    overline: "Moovstores",
    label: "Stores & counting",
    countSr: (n: number) => `${n} stores and counting`,
    caption: ["Store #21", "Something’s a little different."],
    title: "Not your usual store.",
    lede: "Black ribbed ceramic, pale wood, warm light. A place to pause, and a place to step forward. The twenty-first one opened in August 2026, and the list keeps growing across Makassar.",
    facts: [
      "07:00 to 22:00. Hours can vary by store.",
      "Pick-up by QR, so it’s ready when you pass.",
      "Delivery through GoFood.",
    ],
    cta: "Find a store",
  },

  member: {
    overline: "Membership",
    title: "Come back often. It adds up.",
    lede: "If Moovs is already part of your week, let the week give something back. Points and vouchers run through ESB Order.",
    cta: "Start collecting",
    steps: [
      { title: "Order", body: "Scan the Pick Up Order QR at any store, or order ahead and skip the queue." },
      { title: "Collect", body: "Points build up on your membership as you go about your week." },
      { title: "Redeem", body: "Trade them for vouchers on the next cup. That's the whole programme." },
    ],
    sticker: {
      label: "How Pick Up Order works",
      title: "Pick Up Order",
      /** The line printed on the in-store sticker. Always Indonesian. */
      instruction: "Arahkan handphone untuk scan QR.",
      note: "Point your phone at the QR to order ahead.",
    },
  },

  stories: {
    overline: "Stories",
    title: "What moved lately.",
    link: "Follow along on Instagram",
    items: [
      {
        tag: "New store",
        date: "August 2026",
        title: "Store #21. Something's a little different.",
        body: "Our twenty-first door opened in August. Same cup, a slightly different room.",
      },
      {
        tag: "New on the menu",
        date: "September 2026",
        title: "Fresh Milktea has landed.",
        body: "Jasmine Green, Earl Grey, Peach Oolong, Red Oolong, and a Jasmine Peach Tea.",
      },
      {
        tag: "Collaboration",
        date: "Moovs × Mamu",
        title: "What our baristas wear to work.",
        body: "A uniform made with MAMU, for the people behind the bar.",
      },
      {
        tag: "Campus",
        date: "With Gojek",
        title: "A little moovs for UNHAS Day.",
        body: "A campus day with Gojek, spent with the students who keep us busy.",
      },
      {
        tag: "Opening hours",
        date: "October 2026",
        title: "7 A.M. ready.",
        body: "We moved opening time to seven, because your day starts before nine.",
      },
    ],
  },

  closing: {
    title: "Whatever gets you out the door.",
    lede: "We’re here from 7 AM to 10 PM. Order ahead, or just walk in.",
  },

  footer: {
    tagline: "To accompany your next move.",
    hours: "Hours",
    hoursValue: "07:00 to 22:00",
    explore: "Explore",
    orderFollow: "Order & follow",
    nav: "Footer",
    pickup: "Pick Up Order",
    instagram: "Instagram @moovs.coffee",
    parent: "Part of Ruang Saturasa",
    copyright: "© 2026 Moovs Coffee, Makassar.",
    credit: "Photography and video shown are licensed stand-ins from Unsplash and Pexels, pending the Moovs shoot.",
  },

  band: {
    lede: "Scan the Pick Up Order QR at any store, or order ahead and walk straight to the counter.",
  },

  menuPage: {
    overline: "The menu",
    title: "Pick your next move.",
    lede: "Coffee, tea, fresh milktea, matcha, and a few small things to eat. Two cup sizes run through the menu: Small at 12 oz and Large at 22 oz.",
    facts: { lists: "Lists", items: "On the menu", from: "Drinks from" },
    sizeGroup: "Cup size",
    small: "Small",
    large: "Large",
    bandTitle: "Order ahead. It's ready when you pass.",
    findStore: "Find a store",
  },

  storesPage: {
    overline: "Moovstores",
    title: "Twenty-one doors, and counting.",
    lede: "Across Makassar, open 07:00 to 22:00. Hours can vary by store, so check yours before you head out.",
    indexLabel: "The index",
    indexLede: "Every number is a store. #21 is the newest, open since August 2026.",
    newest: "Newest",
    listLabel: "Store list",
    bandTitle: "Know your store? Order ahead.",
    seeMenu: "See the menu",
    locator: {
      interimTitle: "The full list is on its way.",
      interimBody:
        "We’re confirming every address, hour and service before we publish them here. Until then, store locations are in the Outlet highlight on our Instagram.",
      interimCta: "Store locations on Instagram",
      area: "Area",
      allAreas: "All areas",
      servicesLabel: "Services",
      services: { "dine-in": "Dine-in", pickup: "Pick-up by QR", delivery: "Delivery" } as Record<string, string>,
      openNow: "Open now",
      showing: (shown: number, total: number) => `Showing ${shown} of ${total} ${total === 1 ? "store" : "stores"}`,
      noMatch: "No store matches those filters right now.",
      clear: "Clear filters",
      storeNumber: "Store number",
      order: "Order",
      directions: "Directions",
    },
  },

  loader: { place: "Moovs Coffee, Makassar" },
};

export type Copy = typeof en;
