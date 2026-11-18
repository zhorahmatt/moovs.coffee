"use client";

import { useEffect, useState } from "react";
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
export function OpenStatus({ showClock = false, className }: { showClock?: boolean; className?: string }) {
  const [now, setNow] = useState<ReturnType<typeof read> | null>(null);

  useEffect(() => {
    const tick = () => setNow(read());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const hours = `${pad(site.opens)}:00 – ${pad(site.closes)}:00`;
  const label = !now
    ? hours
    : now.open
      ? `Open now · until ${pad(site.closes)}:00`
      : `Closed · opens ${pad(site.opens)}:00`;

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
