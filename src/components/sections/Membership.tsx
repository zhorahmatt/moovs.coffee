import { media } from "@/lib/media";
import { membershipSteps, site } from "@/lib/site";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { Symbol } from "../Wordmark";

export function Membership() {
  return (
    <section className="member" id="membership" aria-labelledby="member-title">
      <Symbol className="member__mark" />
      <div className="wrap member__grid">
        <div className="member__intro">
          <p className="overline" data-reveal>
            Membership
          </p>
          <h2 className="h2" id="member-title" data-split>
            Come back often. It adds up.
          </h2>
          <p className="lede" data-reveal>
            If Moovs is already part of your week, let the week give something back. Points and vouchers run through
            ESB Order.
          </p>
          <a className="btn btn--ink" href={site.links.order} target="_blank" rel="noreferrer" data-reveal>
            Start collecting <Icon name="arrow-right-up-linear" size={18} />
          </a>
        </div>

        <ol className="member__steps">
          {membershipSteps.map((step) => (
            <li key={step.n} className="member__step" data-reveal>
              <span className="member__n" aria-hidden="true">
                {step.n}
              </span>
              <h3 className="member__step-title">{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="member__visual">
          <Photo media={media.cupInHand} ratio="4:5" sizes="(min-width: 960px) 30vw, 80vw" maxWidth={1080} reveal />
          <aside className="sticker" aria-label="How Pick Up Order works" data-reveal>
            <Icon name="qr-code-linear" size={44} className="sticker__icon" />
            <p className="sticker__title">Pick Up Order</p>
            <p lang="id">Arahkan handphone untuk scan QR.</p>
            <p className="sticker__en">Point your phone at the QR to order ahead.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
