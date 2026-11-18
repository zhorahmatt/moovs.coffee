import { media } from "@/lib/media";
import { Photo } from "../Photo";

const manifesto =
  "Moovs means to move. Not the big leaps. The small ones. Out the door at seven. Across campus by ten. One more hour when the light goes gold. We don't make the move for you. We just keep you company.";

const facts = [
  { value: "21", label: "Stores, and counting" },
  { value: "07:00", label: "First cup of the day" },
  { value: "22:00", label: "Last one before close" },
  { value: "Rp13K", label: "Where the menu starts" },
];

export function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <div className="wrap manifesto__grid">
        <div className="manifesto__aside">
          <h2 className="overline" id="manifesto-title" data-reveal>
            Why &ldquo;moovs&rdquo;
          </h2>
          <figure className="manifesto__figure" data-reveal>
            <Photo media={media.steam} ratio="3:4" sizes="(min-width: 960px) 18vw, 40vw" maxWidth={768} parallax />
            <figcaption className="caption">In motion since morning.</figcaption>
          </figure>
        </div>

        <div className="manifesto__main">
          {/* One accessible copy for assistive tech, one decorative copy for the scrubbed word reveal. */}
          <p className="sr-only">{manifesto}</p>
          <p className="manifesto__text" aria-hidden="true" data-scrub-words>
            {manifesto}
          </p>
        </div>
      </div>

      <dl className="wrap facts">
        {facts.map((fact) => (
          <div key={fact.label} className="facts__item" data-reveal>
            <dt className="facts__label">{fact.label}</dt>
            <dd className="facts__value">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
