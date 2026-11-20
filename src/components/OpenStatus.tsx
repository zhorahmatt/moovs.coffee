"use client";

import { useEffect, useState } from "react";
import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

function read() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { open: hour >= site.opens && hour < site.closes, time: `${pad(hour)}:${pad(minute)}` };
}

/**
 * Live open/closed state on Makassar time. Server render and no-JS show the
 * plain opening hours; the live state takes over once mounted.
 */
export function OpenStatus({ lang, showClock = false, className }: { lang: Lang; showClock?: boolean; className?: string }) {
  const t = getCopy(lang).common;
  const [now, setNow] = useState<ReturnType<typeof read> | null>(null);

  useEffect(() => {
    const tick = () => setNow(read());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const label = !now
    ? `${pad(site.opens)}:00 – ${pad(site.closes)}:00`
    : now.open
      ? t.openUntil(`${pad(site.closes)}:00`)
      : t.closedUntil(`${pad(site.opens)}:00`);

  return (
    <span className={`status ${className ?? ""}`} data-state={!now ? "idle" : now.open ? "open" : "closed"}>
      <span className="status__dot" aria-hidden="true" />
      <span>{label}</span>
      {showClock && now ? (
        <span className="status__clock">
          {now.time} <abbr title="Waktu Indonesia Tengah">WITA</abbr>
        </span>
      ) : null}
    </span>
  );
}
