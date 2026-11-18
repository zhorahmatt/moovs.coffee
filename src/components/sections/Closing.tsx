import { media } from "@/lib/media";
import { navLinks, site } from "@/lib/site";
import { Icon } from "../Icon";
import { OpenStatus } from "../OpenStatus";
import { Photo } from "../Photo";
import { Wordmark } from "../Wordmark";

export function Closing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing__media" aria-hidden="true">
        <Photo media={media.closing} sizes="100vw" decorative parallax />
        <div className="closing__shade" />
        <div className="grain" />
      </div>
      <div className="wrap closing__content">
        <OpenStatus showClock className="closing__status" />
        <h2 className="closing__title" id="closing-title" data-split>
          Whatever gets you out the door.
        </h2>
        <p className="lede" data-reveal>
          We&rsquo;re here from 7 AM to 10 PM. Order ahead, or just walk in.
        </p>
        <div className="closing__actions" data-reveal>
          <a className="btn btn--primary" href={site.links.order} target="_blank" rel="noreferrer">
            Order Now <Icon name="arrow-right-up-linear" size={18} />
          </a>
          <a className="btn btn--ghost" href="/stores">
            Find a Store
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Wordmark />
          <p>To accompany your next move.</p>
        </div>

        <div>
          <h2 className="overline">Hours</h2>
          <p>
            07:00 to 22:00 <abbr title="Waktu Indonesia Tengah">WITA</abbr>
          </p>
          <p className="footer__muted">Hours can vary by store.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="overline">Explore</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="overline">Order &amp; follow</h2>
          <ul>
            <li>
              <a href={site.links.order} target="_blank" rel="noreferrer">
                Pick Up Order
              </a>
            </li>
            <li>
              <a href={site.links.instagram} target="_blank" rel="noreferrer">
                Instagram @moovs.coffee
              </a>
            </li>
            <li>
              <a href={site.links.parent} target="_blank" rel="noreferrer">
                Part of Ruang Saturasa
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap footer__base">
        <p>© 2026 Moovs Coffee, Makassar.</p>
        <p>Photography shown is licensed stand-in imagery from Unsplash, pending the Moovs shoot.</p>
      </div>

      <p className="footer__super" aria-hidden="true">
        <span data-super />
      </p>
    </footer>
  );
}
