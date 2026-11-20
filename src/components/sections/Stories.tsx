import { getCopy } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { site, storyPhotos } from "@/lib/site";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

export function Stories({ lang }: { lang: Lang }) {
  const t = getCopy(lang).stories;
  return (
    <section className="stories" id="stories" aria-labelledby="stories-title">
      <div className="wrap stories__head">
        <div>
          <p className="overline" data-reveal>
            {t.overline}
          </p>
          <h2 className="h2" id="stories-title" data-split>
            {t.title}
          </h2>
        </div>
        <a className="link" href={site.links.instagram} target="_blank" rel="noreferrer" data-reveal>
          {t.link} <Icon name="arrow-right-up-linear" size={18} />
        </a>
      </div>

      <div className="stories__scroller">
        <ul className="stories__grid wrap">
          {t.items.map((story, index) => (
            <li key={story.title} className={`story${index === 0 ? " story--lead" : ""}`} data-reveal>
              <article>
                <div className="story__media">
                  <Photo
                    media={storyPhotos[index]}
                    lang={lang}
                    ratio="4:5"
                    sizes={index === 0 ? "(min-width: 960px) 46vw, 78vw" : "(min-width: 960px) 22vw, 78vw"}
                    maxWidth={1440}
                  />
                  <span className="story__tag">{story.tag}</span>
                </div>
                <p className="overline story__date">{story.date}</p>
                <h3 className="story__title">{story.title}</h3>
                <p className="story__body">{story.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
