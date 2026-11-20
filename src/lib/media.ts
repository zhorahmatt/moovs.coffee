/**
 * Photography provenance.
 *
 * Every photo on the site is a licensed stand-in served from Unsplash's CDN
 * under the Unsplash License (free for commercial use, no permission needed).
 * The hero video is a Pexels clip, self-hosted, under the Pexels License.
 * They hold the place of Moovs' own photography and should be swapped for
 * the brand's real shoot before launch. None of them depict Moovs stores,
 * staff, products, or customers, and the site never claims they do.
 */
export type Media = {
  /** Unsplash CDN photo id (the part after `photo-`). */
  id: string;
  /** English description. */
  alt: string;
  /** Indonesian description. */
  altId: string;
  /** Photographer credit and source page. */
  author: string;
  source: string;
  /** Dominant tone, used as the box colour while loading or if the file is missing. */
  tone: string;
  /** CSS object-position for crops. */
  focus?: string;
};

const by = (handle: string) => `https://unsplash.com/@${handle}`;

export const media = {
  outTheDoor: {
    id: "1708961352581-bdd1f02da6ed",
    alt: "A hand holding a glass of iced coffee against a warm sunlit wall",
    altId: "Tangan memegang segelas es kopi di depan dinding yang hangat terkena sinar matahari",
    author: "Mona Jain",
    source: by("monajain"),
    tone: "#8a6f5c",
  },
  betweenClasses: {
    id: "1793708411718-78042fa03e51",
    alt: "People walking across a sunlit paved street, casting long shadows",
    altId: "Orang-orang berjalan di jalan berpaving yang disinari matahari, dengan bayangan panjang",
    author: "mediha32",
    source: by("mediha32"),
    tone: "#4a3a30",
  },
  pause: {
    id: "1771596378772-858323ca698f",
    alt: "Afternoon light falling across a quiet wooden table and chairs",
    altId: "Cahaya sore jatuh di meja dan kursi kayu yang tenang",
    author: "wholesee",
    source: by("wholesee"),
    tone: "#8b7a55",
  },
  oneMoreMove: {
    id: "1579553420886-238913ffce3f",
    alt: "A bicycle parked outside a warmly lit cafe window at night",
    altId: "Sepeda terparkir di depan jendela kafe yang terang hangat di malam hari",
    author: "Fred Nassar",
    source: by("frednassar"),
    tone: "#1a1611",
  },
  steam: {
    id: "1553155889-242ed4fbbed9",
    alt: "An espresso machine in warm light, blurred by movement and steam",
    altId: "Mesin espresso dalam cahaya hangat, kabur oleh gerakan dan uap",
    author: "Charles Postiaux",
    source: by("charlespostiaux"),
    tone: "#2a160c",
  },
  store: {
    id: "1735787657870-2395d589e733",
    alt: "A barista at work behind a dark counter under a single warm light",
    altId: "Barista sedang bekerja di balik counter gelap dengan satu lampu hangat",
    author: "sbai",
    source: by("sbai"),
    tone: "#15110f",
    focus: "70% 50%",
  },
  storeRoom: {
    id: "1771830916721-7e374b8423f0",
    alt: "A dim, calm cafe room with wooden tables near an open doorway",
    altId: "Ruang kafe yang redup dan tenang dengan meja kayu di dekat pintu terbuka",
    author: "hieuanhcauam",
    source: by("hieuanhcauam"),
    tone: "#2b241b",
  },
  cupInHand: {
    id: "1705912728424-bc9b35f37e72",
    alt: "A hand holding a paper cup in soft window light",
    altId: "Tangan memegang cup kertas dalam cahaya lembut dari jendela",
    author: "madeline_sd",
    source: by("madeline_sd"),
    tone: "#6b5a4c",
  },
  coffee: {
    id: "1578314675249-a6910f80cc4e",
    alt: "Iced coffee with a straw in a takeaway cup on a dark counter",
    altId: "Es kopi dengan sedotan dalam cup takeaway di atas counter gelap",
    author: "Rachel McDermott",
    source: by("mrsrachelmcdermott"),
    tone: "#3b2c21",
  },
  tea: {
    id: "1644031995386-fe9665dc5b57",
    alt: "A tall glass of iced Thai tea on a wooden table",
    altId: "Segelas tinggi es Thai tea di atas meja kayu",
    author: "Markus Winkler",
    source: by("markuswinkler"),
    tone: "#c9a27c",
  },
  milktea: {
    id: "1729656606803-624227313880",
    alt: "Iced milk tea in a ribbed glass beside a book",
    altId: "Es milk tea dalam gelas bergaris di samping sebuah buku",
    author: "meanduck",
    source: by("meanduck"),
    tone: "#a58a6c",
  },
  matcha: {
    id: "1749280447307-31a68eb38673",
    alt: "A layered iced matcha latte on a small round table",
    altId: "Es matcha latte berlapis di atas meja bundar kecil",
    author: "Gaia Coffee",
    source: by("gaiacoffee"),
    tone: "#4b4038",
  },
  nonCoffee: {
    id: "1559329187-79d04171a646",
    alt: "Iced chocolate drinks with straws on a dark wooden table",
    altId: "Minuman cokelat dingin dengan sedotan di atas meja kayu gelap",
    author: "_k8_",
    source: by("_k8_"),
    tone: "#3a2516",
  },
  food: {
    id: "1573050329989-9c2509328687",
    alt: "A row of sugar-dusted donuts on paper",
    altId: "Deretan donat bertabur gula di atas kertas",
    author: "savchuks",
    source: by("savchuks"),
    tone: "#cfc7bd",
  },
  barista: {
    id: "1758720884478-6f25775af4ee",
    alt: "A barista preparing drinks, blurred by motion",
    altId: "Barista menyiapkan minuman, kabur karena gerakan",
    author: "_3bread",
    source: by("_3bread"),
    tone: "#6a5a3c",
  },
  milkteaStory: {
    id: "1695550009001-122e60c16859",
    alt: "An iced drink in a takeaway cup on an outdoor wooden table",
    altId: "Minuman dingin dalam cup takeaway di atas meja kayu di luar ruangan",
    author: "Annie Ha Tuan Anh",
    source: by("anniehatuanh"),
    tone: "#55603c",
  },
  campus: {
    id: "1789886797928-80f4abdf2744",
    alt: "People walking along a tree-lined campus path",
    altId: "Orang-orang berjalan di jalan kampus yang dinaungi pepohonan",
    author: "avansear",
    source: by("avansear"),
    tone: "#3d4a2c",
  },
  sevenAm: {
    id: "1764567820609-a34d77f8f739",
    alt: "Low morning sun streaming down a city street as traffic starts to move",
    altId: "Matahari pagi yang rendah menyinari jalan kota saat lalu lintas mulai bergerak",
    author: "xinyu0421",
    source: by("xinyu0421"),
    tone: "#5a4a34",
  },
  closing: {
    id: "1681219303573-3b975917ca21",
    alt: "A coffee shop glowing at night, seen from across the street",
    altId: "Coffee shop yang menyala di malam hari, dilihat dari seberang jalan",
    author: "Ayumi Kubo",
    source: by("ayumikubo"),
    tone: "#14110d",
  },
} satisfies Record<string, Media>;

const CDN = "https://images.unsplash.com/photo-";

/** Build a CDN URL. `ratio` crops server-side (e.g. "4:5"). */
export function photoUrl(m: Media, width: number, ratio?: string, quality = 70) {
  const crop = ratio ? `&ar=${ratio}&fit=crop&crop=entropy` : "&fit=max";
  return `${CDN}${m.id}?auto=format${crop}&w=${width}&q=${quality}`;
}

export const WIDTHS = [480, 768, 1080, 1440, 1920] as const;

export function photoSrcSet(m: Media, ratio?: string, max = 1920) {
  return WIDTHS.filter((w) => w <= max)
    .map((w) => `${photoUrl(m, w, ratio)} ${w}w`)
    .join(", ");
}

/**
 * Hero video: a stand-in until Moovs shoots its own (an Es Kopi Aren being
 * poured at the counter would replace it one for one). Self-hosted under
 * /public/media; the poster is the clip's last frame.
 */
export const heroVideo = {
  src: "/media/hero-pour.mp4",
  poster: "/media/hero-pour-poster.jpg",
  width: 1280,
  height: 720,
  author: "Olha Ruskykh",
  source: "https://www.pexels.com/video/person-pouring-ice-and-coffee-in-a-glass-6166871/",
  license: "Pexels License",
} as const;
