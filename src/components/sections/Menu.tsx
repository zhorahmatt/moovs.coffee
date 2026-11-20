import type { Lang } from "@/lib/i18n";
import { Icon } from "../Icon";
import { MenuTabs } from "../MenuTabs";

export function Menu({ lang }: { lang: Lang }) {
  return (
    <section className="menu" id="menu" aria-label="Menu">
      <MenuTabs lang={lang} arrow={<Icon name="arrow-right-up-linear" size={18} />} />
      {/* Without JavaScript the tabs cannot switch, so show every list. */}
      <noscript>
        <style>{`.menu__panel[hidden]{display:block!important}.menu__tabs{display:none!important}.menu__panel-title{position:static!important;width:auto!important;height:auto!important;clip-path:none!important;margin:48px 0 8px!important;font-size:1.5rem}`}</style>
      </noscript>
    </section>
  );
}
