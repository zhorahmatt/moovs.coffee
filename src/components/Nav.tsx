"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getCopy } from "@/lib/copy";
import { href, langs, switchPath, type Lang } from "@/lib/i18n";
import { navLinks, site } from "@/lib/site";
import { getLenis } from "@/lib/lenis";
import { OpenStatus } from "./OpenStatus";
import { Wordmark } from "./Wordmark";

export function Nav({ lang, arrow }: { lang: Lang; arrow: ReactNode }) {
  const pathname = usePathname();
  const copy = getCopy(lang);
  const t = copy.nav;
  const links = navLinks.map((link) => ({ href: href(lang, link.path), label: t.links[link.key] }));

  // The same page in the other language. Each language keeps its own autonym.
  const languages = (
    <div className="lang" role="group" aria-label={t.language}>
      {langs.map((code) => (
        <a
          key={code}
          href={switchPath(pathname, code)}
          hrefLang={code}
          lang={code}
          aria-current={code === lang ? "true" : undefined}
          aria-label={code === "en" ? "English" : "Bahasa Indonesia"}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </div>
  );
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the open menu, and release it however the menu closes.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add("menu-open");
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 960px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);

    return () => {
      lenis?.start();
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <div className="nav__bar">
        <a className="nav__brand" href={href(lang, "/#top")} aria-label={t.home}>
          <Wordmark />
        </a>

        <nav className="nav__links" aria-label={t.primary}>
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <OpenStatus lang={lang} className="nav__status" />
          <div className="nav__lang">{languages}</div>
          <a className="btn btn--primary btn--sm nav__order" href={site.links.order} target="_blank" rel="noreferrer">
            <span className="nav__order-long">{copy.common.order}</span>
            <span className="nav__order-short">{copy.common.orderShort}</span> {arrow}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t.closeMenu : t.openMenu}</span>
            <span className="nav__burger" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="nav__panel" inert={!open}>
        <nav aria-label={t.mobile}>
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              style={{ "--i": index } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              <span className="nav__index">0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav__panel-foot">
          <OpenStatus lang={lang} showClock />
          {languages}
          <a className="btn btn--primary" href={site.links.order} target="_blank" rel="noreferrer">
            {copy.common.order} {arrow}
          </a>
        </div>
      </div>
    </header>
  );
}
