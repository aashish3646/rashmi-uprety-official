import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import galleryFour from "@/assets/gallery-4.jpg";

const TITLE = "Showreel — Rashmi Uprety";
const DESCRIPTION =
  "The showreel of Nepalese actor and theatre artist Rashmi Uprety is in preparation. Scenes are available on request.";

export const Route = createFileRoute("/showreel")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/showreel" },
    ],
    links: [{ rel: "canonical", href: "/showreel" }],
  }),
  component: Showreel,
});

function Showreel() {
  return (
    <>
      <PageHeader eyebrow="Moving image" title="Showreel" />

      <Section tone="noir" space="lg">
        <Reveal className="relative overflow-hidden">
          <img
            src={galleryFour}
            alt="Backstage portrait in warm dressing-room light"
            width={1200}
            height={1504}
            loading="lazy"
            className="h-[58vw] max-h-[620px] min-h-[320px] w-full object-cover opacity-45"
            style={{ objectPosition: "50% 30%" }}
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="meta text-paper/70">Reel</p>
            <p className="font-display text-[clamp(2rem,6vw,4rem)] leading-none font-light text-paper">
              In Preparation
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="lede text-paper/70">
              My showreel is currently being edited. In the meantime, I am happy to share scene excerpts and self-tapes directly upon request.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="meta text-paper/45">Available on request</p>
            <ul className="mt-6 text-paper/75">
              <li className="border-t border-paper/12 py-3">Selected scene excerpts</li>
              <li className="border-t border-paper/12 py-3">Self-tapes for casting calls</li>
              <li className="border-t border-paper/12 py-3">Stage recordings</li>
            </ul>
            <ButtonLink to="/contact" variant="quiet" className="mt-8">
              Request footage
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
