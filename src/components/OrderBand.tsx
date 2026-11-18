import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { Symbol } from "./Wordmark";

/** Closing call to action for inner pages. */
export function OrderBand({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="band" aria-labelledby="band-title">
      <Symbol className="band__mark" />
      <div className="wrap band__grid">
        <h2 className="h2" id="band-title" data-split>
          {title}
        </h2>
        <div className="band__side" data-reveal>
          <p className="lede">
            Scan the Pick Up Order QR at any store, or order ahead and walk straight to the counter.
          </p>
          <div className="band__actions">
            <a className="btn btn--ink" href={site.links.order} target="_blank" rel="noreferrer">
              Order for pick-up <Icon name="arrow-right-up-linear" size={18} />
            </a>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
