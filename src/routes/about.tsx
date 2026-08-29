import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { BIO, CRAFT_SUPPORT, PRACTICE, TRAINING } from "@/data/site";
import portraitImage from "@/assets/Images/portrait.jpg";
import theatreTwo from "@/assets/Images/theatre-2.jpg";

const TITLE = "About — Rashmi Uprety, Nepalese Actor & Theatre Artist";
const DESCRIPTION =
  "Biography, training and artistic practice of Rashmi Uprety, a Nepalese actor and theatre artist associated with Kadam Theatre, Damak.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="A performer of stage and screen"
        intro="Nepalese actor, theatre artist, screen performer and cultural practitioner."
      />

      <Section space="sm">
        <Reveal>
          <EditorialImage
            src={portraitImage}
            alt="Portrait of Rashmi Uprety"
            width={1200}
            height={1500}
            ratio="16 / 9"
            position="50% 22%"
            zoom={false}
          />
        </Reveal>
      </Section>

      <Section space="lg">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <p className="meta text-clay md:col-span-3">Biography</p>
          <Reveal className="md:col-span-9 lg:col-span-7">
            {BIO.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.28] font-light"
                    : "mt-6 text-ink-soft"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="dim" space="lg">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="meta text-clay">Training &amp; background</p>
            <dl className="mt-8">
              {TRAINING.map((item) => (
                <div key={item.title} className="border-t border-rule py-6">
                  <dt className="heading-md">{item.title}</dt>
                  <dd className="mt-2 text-ink-soft">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal className="md:col-span-6">
            <EditorialImage
              src={theatreTwo}
              alt="Rehearsal on stage"
              width={1200}
              height={1500}
              ratio="3 / 4"
            />
          </Reveal>
        </div>
      </Section>

      <Section space="lg">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="meta text-clay">Artistic practice</p>
            <ul className="mt-8">
              {PRACTICE.map((skill) => (
                <li key={skill} className="border-t border-rule py-4">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <p className="meta text-clay">Theatre &amp; production support</p>
            <ul className="mt-8">
              {CRAFT_SUPPORT.map((skill) => (
                <li key={skill} className="border-t border-rule py-4">
                  {skill}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-ink-muted">
              Full screen credits, festival appearances, and awards will be updated here as they are published.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="noir" space="md">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="title-lg max-w-[24ch]">Available for theatre, film and television projects</h2>
          <ButtonLink to="/contact" variant="quiet">
            Send enquiry
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
