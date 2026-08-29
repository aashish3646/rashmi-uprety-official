import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { useCms } from "@/hooks/useCms";

const TITLE = "Showreel & Performances — Rashmi Uprety";
const DESCRIPTION =
  "Featured screen performances and video reel of Nepalese actor and theatre artist Rashmi Uprety.";

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
  const { featuredVideoEmbedId, instagram, tiktok, youtube, videos } = useCms();

  return (
    <>
      <PageHeader
        eyebrow="Moving image"
        title="Featured Performance & Reel"
        intro="Watch my featured screen performance and explore my latest work."
      />

      <Section tone="noir" space="lg">
        {/* Featured Embedded YouTube Video Player */}
        <Reveal className="relative overflow-hidden rounded-sm bg-black/40">
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${featuredVideoEmbedId}`}
              title="Rashmi Uprety - Featured Performance"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="meta text-paper/45">Featured Video</p>
            <h2 className="title-lg mt-4 text-paper">Screen &amp; Performance Work</h2>
            <p className="lede mt-6 text-paper/70">
              Above is one of my recent featured performances. Additional video clips, scene excerpts, and self-tapes are available below and upon request.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://www.youtube.com/watch?v=${featuredVideoEmbedId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="meta link-underline inline-flex min-h-[44px] items-center text-paper hover:text-paper/80"
              >
                Watch on YouTube ↗
              </a>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="meta link-underline inline-flex min-h-[44px] items-center text-paper/70 hover:text-paper"
              >
                Visit Official Channel ↗
              </a>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="meta text-paper/45">Social &amp; Channels</p>
            <ul className="mt-6 text-paper/75">
              <li className="border-t border-paper/12 py-3">
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper/80 hover:text-paper"
                >
                  Instagram @rashmi_uprety ↗
                </a>
              </li>
              <li className="border-t border-paper/12 py-3">
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper/80 hover:text-paper"
                >
                  TikTok @rashmiuprety ↗
                </a>
              </li>
              <li className="border-t border-paper/12 py-3">
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper/80 hover:text-paper"
                >
                  YouTube Channel ↗
                </a>
              </li>
            </ul>
            <ButtonLink to="/contact" variant="quiet" className="mt-8">
              Request Full Showreel / Footage
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Additional Videos List */}
      {videos.length > 0 && (
        <Section space="lg">
          <div className="border-b border-rule pb-6">
            <p className="meta text-clay">Performance Archive</p>
            <h2 className="heading-lg mt-2">Additional Video Excerpts</h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((vid) => (
              <Reveal key={vid.id} className="group flex flex-col">
                <div className="relative aspect-video overflow-hidden rounded-sm bg-black/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.youtubeId}`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
                <h3 className="heading-md mt-4 text-ink">{vid.title}</h3>
                {vid.description && (
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{vid.description}</p>
                )}
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
