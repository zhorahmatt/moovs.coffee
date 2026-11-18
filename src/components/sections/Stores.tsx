import { media } from "@/lib/media";
import { site } from "@/lib/site";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

export function Stores() {
  return (
    <section className="stores" id="stores" aria-labelledby="stores-title">
      <div className="wrap stores__grid">
        <div className="stores__count">
          <p className="overline" data-reveal>
            Moovstores
          </p>
          <p className="stores__number">
            <span className="sr-only">{site.storeCount} stores and counting</span>
            <span aria-hidden="true" data-count={site.storeCount}>
              {site.storeCount}
            </span>
          </p>
          <p className="stores__label" aria-hidden="true" data-reveal>
            Stores &amp; counting
          </p>
        </div>

        <figure className="stores__figure">
          <Photo media={media.store} ratio="4:5" sizes="(min-width: 960px) 40vw, 100vw" maxWidth={1440} reveal />
          <figcaption className="stores__caption overline">
            <span>Store #21</span>
            <span>Something&rsquo;s a little different.</span>
          </figcaption>
        </figure>

        <div className="stores__body">
          <h2 className="h2" id="stores-title" data-split>
            Not your usual store.
          </h2>
          <p className="lede" data-reveal>
            Black ribbed ceramic, pale wood, warm light. A place to pause, and a place to step forward. The
            twenty-first one opened in August 2026, and the list keeps growing across Makassar.
          </p>
          <ul className="stores__facts" data-reveal>
            <li>
              <Icon name="clock-circle-linear" />
              <span>07:00 to 22:00. Hours can vary by store.</span>
            </li>
            <li>
              <Icon name="qr-code-linear" />
              <span>Pick-up by QR, so it&rsquo;s ready when you pass.</span>
            </li>
            <li>
              <Icon name="map-point-linear" />
              <span>Delivery through GoFood.</span>
            </li>
          </ul>
          <a className="btn btn--light" href="/stores" data-reveal>
            Find a store <Icon name="arrow-right-linear" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
