import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { THEATRE_CREDITS } from "@/data/site";
import theatreOne from "@/assets/Images/IMG_0534.webp";
import theatreTwo from "@/assets/Images/IMG_0564.webp";
import galleryThree from "@/assets/Images/PMB03283.webp";

const TITLE = "Theatre Archive — Rashmi Uprety";
const DESCRIPTION =
  "Stage productions, performances, and theatre credits of Nepalese actor Rashmi Uprety, trained with Kadam Theatre, Damak.";

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

export function Theatre() {
  return (
    <>
      <PageHeader
        eyebrow="Stage Archive"
        title="Theatre Productions"
        intro="Performance history and character work developed on stage with Kadam Theatre, Damak."
      />

      {/* KADAM THEATRE HIGHLIGHT BANNER */}
      <Section space="sm">
        <div className="bg-paper-dim border border-rule p-8 md:p-12 grid gap-6 md:grid-cols-12 items-center">
          <div className="md:col-span-8">
            <p className="meta text-clay">Institutional Background</p>
            <h2 className="title-lg text-ink mt-2">Kadam Theatre — Pioneer First Batch</h2>
            <p className="mt-4 text-ink-soft text-base md:text-lg leading-relaxed max-w-[55ch]">
              Trained in Damak, Nepal as part of the initial pioneer batch of performers at Kadam Theatre. Stage training includes dialogue delivery, physical presence, costume management, and character development.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="meta text-ink-muted block">Location</span>
            <span className="font-serif text-xl text-ink">Damak, Jhapa, Nepal</span>
          </div>
        </div>
      </Section>

      {/* STAGE PRODUCTIONS ARCHIVE */}
      <Section space="lg">
        <div className="border-b border-rule pb-6 mb-12 flex items-center justify-between">
          <p className="meta text-clay">Production Index</p>
          <span className="meta text-ink-muted">02 Major Stage Plays Listed</span>
        </div>

        <div className="flex flex-col gap-20">
          {THEATRE_CREDITS.map((credit, i) => (
            <Reveal key={credit.title} delay={i * 100}>
              <article className="grid gap-8 md:grid-cols-12 items-center">
                <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                  <EditorialImage
                    src={i === 0 ? theatreOne : theatreTwo}
                    alt={`Stage production capture for ${credit.title}`}
                    width={1600}
                    height={1000}
                    ratio="16 / 10"
                  />
                </div>

                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                  <div className="flex items-center gap-3">
                    <span className="meta text-clay">0{i + 1}</span>
                    <span className="h-px flex-1 bg-rule" />
                    <span className="meta text-ink-muted">{credit.discipline}</span>
                  </div>

                  <h3 className="display-xl text-ink mt-4">{credit.title}</h3>

                  <dl className="mt-6 border-t border-b border-rule divide-y divide-rule">
                    <div className="py-3.5 flex items-center justify-between">
                      <dt className="meta text-ink-muted">Role Performed</dt>
                      <dd className="font-serif text-lg text-ink font-light">{credit.role}</dd>
                    </div>
                    {credit.association && (
                      <div className="py-3.5 flex items-center justify-between">
                        <dt className="meta text-ink-muted">Festival / Venue</dt>
                        <dd className="text-sm text-ink-soft">{credit.association}</dd>
                      </div>
                    )}
                    <div className="py-3.5 flex items-center justify-between">
                      <dt className="meta text-ink-muted">Theatre Group</dt>
                      <dd className="text-sm text-ink-soft">Kadam Theatre</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="noir" space="lg">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8 items-center">
          <div className="md:col-span-6">
            <p className="meta text-paper/45">Theatre &amp; Craft Support</p>
            <h2 className="title-lg text-paper mt-4">Stage Production &amp; Mentoring</h2>
            <p className="mt-6 max-w-[44ch] text-paper/70 leading-relaxed font-light">
              Beyond acting, I contribute actively to props, costume design, set and stage support, as well as mentoring and workshop facilitation with the ensemble.
            </p>
            <ButtonLink to="/contact" variant="quiet" className="mt-8">
              Stage Inquiries →
            </ButtonLink>
          </div>
          <Reveal className="md:col-span-5 md:col-start-8">
            <EditorialImage
              src={galleryThree}
              alt="Study of performance gesture"
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
