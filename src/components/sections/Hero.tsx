import { getCopy } from "@/lib/copy";
import { href, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { HeroVideo } from "../HeroVideo";
import { Icon } from "../Icon";
import { OpenStatus } from "../OpenStatus";

export function Hero({ lang }: { lang: Lang }) {
  const copy = getCopy(lang);
  const t = copy.hero;
  return (
    <section className="hero" id="top" data-hero>
      <div className="hero__media" data-hero-media>
        <div className="hero__drift" data-hero-drift>
          <div className="hero__pointer" data-hero-pointer>
            <HeroVideo
              lang={lang}
              pauseIcon={<Icon name="pause-linear" size={14} />}
              playIcon={<Icon name="play-linear" size={14} />}
            />
          </div>
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </div>

      <div className="hero__controls" data-hero-controls />

      <div className="hero__content wrap" data-hero-content>
        <p className="overline hero__meta" data-hero-meta>
          {t.meta.map((part, index) => (
            <span key={part} className="hero__meta-part">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              <span>{part}</span>
            </span>
          ))}
        </p>

        {/* The brand tagline: English in every language. */}
        <h1 className="hero__title" data-hero-title lang="en">
          {t.title[0]} <br />
          {t.title[1]}
        </h1>

        <div className="hero__aside">
          <p className="hero__lede" data-hero-fade>
            {t.lede}
          </p>
          <div className="hero__actions" data-hero-rise>
            <a className="btn btn--primary" href={site.links.order} target="_blank" rel="noreferrer">
              {copy.common.order} <Icon name="arrow-right-up-linear" size={18} />
            </a>
            <a className="btn btn--ghost" href={href(lang, "/stores")}>
              {copy.common.findStore}
            </a>
          </div>
          <OpenStatus lang={lang} showClock className="hero__status" />
        </div>
      </div>

      <div className="marquee" data-marquee data-hero-marquee lang="en">
        <p className="sr-only">{t.ticker.join(". ")}.</p>
        <div className="marquee__track" aria-hidden="true">
          {[0, 1, 2, 3].map((copyIndex) => (
            <ul key={copyIndex}>
              {t.ticker.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
