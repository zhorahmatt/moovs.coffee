import { getCopy } from "@/lib/copy";
import { href, type Lang } from "@/lib/i18n";
import { media } from "@/lib/media";
import { site } from "@/lib/site";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

const factIcons = ["clock-circle-linear", "qr-code-linear", "map-point-linear"] as const;

export function Stores({ lang }: { lang: Lang }) {
  const t = getCopy(lang).stores;
  return (
    <section className="stores" id="stores" aria-labelledby="stores-title">
      <div className="wrap stores__grid">
        <div className="stores__count">
          <p className="overline" data-reveal>
            {t.overline}
          </p>
          <p className="stores__number">
            <span className="sr-only">{t.countSr(site.storeCount)}</span>
            <span aria-hidden="true" data-count={site.storeCount}>
              {site.storeCount}
            </span>
          </p>
          <p className="stores__label" aria-hidden="true" data-reveal>
            {t.label}
          </p>
        </div>

        <figure className="stores__figure">
          <Photo media={media.store} lang={lang} ratio="4:5" sizes="(min-width: 960px) 40vw, 100vw" maxWidth={1440} reveal />
          <figcaption className="stores__caption overline" lang="en">
            <span>{t.caption[0]}</span>
            <span>{t.caption[1]}</span>
          </figcaption>
        </figure>

        <div className="stores__body">
          <h2 className="h2" id="stores-title" data-split lang="en">
            {t.title}
          </h2>
          <p className="lede" data-reveal>
            {t.lede}
          </p>
          <ul className="stores__facts" data-reveal>
            {t.facts.map((fact, index) => (
              <li key={fact}>
                <Icon name={factIcons[index]} />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <a className="btn btn--light" href={href(lang, "/stores")} data-reveal>
            {t.cta} <Icon name="arrow-right-linear" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
