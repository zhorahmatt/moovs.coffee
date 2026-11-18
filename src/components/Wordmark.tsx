/**
 * The Moovs Coffee logo (symbol + "moovs™ COFFEE").
 *
 * Source: the brand's own logo file, supplied by the client from their ESB
 * Order assets. It is stored as an alpha mask in /public/brand, so the logo
 * takes the surrounding text colour (white on photos, cream on ink, and so on).
 * Swap the PNG masks for the official vector files when they arrive.
 */
export function Wordmark({ className }: { className?: string }) {
  return <span className={`logo ${className ?? ""}`} role="img" aria-label="Moovs Coffee" />;
}

/** The symbol alone, used large as a supergraphic. Decorative. */
export function Symbol({ className }: { className?: string }) {
  return <span className={`symbol ${className ?? ""}`} aria-hidden="true" />;
}
