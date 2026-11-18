import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderBand } from "@/components/OrderBand";
import { PageHead } from "@/components/PageHead";
import { StoreLocator } from "@/components/StoreLocator";
import { Footer } from "@/components/sections/Closing";
import { site, stores } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stores. Moovs Coffee, Makassar.",
  description: "Twenty-one Moovs Coffee stores across Makassar, open 07:00 to 22:00.",
};

const numbers = Array.from({ length: site.storeCount }, (_, index) => index + 1);
const listed = new Set(stores.map((store) => store.number));

export default function StoresPage() {
  return (
    <>
      <Nav arrow={<Icon name="arrow-right-up-linear" size={16} />} />
      <main id="main">
        <PageHead
          surface="ribbed"
          overline="Moovstores"
          title="Twenty-one doors, and counting."
          lede="Across Makassar, open 07:00 to 22:00. Hours can vary by store, so check yours before you head out."
        >
          <OpenStatus showClock />
        </PageHead>

        <section className="sindex" aria-labelledby="sindex-title">
          <div className="wrap sindex__grid">
            <div className="sindex__intro">
              <h2 className="overline" id="sindex-title" data-reveal>
                The index
              </h2>
              <p className="sindex__lede" data-reveal>
                Every number is a store. #21 is the newest, open since August 2026.
              </p>
            </div>
            <ol className="sindex__list">
              {numbers.map((n) => {
                const label = String(n).padStart(2, "0");
                const newest = n === site.storeCount;
                return (
                  <li key={n} className={newest ? "is-newest" : undefined} data-reveal>
                    {listed.has(n) ? <a href={`#store-${n}`}>{label}</a> : <span>{label}</span>}
                    {newest ? <span className="sindex__tag">Newest</span> : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="locator-section" id="locator" aria-label="Store list">
          <StoreLocator
            arrow={<Icon name="arrow-right-linear" size={18} />}
            arrowOut={<Icon name="arrow-right-up-linear" size={16} />}
          />
        </section>

        <OrderBand title="Know your store? Order ahead.">
          <a className="link" href="/menu">
            See the menu <Icon name="arrow-right-linear" size={18} />
          </a>
        </OrderBand>
      </main>
      <Footer />
      <Motion />
    </>
  );
}
