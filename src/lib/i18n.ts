/**
 * Two languages. English is the brand's primary voice and lives at the root
 * ("/", "/menu", "/stores"); Bahasa Indonesia lives under "/id".
 */
export const langs = ["en", "id"] as const;
export type Lang = (typeof langs)[number];

/** Prefix an internal path for a language: href("id", "/menu") -> "/id/menu", href("id", "/#day") -> "/id#day". */
export function href(lang: Lang, path: string) {
  if (lang === "en") return path;
  if (path === "/") return "/id";
  if (path.startsWith("/#")) return `/id${path.slice(1)}`;
  return `/id${path}`;
}

/** The same page in the other language. */
export function switchPath(pathname: string, to: Lang) {
  const bare = pathname === "/id" ? "/" : pathname.startsWith("/id/") ? pathname.slice(3) : pathname;
  return href(to, bare);
}
