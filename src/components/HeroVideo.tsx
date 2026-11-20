"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { heroVideo } from "@/lib/media";

type Props = { lang: Lang; pauseIcon: ReactNode; playIcon: ReactNode };

/**
 * The hero's moving image. The poster is a normal <img>, so the hero is
 * complete before (or without) the video: no JavaScript, reduced motion and
 * Save-Data all keep the still frame and never download the clip.
 *
 * The clip starts once the logo loader has lifted, so it is seen from the
 * first pour; it pauses off-screen and in hidden tabs, dips to dark at the
 * loop point (empty glass after full glass would otherwise jump), and has a
 * pause control because it moves for longer than five seconds.
 */
export function HeroVideo({ lang, pauseIcon, playIcon }: Props) {
  const t = getCopy(lang).hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [dipping, setDipping] = useState(false);
  const userPausedRef = useRef(false);
  // The control lives outside the moving media layers (see Hero.tsx), so it stays put and clickable.
  const [controls, setControls] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setControls(document.querySelector<HTMLElement>("[data-hero-controls]"));
  }, []);

  // Decide once whether the clip may load at all.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const decide = () => setEnabled(!reduce.matches && !saveData);
    decide();
    reduce.addEventListener("change", decide);
    return () => reduce.removeEventListener("change", decide);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!enabled) {
      video.pause();
      return;
    }

    const root = document.documentElement;
    let onScreen = true;

    const sync = () => {
      const shouldPlay = onScreen && !document.hidden && !userPausedRef.current && !root.classList.contains("loading");
      if (shouldPlay && video.paused) video.play().catch(() => setPlaying(false));
      if (!shouldPlay && !video.paused) video.pause();
    };

    const onPlaying = () => setPlaying(true);
    const onTime = () => {
      if (!video.duration) return;
      // Fade to dark just before the loop point, back up once it restarts.
      setDipping(video.duration - video.currentTime < 0.45 || video.currentTime < 0.12);
    };
    video.addEventListener("playing", onPlaying);
    video.addEventListener("timeupdate", onTime);

    // Wait for the loader to lift (the boot script removes `loading`).
    const classWatch = new MutationObserver(sync);
    classWatch.observe(root, { attributes: true, attributeFilter: ["class"] });

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    visibility.observe(video);
    document.addEventListener("visibilitychange", sync);

    sync();

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("timeupdate", onTime);
      classWatch.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [enabled]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !userPaused;
    userPausedRef.current = next;
    setUserPaused(next);
    if (next) video.pause();
    else video.play().catch(() => undefined);
  };

  return (
    <>
      <div className={`hero__frame${playing ? " is-playing" : ""}${dipping ? " is-dipping" : ""}`} data-hero-frame>
        <img
          className="hero__poster"
          src={heroVideo.poster}
          width={heroVideo.width}
          height={heroVideo.height}
          alt={t.videoAlt}
          fetchPriority="high"
          decoding="async"
        />
        <video
          ref={videoRef}
          className="hero__video"
          src={enabled ? heroVideo.src : undefined}
          muted
          loop
          playsInline
          preload={enabled ? "auto" : "none"}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        />
        <span className="hero__dip" aria-hidden="true" />
      </div>

      {enabled && controls
        ? createPortal(
            <button
              type="button"
              className="hero__toggle"
              onClick={toggle}
              aria-pressed={userPaused}
              aria-label={userPaused ? t.playLabel : t.pauseLabel}
            >
              {userPaused ? playIcon : pauseIcon}
              <span aria-hidden="true">{userPaused ? t.play : t.pause}</span>
            </button>,
            controls,
          )
        : null}
    </>
  );
}
