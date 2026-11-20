import { Icon } from "@/components/Icon";
import { MenuBrowser } from "@/components/MenuBrowser";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { OrderBand } from "@/components/OrderBand";
import { PageHead } from "@/components/PageHead";
import { Footer } from "@/components/sections/Closing";
import { getCopy } from "@/lib/copy";
import { href, type Lang } from "@/lib/i18n";
import { menu, rupiah } from "@/lib/site";

const itemCount = menu.reduce((total, category) => total + category.items.length, 0);
const drinksFrom = Math.min(...menu.filter((category) => category.id !== "food").map((category) => category.priceFrom));

export function MenuView({ lang }: { lang: Lang }) {
  const t = getCopy(lang).menuPage;
  return (
    <>
      <Nav lang={lang} arrow={<Icon name="arrow-right-up-linear" size={16} />} />
      <main id="main">
        {/* The title riffs on the brand tagline, so it stays English in every language. */}
        <PageHead overline={t.overline} title={t.title} titleLang="en" lede={t.lede}>
          <dl className="pagehead__facts">
            <div>
              <dt>{t.facts.lists}</dt>
              <dd>{String(menu.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>{t.facts.items}</dt>
              <dd>{itemCount}</dd>
            </div>
            <div>
              <dt>{t.facts.from}</dt>
              <dd>{rupiah(drinksFrom)}</dd>
            </div>
          </dl>
        </PageHead>

        <MenuBrowser lang={lang} />

        <OrderBand lang={lang} title={t.bandTitle}>
          <a className="link" href={href(lang, "/stores")}>
            {t.findStore} <Icon name="arrow-right-linear" size={18} />
          </a>
        </OrderBand>
      </main>
      <Footer lang={lang} />
      <Motion />
    </>
  );
}
