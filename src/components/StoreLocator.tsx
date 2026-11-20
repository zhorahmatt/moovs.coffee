"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { serviceKeys, site, stores, type Service, type Store } from "@/lib/site";

/**
 * Layout specimens. Shown ONLY in development and ONLY while the real store
 * list is empty, so the card design can be reviewed. They carry field labels,
 * not invented addresses, and never reach a production build.
 */
const specimens: Store[] =
  process.env.NODE_ENV !== "production"
    ? [
        { number: 21, name: "Nama store", area: "Area A", address: "Alamat lengkap store, Makassar", opens: "07:00", closes: "22:00", services: ["dine-in", "pickup", "delivery"], isNewest: true },
        { number: 12, name: "Nama store", area: "Area B", address: "Alamat lengkap store, Makassar", opens: "07:30", closes: "21:30", services: ["pickup", "delivery"] },
        { number: 3, name: "Nama store", area: "Area A", address: "Alamat lengkap store, Makassar", opens: "07:00", closes: "22:00", services: ["dine-in", "pickup"] },
      ]
    : [];

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function makassarMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const pick = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return (pick("hour") % 24) * 60 + pick("minute");
}

const isOpen = (store: Store, now: number) => now >= toMinutes(store.opens) && now < toMinutes(store.closes);

export function StoreLocator({ lang, arrow, arrowOut }: { lang: Lang; arrow: ReactNode; arrowOut: ReactNode }) {
  const copy = getCopy(lang);
  const t = copy.storesPage.locator;
  const list = stores.length ? stores : specimens;
  const usingSpecimens = !stores.length && specimens.length > 0;

  const [area, setArea] = useState("all");
  const [wanted, setWanted] = useState<Service[]>([]);
  const [openOnly, setOpenOnly] = useState(false);
  // Makassar time in minutes. Null on the server and before mount, where cards show plain hours.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(makassarMinutes());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const areas = useMemo(() => Array.from(new Set(list.map((store) => store.area))).sort(), [list]);

  const shown = useMemo(
    () =>
      list
        .filter((store) => area === "all" || store.area === area)
        .filter((store) => wanted.every((service) => store.services.includes(service)))
        .filter((store) => !openOnly || (now !== null && isOpen(store, now)))
        .sort((a, b) => b.number - a.number),
    [list, area, wanted, openOnly, now],
  );

  const toggleService = (service: Service) =>
    setWanted((current) => (current.includes(service) ? current.filter((s) => s !== service) : [...current, service]));

  const reset = () => {
    setArea("all");
    setWanted([]);
    setOpenOnly(false);
  };

  if (!list.length) {
    return (
      <div className="wrap locator__interim">
        <h2 className="h2" data-split>
          {t.interimTitle}
        </h2>
        <div data-reveal>
          <p className="lede">{t.interimBody}</p>
          <a className="btn btn--ink" href={site.links.instagram} target="_blank" rel="noreferrer">
            {t.interimCta} {arrowOut}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap locator">
      {usingSpecimens ? (
        <p className="locator__notice" role="note">
          <strong>Layout preview.</strong> These three cards are specimens with field labels, shown in development
          only. Add the real stores to <code>stores</code> in <code>src/lib/site.ts</code> and they are replaced.
          Production shows a short &ldquo;list on its way&rdquo; message until then.
        </p>
      ) : null}

      <div className="locator__filters">
        {areas.length > 1 ? (
          <div className="locator__group" role="group" aria-label={t.area}>
            <button type="button" className="chip" aria-pressed={area === "all"} onClick={() => setArea("all")}>
              {t.allAreas}
            </button>
            {areas.map((name) => (
              <button key={name} type="button" className="chip" aria-pressed={area === name} onClick={() => setArea(name)}>
                {name}
              </button>
            ))}
          </div>
        ) : null}

        <div className="locator__group" role="group" aria-label={t.servicesLabel}>
          {serviceKeys.map((service) => (
            <button
              key={service}
              type="button"
              className="chip"
              aria-pressed={wanted.includes(service)}
              onClick={() => toggleService(service)}
            >
              {t.services[service]}
            </button>
          ))}
          <button type="button" className="chip chip--open" aria-pressed={openOnly} onClick={() => setOpenOnly((v) => !v)}>
            <span className="status__dot" aria-hidden="true" />
            {t.openNow}
          </button>
        </div>
      </div>

      <p className="locator__count" aria-live="polite">
        {t.showing(shown.length, list.length)}
      </p>

      {shown.length ? (
        <ul className="locator__grid">
          {shown.map((store) => {
            const open = now !== null && isOpen(store, now);
            return (
              <li key={store.number} id={`store-${store.number}`} className="scard">
                <div className="scard__top">
                  <p className="scard__num">
                    <span className="sr-only">{t.storeNumber} </span>#{String(store.number).padStart(2, "0")}
                  </p>
                  {store.isNewest ? <span className="chip__badge">{copy.storesPage.newest}</span> : null}
                </div>
                <p className="overline scard__area">{store.area}</p>
                <h3 className="scard__name">{store.name}</h3>
                <p className="scard__address">{store.address}</p>

                <p className="status scard__status" data-state={now === null ? "idle" : open ? "open" : "closed"}>
                  <span className="status__dot" aria-hidden="true" />
                  {now === null
                    ? `${store.opens} – ${store.closes}`
                    : open
                      ? copy.common.openUntil(store.closes)
                      : copy.common.closedUntil(store.opens)}
                </p>

                <ul className="scard__services" aria-label={t.servicesLabel}>
                  {store.services.map((service) => (
                    <li key={service}>{t.services[service]}</li>
                  ))}
                </ul>

                <div className="scard__actions">
                  <a className="btn btn--primary btn--sm" href={store.orderUrl ?? site.links.order} target="_blank" rel="noreferrer">
                    {t.order} {arrowOut}
                  </a>
                  {store.mapsUrl ? (
                    <a className="link" href={store.mapsUrl} target="_blank" rel="noreferrer">
                      {t.directions} {arrow}
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="locator__empty">
          <p>{t.noMatch}</p>
          <button type="button" className="btn btn--ink btn--sm" onClick={reset}>
            {t.clear}
          </button>
        </div>
      )}
    </div>
  );
}
