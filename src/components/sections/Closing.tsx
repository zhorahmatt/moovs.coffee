import { getCopy } from "@/lib/copy";
import { href, type Lang } from "@/lib/i18n";
import { media } from "@/lib/media";
import { navLinks, site } from "@/lib/site";
import { Icon } from "../Icon";
import { OpenStatus } from "../OpenStatus";
import { Photo } from "../Photo";
import { Wordmark } from "../Wordmark";

export function Closing({ lang }: { lang: Lang }) {
  const copy = getCopy(lang);
  const t = copy.closing;
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing__media" aria-hidden="true">
        <Photo media={media.closing} sizes="100vw" decorative parallax />
        <div className="closing__shade" />
        <div className="grain" />
      </div>
      <div className="wrap closing__content">
        <OpenStatus lang={lang} showClock className="closing__status" />
        <h2 className="closing__title" id="closing-title" data-split lang="en">
          {t.title}
        </h2>
        <p className="lede" data-reveal>
          {t.lede}
        </p>
        <div className="closing__actions" data-reveal>
          <a className="btn btn--primary" href={site.links.order} target="_blank" rel="noreferrer">
            {copy.common.order} <Icon name="arrow-right-up-linear" size={18} />
          </a>
          <a className="btn btn--ghost" href={href(lang, "/stores")}>
            {copy.common.findStore}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const copy = getCopy(lang);
  const t = copy.footer;
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Wordmark />
          <p lang="en">{t.tagline}</p>
        </div>

        <div>
          <h2 className="overline">{t.hours}</h2>
          <p>
            {t.hoursValue} <abbr title="Waktu Indonesia Tengah">WITA</abbr>
          </p>
          <p className="footer__muted">{copy.common.hoursVary}</p>
        </div>

        <nav aria-label={t.nav}>
          <h2 className="overline">{t.explore}</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.key}>
                <a href={href(lang, link.path)}>{copy.nav.links[link.key]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="overline">{t.orderFollow}</h2>
          <ul>
            <li>
              <a href={site.links.order} target="_blank" rel="noreferrer">
                {t.pickup}
              </a>
            </li>
            <li>
              <a href={site.links.instagram} target="_blank" rel="noreferrer">
                {t.instagram}
              </a>
            </li>
            <li>
              <a href={site.links.parent} target="_blank" rel="noreferrer">
                {t.parent}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap footer__base">
        <p>{t.copyright}</p>
        <p>{t.credit}</p>
      </div>

      <p className="footer__super" aria-hidden="true">
        <span data-super />
      </p>
    </footer>
  );
}
