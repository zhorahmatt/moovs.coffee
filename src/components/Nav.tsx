"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/site";
import { getLenis } from "@/lib/lenis";
import { OpenStatus } from "./OpenStatus";
import { Wordmark } from "./Wordmark";

export function Nav({ arrow }: { arrow: ReactNode }) {
  const pathname = usePathname();
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
        Skip to content
      </a>
      <div className="nav__bar">
        <a className="nav__brand" href="/#top" aria-label="Moovs Coffee, home">
          <Wordmark />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <OpenStatus className="nav__status" />
          <a className="btn btn--primary btn--sm" href={site.links.order} target="_blank" rel="noreferrer">
            Order Now {arrow}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="nav__burger" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="nav__panel" inert={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, index) => (
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
          <OpenStatus showClock />
          <a className="btn btn--primary" href={site.links.order} target="_blank" rel="noreferrer">
            Order Now {arrow}
          </a>
        </div>
      </div>
    </header>
  );
}
