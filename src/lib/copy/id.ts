import type { Copy } from "./en";

/**
 * Bahasa Indonesia.
 *
 * Voice: the same calm, confident Moovs, talking to "kamu". Short statements,
 * everyday words ("buat", "bareng", "nambah" where they sit naturally), no
 * exclamation marks, no emoji.
 *
 * Left in English on purpose, because the brand already says them this way:
 *   - taglines: "To accompany your next move.", "The balance you keep coming
 *     back for.", "Not your usual store.", "Whatever gets you out the door.",
 *     "A place to pause.", "7 A.M. ready", "Stores & counting",
 *     "Something's a little different.", "A little moovs for UNHAS Day."
 *   - terms customers already use: store, Moovstores, Pick Up Order,
 *     Membership, cup, Small / Large, Fresh Milktea, Exclusive Matcha,
 *     delivery, dine-in, pick-up, voucher, barista, scan QR, and menu names.
 */
export const id: Copy = {
  meta: {
    home: {
      title: "Moovs Coffee, Makassar. To accompany your next move.",
      description:
        "Kopi, teh, fresh milktea, dan matcha buat menemani harimu. Dua puluh satu store di Makassar, buka 07:00 sampai 22:00.",
    },
    menu: {
      title: "Menu. Moovs Coffee, Makassar.",
      description:
        "Kopi, teh, fresh milktea, matcha, non-coffee, dan camilan di Moovs Coffee, lengkap dengan kisaran harga tiap daftar.",
    },
    stores: {
      title: "Store. Moovs Coffee, Makassar.",
      description: "Dua puluh satu store Moovs Coffee di Makassar, buka 07:00 sampai 22:00.",
    },
  },

  common: {
    order: "Pesan Sekarang",
    orderShort: "Pesan",
    findStore: "Cari Store",
    orderPickup: "Pesan untuk pick-up",
    newBadge: "Baru",
    to: "sampai",
    openUntil: (time: string) => `Buka · sampai ${time}`,
    closedUntil: (time: string) => `Tutup · buka ${time}`,
    hoursVary: "Jam buka bisa beda tiap store.",
  },

  nav: {
    skip: "Langsung ke konten",
    home: "Moovs Coffee, beranda",
    primary: "Utama",
    mobile: "Menu mobile",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    language: "Bahasa",
    links: { day: "Sehari", menu: "Menu", stores: "Store", membership: "Membership", stories: "Cerita" },
  },

  hero: {
    meta: ["Makassar", "07:00 sampai 22:00", "Store #01 sampai #21"],
    title: ["To accompany", "your next move."],
    lede: "Apa pun yang bikin kamu keluar rumah hari ini, kami ada dari jam 7 pagi sampai 10 malam. Dua puluh satu store di Makassar, dan masih nambah.",
    ticker: ["7 A.M. ready", "To accompany your next move", "21 stores & counting", "A place to pause", "A place to step forward"],
    videoAlt: "Es batu, lalu kopi dan susu, dituang ke gelas di atas meja kayu dalam cahaya hangat",
    pause: "Jeda",
    play: "Putar",
    pauseLabel: "Jeda video latar",
    playLabel: "Putar video latar",
  },

  manifesto: {
    label: "Kenapa “moovs”",
    text: "Moovs artinya bergerak. Bukan lompatan besar. Yang kecil-kecil saja. Keluar rumah jam tujuh. Sampai kampus jam sepuluh. Satu jam lagi waktu langit mulai jingga. Langkahnya tetap punyamu. Kami cuma menemani.",
    caption: "Sudah bergerak dari pagi.",
    facts: [
      { value: "21", label: "Store, dan terus bertambah" },
      { value: "07:00", label: "Cup pertama hari ini" },
      { value: "22:00", label: "Yang terakhir sebelum tutup" },
      { value: "Rp13K", label: "Harga menu mulai dari sini" },
    ],
  },

  day: {
    overline: "Sehari bareng Moovs",
    title: "Satu hari, beberapa langkah kecil.",
    lede: "Ikuti jamnya, dari cup pertama sampai yang terakhir. Di antaranya pasti ada bagian hari yang jadi milikmu.",
    hint: "Scroll terus",
    moveLabel: "Langkah",
    closeLabel: "Tutup",
    goesWith: "Pas ditemani",
    moves: [
      {
        title: "Keluar rumah.",
        body: "Kota masih menggeliat. Kami buka jam tujuh, jadi cup pertamamu sudah siap waktu kamu lewat.",
        note: "Large, 22 oz",
      },
      {
        title: "Di sela kelas.",
        body: "Dua puluh menit, jalan sebentar, daftar tugas masih panjang. Yang dingin-dingin bikin jeda terasa seperti istirahat.",
        note: "Tea mulai Rp13.000",
      },
      {
        title: "A place to pause.",
        body: "Sore melambat. Duduk saja dulu. Tidak ada yang buru-buru.",
        note: "Exclusive Matcha",
      },
      {
        title: "Satu langkah lagi.",
        body: "Kerjaan beres, harinya belum. Satu buat jalan pulang, atau buat yang masih menunggu.",
        note: "Fresh Milktea",
      },
    ],
    endTitle: ["Lampu padam.", "Jam tujuh buka lagi."],
    endCta: "Lihat menu",
  },

  menu: {
    overline: "Menu",
    title: "The balance you keep coming back for.",
    lede: "Enam daftar pendek dan dua ukuran cup, dengan harga yang ramah buat jadi kebiasaan tiap hari.",
    tablist: "Kategori menu",
    priceRange: "Kisaran harga",
    served: "Penyajian",
    full: "Lihat menu lengkap",
    fineprint: "Harga di atas kisaran untuk tiap daftar. Menu lengkap dan harga pasti tiap store ada di ESB Order.",
    categories: {
      coffee: { note: "Gula aren, espresso, dan nama-nama yang sudah kamu hafal.", sizes: "12 oz · 22 oz" },
      tea: { note: "Dingin, segar, dan gampang dibawa keliling kampus.", sizes: "12 oz · 22 oz" },
      "fresh-milktea": { note: "Teh seduh, susu segar. Ada di menu sejak September 2026.", sizes: "Dibuat saat dipesan" },
      matcha: { note: "Tiga cara menikmatinya. Pilih seberapa pekat.", sizes: "Exclusive Matcha" },
      "non-coffee": { note: "Buat hari-hari yang tetap jalan tanpa kafein.", sizes: "12 oz · 22 oz" },
      food: { note: "Yang kecil-kecil buat satu tangan, biar tangan satunya tetap bebas.", sizes: "Tambahan" },
    },
  },

  stores: {
    overline: "Moovstores",
    label: "Stores & counting",
    countSr: (n: number) => `${n} store dan terus bertambah`,
    caption: ["Store #21", "Something’s a little different."],
    title: "Not your usual store.",
    lede: "Keramik hitam bergaris, kayu terang, lampu hangat. A place to pause, a place to step forward. Store ke-21 buka Agustus 2026, dan daftarnya terus bertambah di Makassar.",
    facts: [
      "07:00 sampai 22:00. Jam buka bisa beda tiap store.",
      "Pick-up lewat QR, jadi pesananmu siap waktu kamu lewat.",
      "Delivery lewat GoFood.",
    ],
    cta: "Cari store",
  },

  member: {
    overline: "Membership",
    title: "Makin sering mampir, makin terasa.",
    lede: "Kalau Moovs sudah jadi bagian dari minggumu, biar ada yang balik ke kamu. Poin dan voucher-nya lewat ESB Order.",
    cta: "Mulai kumpulkan poin",
    steps: [
      { title: "Pesan", body: "Scan QR Pick Up Order di store mana pun, atau pesan duluan biar tidak perlu antre." },
      { title: "Kumpulkan", body: "Poin di membership-mu terkumpul pelan-pelan sepanjang minggu." },
      { title: "Tukar", body: "Tukar poin dengan voucher buat cup berikutnya. Sesederhana itu." },
    ],
    sticker: {
      label: "Cara kerja Pick Up Order",
      title: "Pick Up Order",
      instruction: "Arahkan handphone untuk scan QR.",
      note: "Pesan duluan, tinggal ambil.",
    },
  },

  stories: {
    overline: "Cerita",
    title: "Yang baru dari Moovs.",
    link: "Ikuti di Instagram",
    items: [
      {
        tag: "Store baru",
        date: "Agustus 2026",
        title: "Store #21. Something's a little different.",
        body: "Pintu ke-21 kami buka Agustus lalu. Cup-nya sama, ruangannya sedikit beda.",
      },
      {
        tag: "Menu baru",
        date: "September 2026",
        title: "Fresh Milktea sudah datang.",
        body: "Jasmine Green, Earl Grey, Peach Oolong, Red Oolong, dan Jasmine Peach Tea.",
      },
      {
        tag: "Kolaborasi",
        date: "Moovs × Mamu",
        title: "Yang dipakai barista kami saat kerja.",
        body: "Seragam yang dibuat bareng MAMU, buat mereka yang ada di balik bar.",
      },
      {
        tag: "Kampus",
        date: "Bareng Gojek",
        title: "A little moovs for UNHAS Day.",
        body: "Sehari di kampus bareng Gojek, bersama mahasiswa yang bikin kami sibuk tiap hari.",
      },
      {
        tag: "Jam buka",
        date: "Oktober 2026",
        title: "7 A.M. ready.",
        body: "Jam buka kami majukan ke jam tujuh, karena harimu mulai sebelum jam sembilan.",
      },
    ],
  },

  closing: {
    title: "Whatever gets you out the door.",
    lede: "Kami ada dari jam 7 pagi sampai 10 malam. Pesan duluan, atau langsung mampir saja.",
  },

  footer: {
    tagline: "To accompany your next move.",
    hours: "Jam buka",
    hoursValue: "07:00 sampai 22:00",
    explore: "Jelajahi",
    orderFollow: "Pesan & ikuti",
    nav: "Footer",
    pickup: "Pick Up Order",
    instagram: "Instagram @moovs.coffee",
    parent: "Bagian dari Ruang Saturasa",
    copyright: "© 2026 Moovs Coffee, Makassar.",
    credit: "Foto dan video di situs ini masih stok berlisensi dari Unsplash dan Pexels, sambil menunggu sesi foto Moovs.",
  },

  band: {
    lede: "Scan QR Pick Up Order di store mana pun, atau pesan duluan dan langsung ke counter.",
  },

  menuPage: {
    overline: "Menu",
    title: "Pick your next move.",
    lede: "Kopi, teh, fresh milktea, matcha, dan beberapa camilan kecil. Hampir semua minuman ada dalam dua ukuran cup: Small 12 oz dan Large 22 oz.",
    facts: { lists: "Daftar", items: "Pilihan menu", from: "Minuman mulai" },
    sizeGroup: "Ukuran cup",
    small: "Small",
    large: "Large",
    bandTitle: "Pesan duluan. Sudah siap waktu kamu lewat.",
    findStore: "Cari store",
  },

  storesPage: {
    overline: "Moovstores",
    title: "Dua puluh satu pintu, dan masih nambah.",
    lede: "Tersebar di Makassar, buka 07:00 sampai 22:00. Jam buka bisa beda tiap store, jadi cek dulu sebelum berangkat.",
    indexLabel: "Indeks",
    indexLede: "Tiap angka satu store. #21 yang paling baru, buka sejak Agustus 2026.",
    newest: "Terbaru",
    listLabel: "Daftar store",
    bandTitle: "Sudah tahu store-mu? Pesan duluan.",
    seeMenu: "Lihat menu",
    locator: {
      interimTitle: "Daftar lengkapnya sedang disiapkan.",
      interimBody:
        "Kami sedang memastikan tiap alamat, jam buka, dan layanan sebelum ditampilkan di sini. Sementara itu, lokasi store ada di highlight Outlet di Instagram kami.",
      interimCta: "Lokasi store di Instagram",
      area: "Area",
      allAreas: "Semua area",
      servicesLabel: "Layanan",
      services: { "dine-in": "Dine-in", pickup: "Pick-up lewat QR", delivery: "Delivery" },
      openNow: "Buka sekarang",
      showing: (shown: number, total: number) => `Menampilkan ${shown} dari ${total} store`,
      noMatch: "Belum ada store yang cocok dengan filter itu.",
      clear: "Hapus filter",
      storeNumber: "Store nomor",
      order: "Pesan",
      directions: "Petunjuk arah",
    },
  },

  loader: { place: "Moovs Coffee, Makassar" },
};
