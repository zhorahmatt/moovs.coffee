import solar from "@iconify-json/solar/icons.json";

/**
 * Solar icons (via Iconify data), inlined at build time so no icon request
 * is made at runtime. Server component only: the icon set never reaches the client.
 */
type SolarName = keyof typeof solar.icons;

export function Icon({ name, size = 20, className }: { name: SolarName; size?: number; className?: string }) {
  const icon = solar.icons[name];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${solar.width} ${solar.height}`}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
