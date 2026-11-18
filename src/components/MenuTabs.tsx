"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { menu, rupiah, site } from "@/lib/site";
import { Photo } from "./Photo";

export function MenuTabs({ arrow }: { arrow: ReactNode }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = menu.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="menu__grid">
      <div className="menu__media" aria-hidden="true">
        <div className="menu__stage">
          {menu.map((category, index) => (
            <Photo
              key={category.id}
              media={category.photo}
              ratio="4:5"
              sizes="(min-width: 960px) 50vw, 100vw"
              maxWidth={1440}
              decorative
              className={`menu__photo${index === active ? " is-active" : ""}`}
            />
          ))}
          <p className="menu__count">
            <span>{String(active + 1).padStart(2, "0")}</span> / {String(menu.length).padStart(2, "0")}
            <span className="menu__count-label">{menu[active].label}</span>
          </p>
        </div>
      </div>

      <div className="menu__body">
        <p className="overline" data-reveal>
          The menu
        </p>
        <h2 className="h2" data-split>
          The balance you keep coming back for.
        </h2>
        <p className="lede" data-reveal>
          Six short lists and two cup sizes, priced so it can be an everyday thing.
        </p>

        <div className="menu__tabs" role="tablist" aria-label="Menu categories" onKeyDown={onKeyDown} data-reveal>
          {menu.map((category, index) => (
            <button
              key={category.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              className="chip"
              aria-selected={index === active}
              aria-controls={`panel-${category.id}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
            >
              {category.label}
              {category.isNew ? <span className="chip__badge">New</span> : null}
            </button>
          ))}
        </div>

        {menu.map((category, index) => (
          <div
            key={category.id}
            role="tabpanel"
            id={`panel-${category.id}`}
            aria-labelledby={`tab-${category.id}`}
            className="menu__panel"
            hidden={index !== active}
            tabIndex={0}
          >
            <h3 className="menu__panel-title">{category.label}</h3>
            <p className="menu__note">{category.note}</p>
            <dl className="menu__facts">
              <div>
                <dt>Price range</dt>
                <dd>
                  {rupiah(category.priceFrom)} – {rupiah(category.priceTo)}
                </dd>
              </div>
              <div>
                <dt>Served</dt>
                <dd>{category.sizes}</dd>
              </div>
            </dl>
            <ol className="menu__list">
              {category.items.map((item, itemIndex) => (
                <li key={item.name} style={{ "--i": itemIndex } as React.CSSProperties}>
                  <span className="menu__num">{String(itemIndex + 1).padStart(2, "0")}</span>
                  <span className="menu__item">{item.name}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}

        <div className="menu__cta">
          <a className="btn btn--primary" href={site.links.order} target="_blank" rel="noreferrer">
            Order for pick-up {arrow}
          </a>
          <a className="link" href="/menu">
            See the full menu
          </a>
          <p className="fineprint">
            Prices are the range for each list. Every store&rsquo;s full menu and exact prices live on ESB Order.
          </p>
        </div>
      </div>
    </div>
  );
}
