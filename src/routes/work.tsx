import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/EditorialButton";
import { SCREEN_CREDITS, THEATRE_CREDITS } from "@/data/site";

const TITLE = "Performance & Work Index — Rashmi Uprety";
const DESCRIPTION =
  "Complete performance index across screen and stage for Nepalese actor and theatre artist Rashmi Uprety.";

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

export function Work() {
  const allCredits = [
    ...SCREEN_CREDITS.map((c) => ({ ...c, type: "Screen / Reel" })),
    ...THEATRE_CREDITS.map((c) => ({ ...c, type: "Theatre Play" })),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Work &amp; Credits Index"
        title="Performance Archive"
        intro="Selected performance credits across screen, stage, and short form media."
      />

      {/* EDITORIAL INDEX TABLE */}
      <Section space="lg">
        <div className="border-b border-rule pb-6 mb-8 flex items-center justify-between">
          <p className="meta text-clay">Credit Directory</p>
          <span className="meta text-ink-muted">Casting &amp; Production Index</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-rule meta text-ink-muted">
                <th className="py-4 font-normal w-16">No.</th>
                <th className="py-4 font-normal">Title / Production</th>
                <th className="py-4 font-normal">Role</th>
                <th className="py-4 font-normal">Medium</th>
                <th className="py-4 font-normal">Association / Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule font-light">
              {allCredits.map((item, i) => (
                <tr key={item.title + i} className="group hover:bg-paper-dim/50 transition-colors">
                  <td className="py-5 meta text-clay">0{i + 1}</td>
                  <td className="py-5 font-serif text-xl text-ink font-light group-hover:text-clay transition-colors">
                    {item.title}
                  </td>
                  <td className="py-5 text-ink-soft text-sm md:text-base">{item.role}</td>
                  <td className="py-5 meta text-ink-muted">{item.type}</td>
                  <td className="py-5 text-sm">
                    {item.videoUrl ? (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-clay hover:text-ink font-medium"
                      >
                        Watch Video ↗
                      </a>
                    ) : (
                      <span className="text-ink-soft">{item.association || "Kadam Theatre"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="meta text-ink-muted mt-12 pt-6 border-t border-rule">
          * Additional screen credits, short film projects, and festival appearances are updated as they complete distribution.
        </p>
      </Section>

      {/* SHOWREEL BANNER */}
      <Section tone="noir" space="md">
        <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between">
          <div>
            <p className="meta text-paper/40">Screen Performance</p>
            <h2 className="title-lg text-paper mt-2">Watch Rashmi's featured video showreel</h2>
          </div>
          <ButtonLink to="/showreel" variant="quiet">
            View Showreel →
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
