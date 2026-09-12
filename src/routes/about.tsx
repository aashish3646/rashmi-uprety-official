import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { TRAINING, PRACTICE, CRAFT_SUPPORT, SITE } from "@/data/site";
import { useCms } from "@/hooks/useCms";
import portraitImage from "@/assets/Images/main-photo.webp";
import theatreTwo from "@/assets/Images/IMG_0564.webp";

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
  const { bio } = useCms();
  const paragraphs = typeof bio === "string" 
    ? bio.split("\n").filter((p) => p.trim() !== "") 
    : bio;

  return (
    <>
      <PageHeader
        eyebrow="Biography &amp; Background"
        title="Rashmi Uprety"
        intro="Nepalese actor, stage artist, screen performer and cultural practitioner based in Damak, Nepal."
      />

      {/* EDITORIAL HERO IMAGE PLATE */}
      <Section space="sm">
        <Reveal>
          <EditorialImage
            src={portraitImage}
            alt="Editorial portrait of Rashmi Uprety"
            width={1600}
            height={1000}
            ratio="21 / 9"
            position="50% 22%"
            zoom={false}
          />
        </Reveal>
      </Section>

      {/* BIOGRAPHY SECTION */}
      <Section space="lg" rule>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="meta text-clay">Biography</p>
          </div>
          <Reveal className="md:col-span-9 lg:col-span-8">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.25] font-light text-ink"
                    : "mt-6 text-ink-soft leading-relaxed text-base md:text-lg"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* TRAINING & ACADEMICS */}
      <Section tone="dim" space="lg">
        <div className="grid gap-12 md:grid-cols-12 items-center">
          <div className="md:col-span-6">
            <p className="meta text-clay">Education &amp; Training</p>
            <h2 className="title-lg text-ink mt-3">Foundations in craft and business</h2>
            <dl className="mt-8 border-b border-rule">
              {TRAINING.map((item) => (
                <div key={item.title} className="border-t border-rule py-6">
                  <dt className="heading-md text-ink">{item.title}</dt>
                  <dd className="mt-2 text-ink-soft text-sm md:text-base">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal className="md:col-span-6">
            <EditorialImage
              src={theatreTwo}
              alt="Rashmi Uprety stage rehearsal"
              width={1200}
              height={1500}
              ratio="3 / 4"
            />
          </Reveal>
        </div>
      </Section>

      {/* ARTISTIC PRACTICE & STAGE CRAFT */}
      <Section space="lg">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="meta text-clay">Artistic Practice</p>
            <h2 className="title-lg text-ink mt-3">Core Performance Skills</h2>
            <ul className="mt-8 border-b border-rule">
              {PRACTICE.map((skill, i) => (
                <li key={skill} className="border-t border-rule py-4 flex items-center justify-between">
                  <span className="text-ink font-light">{skill}</span>
                  <span className="meta text-ink-muted">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6">
            <p className="meta text-clay">Production &amp; Stage Craft</p>
            <h2 className="title-lg text-ink mt-3">Theatre Support &amp; Leadership</h2>
            <ul className="mt-8 border-b border-rule">
              {CRAFT_SUPPORT.map((skill, i) => (
                <li key={skill} className="border-t border-rule py-4 flex items-center justify-between">
                  <span className="text-ink font-light">{skill}</span>
                  <span className="meta text-ink-muted">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA SECTION */}
      <Section tone="noir" space="md">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="meta text-paper/40">Collaborations &amp; Casting</p>
            <h2 className="title-lg text-paper mt-3 max-w-[24ch]">Available for theatre, film and television productions</h2>
          </div>
          <ButtonLink to="/contact" variant="quiet">
            Start a Conversation →
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
