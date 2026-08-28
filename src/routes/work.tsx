import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { THEATRE_CREDITS } from "@/data/site";
import theatreOne from "@/assets/theatre-1.jpg";
import theatreTwo from "@/assets/theatre-2.jpg";

const TITLE = "Work — Rashmi Uprety";
const DESCRIPTION =
  "Selected performance credits of Rashmi Uprety, including theatre productions Pratyansha and Malami.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: Work,
});

const IMAGES = [theatreOne, theatreTwo];

function Work() {
  return (
    <>
      <PageHeader
        eyebrow="Archive"
        title="Selected work"
        intro="A performance archive of my verified stage roles. My screen credits are currently being compiled and will be added as they are confirmed."
      />

      <Section space="md">
        <ol>
          {THEATRE_CREDITS.map((credit, i) => (
            <Reveal as="li" key={credit.title} className="block border-t border-rule py-10 md:py-14">
              <div className="grid gap-8 md:grid-cols-12 md:gap-8">
                <p className="meta text-clay md:col-span-1">{credit.index}</p>
                <div className="md:col-span-5 lg:col-span-4">
                  <h2 className="title-lg">{credit.title}</h2>
                  <dl className="mt-8 text-sm">
                    <div className="flex gap-6 border-t border-rule py-3">
                      <dt className="meta w-24 shrink-0 text-ink-muted">Type</dt>
                      <dd>{credit.discipline}</dd>
                    </div>
                    <div className="flex gap-6 border-t border-rule py-3">
                      <dt className="meta w-24 shrink-0 text-ink-muted">Role</dt>
                      <dd>{credit.role}</dd>
                    </div>
                    <div className="flex gap-6 border-t border-rule py-3">
                      <dt className="meta w-24 shrink-0 text-ink-muted">Assoc.</dt>
                      <dd>{credit.association ?? "—"}</dd>
                    </div>
                  </dl>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <EditorialImage
                    src={IMAGES[i % IMAGES.length]!}
                    alt={`Photograph from the production ${credit.title}`}
                    width={1200}
                    height={1500}
                    ratio={i % 2 === 0 ? "3 / 2" : "4 / 5"}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="dim" space="md">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="meta text-clay md:col-span-3">Film &amp; screen</p>
          <div className="md:col-span-9 lg:col-span-7">
            <h2 className="title-lg">Screen credits coming soon</h2>
            <p className="lede mt-6">
              My upcoming film and screen projects will be listed here as official release details are announced.
            </p>
            <ButtonLink to="/contact" variant="outline" className="mt-9">
              Request current portfolio / CV
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
