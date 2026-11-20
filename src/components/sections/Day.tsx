import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { moves } from "@/lib/site";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

const ticks = [
  { label: "07", at: 0 },
  { label: "10", at: 20 },
  { label: "15", at: 53.33 },
  { label: "19", at: 80 },
  { label: "22", at: 100 },
];

export function Day({ lang }: { lang: Lang }) {
  const t = getCopy(lang).day;
  return (
    <section className="day" id="day" data-day aria-labelledby="day-title">
      <div className="day__pin">
        <div className="day__head wrap">
          <p className="overline">{t.overline}</p>
          <p className="day__clock" aria-hidden="true">
            <span data-day-clock>07:00</span>
            <span className="day__zone">WITA</span>
          </p>
        </div>

        <div className="day__track" data-day-track>
          <header className="day__intro">
            <h2 className="h2" id="day-title" data-split>
              {t.title}
            </h2>
            <p className="lede" data-reveal>
              {t.lede}
            </p>
            <p className="day__hint" aria-hidden="true">
              {t.hint} <Icon name="arrow-right-linear" size={18} />
            </p>
          </header>

          {moves.map((move, index) => {
            const words = t.moves[index];
            return (
              <article key={move.time} className={`move move--${move.phase}`} data-day-panel data-time={move.time}>
                <div className="move__photo" data-day-item>
                  <Photo
                    media={move.photo}
                    lang={lang}
                    ratio="4:5"
                    sizes="(min-width: 960px) 34vw, 100vw"
                    maxWidth={1440}
                    className="move__img"
                  />
                </div>
                <div className="move__text">
                  <p className="move__time" data-day-item>
                    <span className="move__index">
                      {t.moveLabel} {String(index + 1).padStart(2, "0")}
                    </span>
                    <time dateTime={move.time}>{move.time}</time>
                  </p>
                  <h3 className="move__title" data-day-item>
                    {words.title}
                  </h3>
                  <p className="move__body" data-day-item>
                    {words.body}
                  </p>
                  <p className="move__pair" data-day-item>
                    <span className="overline">{t.goesWith}</span>
                    <span className="move__drink">{move.pairing}</span>
                    <span className="move__note">{words.note}</span>
                  </p>
                </div>
              </article>
            );
          })}

          <div className="day__end" data-day-panel data-time="22:00">
            <p className="move__time" data-day-item>
              <span className="move__index">{t.closeLabel}</span>
              <time dateTime="22:00">22:00</time>
            </p>
            <p className="day__end-title" data-day-item>
              {t.endTitle[0]} <br />
              {t.endTitle[1]}
            </p>
            <a className="btn btn--light" href="#menu" data-day-item>
              {t.endCta} <Icon name="arrow-down-linear" size={18} />
            </a>
          </div>
        </div>

        <div className="day__rail wrap" aria-hidden="true">
          <div className="day__line">
            <span className="day__progress" data-day-progress />
            {ticks.map((tick) => (
              <span key={tick.label} className="day__tick" style={{ left: `${tick.at}%` }}>
                {tick.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
