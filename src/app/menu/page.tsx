import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { MenuBrowser } from "@/components/MenuBrowser";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { OrderBand } from "@/components/OrderBand";
import { PageHead } from "@/components/PageHead";
import { Footer } from "@/components/sections/Closing";
import { menu, rupiah } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu. Moovs Coffee, Makassar.",
  description:
    "Coffee, tea, fresh milktea, matcha, non-coffee and small bites at Moovs Coffee, with the price range for every list.",
};

const itemCount = menu.reduce((total, category) => total + category.items.length, 0);
const drinksFrom = Math.min(...menu.filter((category) => category.id !== "food").map((category) => category.priceFrom));

export default function MenuPage() {
  return (
    <>
      <Nav arrow={<Icon name="arrow-right-up-linear" size={16} />} />
      <main id="main">
        <PageHead
          overline="The menu"
          title="Pick your next move."
          lede="Coffee, tea, fresh milktea, matcha, and a few small things to eat. Two cup sizes run through the menu: Small at 12 oz and Large at 22 oz."
        >
          <dl className="pagehead__facts">
            <div>
              <dt>Lists</dt>
              <dd>{String(menu.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>On the menu</dt>
              <dd>{itemCount}</dd>
            </div>
            <div>
              <dt>Drinks from</dt>
              <dd>{rupiah(drinksFrom)}</dd>
            </div>
          </dl>
        </PageHead>

        <MenuBrowser />

        <OrderBand title="Order ahead. It's ready when you pass.">
          <a className="link" href="/stores">
            Find a store <Icon name="arrow-right-linear" size={18} />
          </a>
        </OrderBand>
      </main>
      <Footer />
      <Motion />
    </>
  );
}
