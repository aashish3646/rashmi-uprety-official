import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/data/site";
import { useCms } from "@/hooks/useCms";

const TITLE = "Showreel & Moving Image — Rashmi Uprety";
const DESCRIPTION =
  "Official video performance reel and screen archives of Nepalese actor Rashmi Uprety.";

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

export function Showreel() {
  const { videos, featuredVideoId } = useCms();
  const embedVideoId = featuredVideoId || SITE.socials.featuredVideoEmbedId;

  return (
    <>
      <PageHeader
        eyebrow="Moving Image"
        title="Showreel &amp; Videos"
        intro="Screen performance reel, featured video captures, and stage recordings."
      />

      {/* DOMINANT CINEMATIC VIDEO PLAYER */}
      <Section space="sm">
        <Reveal>
          <div className="overflow-hidden bg-noir aspect-video w-full rounded-none border border-rule shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${embedVideoId}?autoplay=0&rel=0`}
              title="Rashmi Uprety Featured Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-none"
            />
          </div>
          <div className="mt-4 flex items-center justify-between border-b border-rule pb-4 text-sm">
            <span className="font-serif text-lg text-ink font-light">Featured Reel — Primary Performance</span>
            <a
              href={`https://youtu.be/${embedVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="meta link-underline text-clay hover:text-ink"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ADDITIONAL CMS VIDEOS */}
      {videos.length > 0 && (
        <Section space="lg">
          <div className="border-b border-rule pb-6 mb-8 flex items-center justify-between">
            <p className="meta text-clay">Video Index</p>
            <span className="meta text-ink-muted">{videos.length} Additional Videos</span>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {videos.map((vid, i) => (
              <Reveal key={vid.id} delay={i * 80}>
                <div className="bg-paper-dim border border-rule p-4">
                  <div className="aspect-video w-full overflow-hidden bg-noir">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?rel=0`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-none"
                    />
                  </div>
                  <h3 className="heading-md text-ink mt-4">{vid.title}</h3>
                  {vid.description && <p className="text-ink-soft text-sm mt-1">{vid.description}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* CASTING INQUIRY */}
      <Section tone="noir" space="md">
        <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between">
          <div>
            <p className="meta text-paper/40">Direct Booking</p>
            <h2 className="title-lg text-paper mt-2">Request full audition tapes or screen reels</h2>
          </div>
          <ButtonLink to="/contact" variant="quiet">
            Send Enquiry →
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
