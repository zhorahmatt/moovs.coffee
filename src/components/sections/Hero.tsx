import { media } from "@/lib/media";
import { site } from "@/lib/site";
import { Icon } from "../Icon";
import { OpenStatus } from "../OpenStatus";
import { Photo } from "../Photo";

const ticker = [
  "7 A.M. ready",
  "To accompany your next move",
  "21 stores & counting",
  "A place to pause",
  "A place to step forward",
];

export function Hero() {
  return (
    <section className="hero" id="top" data-hero>
      <div className="hero__media" data-hero-media>
        <div className="hero__drift" data-hero-drift>
          <div className="hero__pointer" data-hero-pointer>
            <Photo media={media.hero} sizes="100vw" priority className="hero__photo" />
          </div>
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </div>

      <div className="hero__content wrap" data-hero-content>
        <p className="overline hero__meta" data-hero-meta>
          <span>Makassar</span>
          <span aria-hidden="true">/</span>
          <span>07:00 to 22:00</span>
          <span aria-hidden="true">/</span>
          <span>Store #01 to #{site.storeCount}</span>
        </p>

        <h1 className="hero__title" data-hero-title>
          To accompany <br />
          your next move.
        </h1>

        <div className="hero__aside">
          <p className="hero__lede" data-hero-fade>
            Whatever gets you out the door, we&rsquo;re here from 7 AM to 10 PM. Twenty-one stores across Makassar, and
            counting.
          </p>
          <div className="hero__actions" data-hero-rise>
            <a className="btn btn--primary" href={site.links.order} target="_blank" rel="noreferrer">
              Order Now <Icon name="arrow-right-up-linear" size={18} />
            </a>
            <a className="btn btn--ghost" href="/stores">
              Find a Store
            </a>
          </div>
          <OpenStatus showClock className="hero__status" />
        </div>
      </div>

      <div className="marquee" data-marquee data-hero-marquee>
        <p className="sr-only">{ticker.join(". ")}.</p>
        <div className="marquee__track" aria-hidden="true">
          {[0, 1, 2, 3].map((copy) => (
            <ul key={copy}>
              {ticker.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
