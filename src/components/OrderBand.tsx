import type { ReactNode } from "react";
import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { Symbol } from "./Wordmark";

/** Closing call to action for inner pages. */
export function OrderBand({ lang, title, children }: { lang: Lang; title: string; children?: ReactNode }) {
  const copy = getCopy(lang);
  return (
    <section className="band" aria-labelledby="band-title">
      <Symbol className="band__mark" />
      <div className="wrap band__grid">
        <h2 className="h2" id="band-title" data-split>
          {title}
        </h2>
        <div className="band__side" data-reveal>
          <p className="lede">{copy.band.lede}</p>
          <div className="band__actions">
            <a className="btn btn--ink" href={site.links.order} target="_blank" rel="noreferrer">
              {copy.common.orderPickup} <Icon name="arrow-right-up-linear" size={18} />
            </a>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
