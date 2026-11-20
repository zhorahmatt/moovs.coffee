import { Icon } from "@/components/Icon";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderBand } from "@/components/OrderBand";
import { PageHead } from "@/components/PageHead";
import { StoreLocator } from "@/components/StoreLocator";
import { Footer } from "@/components/sections/Closing";
import { getCopy } from "@/lib/copy";
import { href, type Lang } from "@/lib/i18n";
import { site, stores } from "@/lib/site";

const numbers = Array.from({ length: site.storeCount }, (_, index) => index + 1);
const listed = new Set(stores.map((store) => store.number));

export function StoresView({ lang }: { lang: Lang }) {
  const t = getCopy(lang).storesPage;
  return (
    <>
      <Nav lang={lang} arrow={<Icon name="arrow-right-up-linear" size={16} />} />
      <main id="main">
        <PageHead surface="ribbed" overline={t.overline} title={t.title} lede={t.lede}>
          <OpenStatus lang={lang} showClock />
        </PageHead>

        <section className="sindex" aria-labelledby="sindex-title">
          <div className="wrap sindex__grid">
            <div className="sindex__intro">
              <h2 className="overline" id="sindex-title" data-reveal>
                {t.indexLabel}
              </h2>
              <p className="sindex__lede" data-reveal>
                {t.indexLede}
              </p>
            </div>
            <ol className="sindex__list">
              {numbers.map((n) => {
                const label = String(n).padStart(2, "0");
                const newest = n === site.storeCount;
                return (
                  <li key={n} className={newest ? "is-newest" : undefined} data-reveal>
                    {listed.has(n) ? <a href={`#store-${n}`}>{label}</a> : <span>{label}</span>}
                    {newest ? <span className="sindex__tag">{t.newest}</span> : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="locator-section" id="locator" aria-label={t.listLabel}>
          <StoreLocator
            lang={lang}
            arrow={<Icon name="arrow-right-linear" size={18} />}
            arrowOut={<Icon name="arrow-right-up-linear" size={16} />}
          />
        </section>

        <OrderBand lang={lang} title={t.bandTitle}>
          <a className="link" href={href(lang, "/menu")}>
            {t.seeMenu} <Icon name="arrow-right-linear" size={18} />
          </a>
        </OrderBand>
      </main>
      <Footer lang={lang} />
      <Motion />
    </>
  );
}
