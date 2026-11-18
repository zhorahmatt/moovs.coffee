import type { ReactNode } from "react";
import { Symbol } from "./Wordmark";

type Props = {
  overline: string;
  title: string;
  lede: string;
  /** "ribbed" borrows the black ceramic surface of the stores. */
  surface?: "ink" | "ribbed";
  children?: ReactNode;
};

/** Opening block for inner pages: dark, so the navigation reads the same as on the home hero. */
export function PageHead({ overline, title, lede, surface = "ink", children }: Props) {
  return (
    <header className={`pagehead pagehead--${surface}`}>
      <Symbol className="pagehead__mark" />
      <div className="wrap pagehead__grid">
        <div className="pagehead__main">
          <p className="overline" data-reveal>
            {overline}
          </p>
          <h1 className="pagehead__title" data-split>
            {title}
          </h1>
          <p className="lede" data-reveal>
            {lede}
          </p>
        </div>
        {children ? (
          <div className="pagehead__aside" data-reveal>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
