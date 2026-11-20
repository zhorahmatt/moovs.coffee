import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { media } from "@/lib/media";
import { Photo } from "../Photo";

export function Manifesto({ lang }: { lang: Lang }) {
  const t = getCopy(lang).manifesto;
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <div className="wrap manifesto__grid">
        <div className="manifesto__aside">
          <h2 className="overline" id="manifesto-title" data-reveal>
            {t.label}
          </h2>
          <figure className="manifesto__figure" data-reveal>
            <Photo media={media.steam} lang={lang} ratio="3:4" sizes="(min-width: 960px) 18vw, 40vw" maxWidth={768} parallax />
            <figcaption className="caption">{t.caption}</figcaption>
          </figure>
        </div>

        <div className="manifesto__main">
          {/* One accessible copy for assistive tech, one decorative copy for the scrubbed word reveal. */}
          <p className="sr-only">{t.text}</p>
          <p className="manifesto__text" aria-hidden="true" data-scrub-words>
            {t.text}
          </p>
        </div>
      </div>

      <dl className="wrap facts">
        {t.facts.map((fact) => (
          <div key={fact.label} className="facts__item" data-reveal>
            <dt className="facts__label">{fact.label}</dt>
            <dd className="facts__value">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
