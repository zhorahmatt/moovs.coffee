import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { media } from "@/lib/media";
import { site } from "@/lib/site";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { Symbol } from "../Wordmark";

export function Membership({ lang }: { lang: Lang }) {
  const t = getCopy(lang).member;
  return (
    <section className="member" id="membership" aria-labelledby="member-title">
      <Symbol className="member__mark" />
      <div className="wrap member__grid">
        <div className="member__intro">
          <p className="overline" data-reveal>
            {t.overline}
          </p>
          <h2 className="h2" id="member-title" data-split>
            {t.title}
          </h2>
          <p className="lede" data-reveal>
            {t.lede}
          </p>
          <a className="btn btn--ink" href={site.links.order} target="_blank" rel="noreferrer" data-reveal>
            {t.cta} <Icon name="arrow-right-up-linear" size={18} />
          </a>
        </div>

        <ol className="member__steps">
          {t.steps.map((step, index) => (
            <li key={step.title} className="member__step" data-reveal>
              <span className="member__n" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="member__step-title">{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="member__visual">
          <Photo media={media.cupInHand} lang={lang} ratio="4:5" sizes="(min-width: 960px) 30vw, 80vw" maxWidth={1080} reveal />
          <aside className="sticker" aria-label={t.sticker.label} data-reveal>
            <Icon name="qr-code-linear" size={44} className="sticker__icon" />
            <p className="sticker__title">{t.sticker.title}</p>
            <p lang="id">{t.sticker.instruction}</p>
            <p className="sticker__en">{t.sticker.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
