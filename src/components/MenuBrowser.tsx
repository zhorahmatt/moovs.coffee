"use client";

import { useEffect, useRef, useState } from "react";
import { menu, menuHasItemPrices, rupiah, type MenuItem } from "@/lib/site";
import { Photo } from "./Photo";

type Size = "small" | "large";

const priceFor = (item: MenuItem, size: Size) =>
  size === "large" ? (item.large ?? item.small) : (item.small ?? item.large);

/**
 * The full menu: a sticky category bar that follows the reader, and one
 * section per list. Per-item prices and the Small / Large switch appear on
 * their own once prices exist in the data (see MenuItem in lib/site.ts).
 */
export function MenuBrowser() {
  const [active, setActive] = useState(menu[0].id);
  const [size, setSize] = useState<Size>("small");
  const bar = useRef<HTMLDivElement>(null);

  // Highlight the list currently being read.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-menu-section]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Keep the active chip in view when the bar scrolls sideways on small screens.
  useEffect(() => {
    const scroller = bar.current;
    const chip = scroller?.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (!scroller || !chip) return;
    const target = chip.offsetLeft - (scroller.clientWidth - chip.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  return (
    <div className="mbrowse">
      <div className="mbar">
        <div className="wrap">
          <div className="mbar__inner">
            <nav className="mbar__chips" aria-label="Menu categories" ref={bar}>
              {menu.map((category) => (
                <a
                  key={category.id}
                  className="chip"
                  href={`#${category.id}`}
                  aria-current={active === category.id ? "true" : undefined}
                >
                  {category.label}
                  {category.isNew ? <span className="chip__badge">New</span> : null}
                </a>
              ))}
            </nav>

            {menuHasItemPrices ? (
              <div className="sizes" role="group" aria-label="Cup size">
                {(["small", "large"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="sizes__btn"
                    aria-pressed={size === option}
                    onClick={() => setSize(option)}
                  >
                    {option === "small" ? "Small" : "Large"}
                    <span>{option === "small" ? "12 oz" : "22 oz"}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {menu.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className="mcat"
          aria-labelledby={`${category.id}-title`}
          data-menu-section
        >
          <div className="wrap mcat__grid">
            <div className="mcat__aside">
              <p className="overline mcat__index">
                {String(index + 1).padStart(2, "0")} / {String(menu.length).padStart(2, "0")}
                {category.isNew ? <span className="chip__badge">New</span> : null}
              </p>
              <h2 className="h2" id={`${category.id}-title`} data-split>
                {category.label}
              </h2>
              <p className="mcat__note" data-reveal>
                {category.note}
              </p>
              <dl className="menu__facts" data-reveal>
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
            </div>

            <div className="mcat__main">
              <div className="mcat__photo">
                <Photo
                  media={category.photo}
                  ratio="16:9"
                  sizes="(min-width: 960px) 56vw, 100vw"
                  maxWidth={1440}
                  reveal
                />
              </div>
              <ol className="menu__list mcat__list">
                {category.items.map((item, itemIndex) => {
                  const price = priceFor(item, size);
                  return (
                    <li key={item.name} data-reveal>
                      <span className="menu__num">{String(itemIndex + 1).padStart(2, "0")}</span>
                      <span className="menu__item">
                        {item.name}
                        {item.isNew ? <span className="chip__badge">New</span> : null}
                      </span>
                      {price !== undefined ? <span className="menu__price">{rupiah(price)}</span> : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
