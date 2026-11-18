"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
// Phones resize the viewport as the address bar slides away; don't re-measure pins for that.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * The site's motion system: GSAP + ScrollTrigger, with Lenis as the one
 * smooth-scroll engine. Sections stay plain server-rendered HTML and opt in
 * through data attributes:
 *
 *   data-split          heading revealed word by word (masked)
 *   data-reveal         fade-and-rise on scroll
 *   data-image-reveal   photo wiped in from below
 *   data-parallax       photo drifting inside its frame
 *   data-scrub-words    paragraph that fills in as you scroll
 *   data-count          number that counts up once
 *
 * It also runs the logo loader (see layout.tsx): the loader covers the page
 * while fonts and the first photo arrive, then lifts and hands off to the
 * page's own entrance. Moving between pages reuses the same curtain.
 *
 * Under prefers-reduced-motion nothing here runs: no loader, no smooth scroll,
 * no scrubbing, and the CSS shows every element in its final state.
 */

const INK = "#111111";
const CREAM = "#f3eee6";
/** Background of the day chapter, spaced evenly from 07:00 to 22:00. */
const DAY_SKY = ["#f3eee6", "#faf7f2", "#ebd3b6", "#8c3a22", "#111111"];
const DAY_START = 7 * 60;
const DAY_END = 22 * 60;

/** Set once a visitor has seen the full logo loader in this browser session. Mirrored in layout.tsx. */
const SEEN_KEY = "moovs:seen";

/** The hash landing below should happen once per page load, not on every breakpoint change. */
let landedOnHash = false;

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function Motion() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        wide: "(min-width: 960px)",
        tall: "(min-height: 620px)",
        fine: "(pointer: fine)",
      },
      (context) => {
        const { motion, wide, tall, fine } = context.conditions as Record<string, boolean>;
        // The day chapter travels sideways on desktop and on phones held upright.
        // Short landscape screens keep the plain vertical stack.
        const sideways = wide || tall;

        if (!motion) {
          root.classList.remove("motion", "motion-ready", "motion-booted", "loading", "loading-short");
          return;
        }
        root.classList.add("motion", "motion-booted");

        const cleanups: Array<() => void> = [];
        let heroIntro: gsap.core.Timeline | null = null;

        /* ---- Smooth scroll: Lenis, driven by GSAP's ticker ---- */
        const lenis = new Lenis({ lerp: 0.1, anchors: true });
        setLenis(lenis);
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(raf);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
          setLenis(null);
        });

        /* ---- Hero: intro sequence, scroll drift, pointer depth ---- */
        const hero = document.querySelector<HTMLElement>("[data-hero]");
        if (hero) {
          const q = gsap.utils.selector(hero);
          const title = q("[data-hero-title]")[0];
          const split = SplitText.create(title, { type: "words", mask: "words", wordsClass: "w", aria: "auto" });

          gsap.set(q("[data-hero-title], [data-hero-meta], [data-hero-fade]"), { visibility: "visible" });

          // Navigation and the calls to action are never hidden: they stay usable from first paint.
          heroIntro = gsap
            .timeline({ paused: true, defaults: { ease: "power4.out" } })
            .fromTo(
              q("[data-hero-media]"),
              { clipPath: "inset(16% 28% 16% 28% round 20px)" },
              { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.7, ease: "expo.inOut" },
              0,
            )
            .fromTo(q(".hero__photo img"), { scale: 1.3 }, { scale: 1, duration: 2.4, ease: "expo.out" }, 0)
            .from(split.words, { yPercent: 112, duration: 1.15, stagger: 0.06 }, 0.35)
            .from(q("[data-hero-meta]"), { autoAlpha: 0, y: 14, duration: 0.9 }, 0.75)
            .from(q("[data-hero-fade]"), { autoAlpha: 0, y: 18, duration: 0.9 }, 0.9)
            .from(q("[data-hero-rise]"), { y: 18, duration: 0.9 }, 0.9)
            .from(q("[data-hero-marquee]"), { yPercent: 100, duration: 1 }, 1);

          gsap.to(q("[data-hero-drift]"), {
            yPercent: 14,
            scale: 1.08,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          });
          gsap.to(q("[data-hero-content]"), {
            yPercent: -10,
            autoAlpha: 0.15,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "40% top", end: "bottom top", scrub: true },
          });

          if (fine) {
            const layer = q("[data-hero-pointer]")[0];
            const xTo = gsap.quickTo(layer, "x", { duration: 1.1, ease: "power3.out" });
            const yTo = gsap.quickTo(layer, "y", { duration: 1.1, ease: "power3.out" });
            const onMove = (event: PointerEvent) => {
              const rect = hero.getBoundingClientRect();
              xTo(((event.clientX - rect.left) / rect.width - 0.5) * -28);
              yTo(((event.clientY - rect.top) / rect.height - 0.5) * -20);
            };
            const settle = () => {
              xTo(0);
              yTo(0);
            };
            hero.addEventListener("pointermove", onMove, { passive: true });
            hero.addEventListener("pointerleave", settle);
            window.addEventListener("blur", settle);
            document.addEventListener("visibilitychange", settle);
            cleanups.push(() => {
              hero.removeEventListener("pointermove", onMove);
              hero.removeEventListener("pointerleave", settle);
              window.removeEventListener("blur", settle);
              document.removeEventListener("visibilitychange", settle);
            });
          }
        }

        /* ---- A day in moovs ---- */
        const day = document.querySelector<HTMLElement>("[data-day]");
        if (day && sideways) {
          const track = day.querySelector<HTMLElement>("[data-day-track]")!;
          const clock = day.querySelector<HTMLElement>("[data-day-clock]")!;
          const progress = day.querySelector<HTMLElement>("[data-day-progress]")!;
          const panels = gsap.utils.toArray<HTMLElement>("[data-day-panel]", day);
          const sky = gsap.utils.interpolate(DAY_SKY) as unknown as (t: number) => string;

          day.classList.add("is-horizontal");
          cleanups.push(() => {
            day.classList.remove("is-horizontal");
            day.style.removeProperty("--day-bg");
            day.style.removeProperty("--day-fg");
            clock.textContent = "07:00";
          });

          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          // Panels are narrower on phones, so stretch the scroll to keep the pace unhurried.
          const pace = wide ? 1 : 1.5;

          // Scroll progress at which each panel sits centre-screen, paired with its time.
          let stops: Array<{ p: number; m: number }> = [];
          const measure = () => {
            const d = distance() || 1;
            stops = panels.map((panel) => ({
              p: gsap.utils.clamp(0, 1, (panel.offsetLeft + panel.offsetWidth / 2 - window.innerWidth / 2) / d),
              m: toMinutes(panel.dataset.time ?? "07:00"),
            }));
            stops.unshift({ p: 0, m: DAY_START });
            stops.push({ p: 1, m: DAY_END });
          };

          let shownTime = "";
          let shownInk = true;
          const paint = (p: number) => {
            let minutes = DAY_END;
            for (let i = 1; i < stops.length; i++) {
              const a = stops[i - 1];
              const b = stops[i];
              if (p <= b.p) {
                minutes = a.m + (b.m - a.m) * (b.p === a.p ? 1 : (p - a.p) / (b.p - a.p));
                break;
              }
            }
            const t = (minutes - DAY_START) / (DAY_END - DAY_START);
            const snapped = Math.round(minutes / 5) * 5;
            const label = `${String(Math.floor(snapped / 60)).padStart(2, "0")}:${String(snapped % 60).padStart(2, "0")}`;
            if (label !== shownTime) {
              shownTime = label;
              clock.textContent = label;
            }
            day.style.setProperty("--day-bg", sky(t));
            const ink = t < 0.69;
            if (ink !== shownInk || !day.style.getPropertyValue("--day-fg")) {
              shownInk = ink;
              day.style.setProperty("--day-fg", ink ? INK : CREAM);
            }
            progress.style.transform = `scaleX(${t.toFixed(4)})`;
          };

          const travel = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: day,
              start: "top top",
              end: () => `+=${distance() * pace}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                measure();
                paint(self.progress);
              },
              onUpdate: (self) => paint(self.progress),
            },
          });

          panels.forEach((panel) => {
            const items = panel.querySelectorAll("[data-day-item]");
            gsap.from(items, {
              y: 44,
              autoAlpha: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: travel,
                start: "left 82%",
                toggleActions: "play none none reverse",
              },
            });

            const image = panel.querySelector(".move__img img");
            if (image) {
              gsap.fromTo(
                image,
                { xPercent: -5 },
                {
                  xPercent: 5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: travel,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                },
              );
            }
          });
        }

        /* ---- Entrances: held back until the loader lifts, so they are seen ---- */
        const armReveals = () => {
          /* ---- Headings: word by word ---- */
          gsap.utils.toArray<HTMLElement>("[data-split]").forEach((heading) => {
            const split = SplitText.create(heading, { type: "words", mask: "words", wordsClass: "w", aria: "auto" });
            gsap.set(heading, { visibility: "visible" });
            gsap.from(split.words, {
              yPercent: 112,
              duration: 1.05,
              ease: "power4.out",
              stagger: 0.05,
              scrollTrigger: { trigger: heading, start: "top 86%", once: true },
            });
          });

          /* ---- Supporting copy and cards ---- */
          const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
          // When the day chapter is a normal vertical stack, its items join the same reveal.
          if (day && !sideways) reveals.push(...gsap.utils.toArray<HTMLElement>("[data-day-item]", day));
          gsap.set(reveals, { autoAlpha: 0, y: 26 });
          ScrollTrigger.batch(reveals, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.08, overwrite: true }),
          });

          /* ---- Photos ---- */
          gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((frame) => {
            gsap
              .timeline({ scrollTrigger: { trigger: frame, start: "top 84%", once: true } })
              .fromTo(
                frame,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.out", clearProps: "clipPath" },
              )
              .fromTo(frame.querySelector("img"), { scale: 1.2 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
          });
        };

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((frame) => {
          gsap.fromTo(
            frame.querySelector("img"),
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        /* ---- Manifesto: the paragraph fills in as it is read ---- */
        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((paragraph) => {
          // The paragraph is aria-hidden; a screen-reader copy sits beside it.
          const split = SplitText.create(paragraph, { type: "words", wordsClass: "w", aria: "none" });
          gsap.fromTo(
            split.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.12,
              scrollTrigger: { trigger: paragraph, start: "top 80%", end: "bottom 55%", scrub: 0.5 },
            },
          );
        });

        /* ---- Store count ---- */
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
          const target = Number(node.dataset.count);
          const counter = { value: 1 };
          gsap.to(counter, {
            value: target,
            duration: 2,
            ease: "power3.out",
            snap: { value: 1 },
            onUpdate: () => {
              node.textContent = String(counter.value).padStart(2, "0");
            },
            scrollTrigger: { trigger: node, start: "top 82%", once: true },
          });
          cleanups.push(() => {
            node.textContent = String(target);
          });
        });

        /* ---- Footer supergraphic ---- */
        const supergraphic = document.querySelector("[data-super]");
        if (supergraphic) {
          gsap.from(supergraphic, {
            yPercent: 38,
            ease: "none",
            scrollTrigger: { trigger: supergraphic.parentElement, start: "top bottom", end: "bottom bottom", scrub: true },
          });
        }

        /* ---- Marquee only runs while it is on screen ---- */
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => entry.target.classList.toggle("is-inview", entry.isIntersecting));
        });
        document.querySelectorAll("[data-marquee]").forEach((node) => observer.observe(node));
        cleanups.push(() => observer.disconnect());

        /* ---- Keep measurements honest after fonts and media settle ---- */
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);
        cleanups.push(() => window.removeEventListener("load", refresh));

        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        /* ---- Loader hand-off ---- */
        let released = false;
        const release = () => {
          if (released) return;
          released = true;
          // Created inside the context so they are cleaned up with everything else.
          context.add(() => {
            armReveals();
            heroIntro?.play();
          });
          root.classList.add("motion-ready");
        };

        const loaderClasses = ["loading", "loading-short", "lifting", "leaving"];
        const clearLoader = () => root.classList.remove(...loaderClasses);
        const remember = () => {
          try {
            window.sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* private mode: the full loader simply shows again next time */
          }
        };

        if (root.classList.contains("loading") && document.querySelector("[data-loader]")) {
          // First visit of the session gets the full logo loader; later pages get a brief curtain.
          const short = root.classList.contains("loading-short");
          const clock = document.querySelector<HTMLElement>("[data-loader-clock]");
          const timers: number[] = [];
          let cancelled = false;
          lenis.stop();

          // Times are measured from the start of navigation, when the loader first painted.
          const minimum = short ? 450 : 1600;
          if (!short && clock) {
            ["06:58", "06:59"].forEach((label, index) => {
              timers.push(
                window.setTimeout(() => {
                  clock.textContent = label;
                }, Math.max(0, (minimum * (index + 1)) / 3 - performance.now())),
              );
            });
          }

          const photo = document.querySelector<HTMLImageElement>("[data-hero] img");
          const photoReady =
            photo && !photo.complete
              ? new Promise<void>((resolve) => {
                  photo.addEventListener("load", () => resolve(), { once: true });
                  photo.addEventListener("error", () => resolve(), { once: true });
                })
              : Promise.resolve();
          const patience = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, 2600)));

          const lift = () => {
            if (cancelled) return;
            if (clock) clock.textContent = "07:00";
            root.classList.add("lifting");
            lenis.start();
            remember();
            timers.push(window.setTimeout(release, 220));
            timers.push(window.setTimeout(clearLoader, 1100));
          };

          Promise.race([Promise.all([document.fonts?.ready, photoReady]), patience]).then(() => {
            if (cancelled) return;
            timers.push(window.setTimeout(lift, Math.max(0, minimum - performance.now())));
          });

          cleanups.push(() => {
            cancelled = true;
            timers.forEach((id) => window.clearTimeout(id));
          });
        } else {
          release();
        }

        /* ---- Page-to-page: the curtain rises, then the next page lifts it ---- */
        const onNavigate = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0) return;
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
          if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
          const url = new URL(link.href, window.location.href);
          // Same-page section links stay with the smooth scroll.
          if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

          event.preventDefault();
          remember();
          lenis.stop();
          root.classList.add("leaving");
          window.setTimeout(() => {
            window.location.href = url.href;
          }, 620);
        };
        // If the page comes back from the browser's back/forward cache, it must not return covered.
        const onShow = (event: PageTransitionEvent) => {
          if (!event.persisted) return;
          clearLoader();
          lenis.start();
        };
        document.addEventListener("click", onNavigate);
        window.addEventListener("pageshow", onShow);
        cleanups.push(() => {
          document.removeEventListener("click", onNavigate);
          window.removeEventListener("pageshow", onShow);
        });

        // Arriving with a #hash (for example "/#membership" from another page): the browser
        // jumped before the pinned chapter added its scroll length, so land on the target again.
        // ScrollTrigger restores the old position whenever it re-measures (fonts, load), so the
        // landing repeats after each refresh for a moment, and stops as soon as the reader acts.
        if (!landedOnHash && window.location.hash) {
          const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
          if (target) {
            const land = () => {
              // A pinned section reports a fixed position while pinned; its spacer holds the true one.
              const anchor = target.closest(".pin-spacer") ?? target;
              lenis.scrollTo(anchor.getBoundingClientRect().top + window.scrollY, { immediate: true, force: true });
            };
            const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
            const release = () => {
              ScrollTrigger.removeEventListener("refresh", land);
              window.clearTimeout(timer);
              inputs.forEach((type) => window.removeEventListener(type, settle));
            };
            const settle = () => {
              landedOnHash = true;
              release();
            };
            const timer = window.setTimeout(settle, 1500);
            inputs.forEach((type) => window.addEventListener(type, settle, { passive: true }));
            ScrollTrigger.addEventListener("refresh", land);
            cleanups.push(release);
            land();
          } else {
            landedOnHash = true;
          }
        }

        return () => {
          root.classList.remove("motion-ready", "motion-booted");
          cleanups.forEach((cleanup) => cleanup());
        };
      },
    );
  });

  return null;
}
