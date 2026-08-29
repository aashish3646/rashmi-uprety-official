import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { THEATRE_CREDITS } from "@/data/site";
import theatreOne from "@/assets/Images/theatre-1.jpg";
import theatreTwo from "@/assets/Images/theatre-2.jpg";
import galleryThree from "@/assets/Images/gallery-3.jpg";

const TITLE = "Theatre — Rashmi Uprety";
const DESCRIPTION =
  "Theatre archive of Rashmi Uprety: Pratyansha as Senapati and Malami as lead performer, trained at Kadam Theatre, Damak.";

export const Route = createFileRoute("/theatre")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/theatre" },
    ],
    links: [{ rel: "canonical", href: "/theatre" }],
  }),
  component: Theatre,
});

const STAGE_IMAGES = [theatreOne, theatreTwo];

function Theatre() {
  return (
    <>
      <PageHeader
        eyebrow="Stage"
        title="Theatre"
        intro="My artistic practice is deeply grounded in stage performance. I trained at Kadam Theatre in Damak as part of its first batch, and continue to work in performance, mentoring, and production support."
      />

      <Section space="sm" bleed>
        <Reveal>
          <img
            src={theatreOne}
            alt="Performer lit by a single spotlight on stage"
            width={1600}
            height={1072}
            loading="lazy"
            className="h-[52vh] w-full object-cover md:h-[70vh]"
            style={{ objectPosition: "60% center" }}
          />
        </Reveal>
      </Section>

      <Section space="lg">
        <div className="grid gap-14 md:gap-20">
          {THEATRE_CREDITS.map((credit, i) => (
            <Reveal key={credit.title} className="grid gap-8 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <EditorialImage
                  src={STAGE_IMAGES[i % STAGE_IMAGES.length]!}
                  alt={`Stage photograph from ${credit.title}`}
                  width={1200}
                  height={1500}
                  ratio="4 / 5"
                />
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="meta text-clay">Production {credit.index}</p>
                <h2 className="display-xl mt-5 text-[clamp(2.25rem,6vw,4rem)]">{credit.title}</h2>
                <dl className="mt-10">
                  <div className="flex gap-6 border-t border-rule py-4">
                    <dt className="meta w-28 shrink-0 text-ink-muted">Role</dt>
                    <dd>{credit.role}</dd>
                  </div>
                  <div className="flex gap-6 border-t border-rule py-4">
                    <dt className="meta w-28 shrink-0 text-ink-muted">Association</dt>
                    <dd>{credit.association ?? "—"}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="noir" space="lg">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="meta text-paper/45">Kadam Theatre, Damak</p>
            <h2 className="title-lg mt-6">Trained with the first batch</h2>
            <p className="mt-7 max-w-[44ch] text-paper/70">
              Beyond acting, I contribute actively to props, costume design, set and stage support, as well as mentoring and workshop facilitation with the ensemble.
            </p>
            <ButtonLink to="/gallery" variant="quiet" className="mt-9">
              Stage photography
            </ButtonLink>
          </div>
          <Reveal className="md:col-span-5 md:col-start-8">
            <EditorialImage
              src={galleryThree}
              alt="Study of a classical dance hand gesture"
              width={1200}
              height={1200}
              ratio="1 / 1"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
