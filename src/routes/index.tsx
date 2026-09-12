import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { PRACTICE, THEATRE_CREDITS, SITE } from "@/data/site";
import { useCms } from "@/hooks/useCms";

// Image Imports from assets/Images (optimized WebP)
import mainPhoto from "@/assets/Images/main-photo.webp";
import img4724 from "@/assets/Images/IMG_4724.webp";
import img4742 from "@/assets/Images/IMG_4742.webp";
import img4744 from "@/assets/Images/IMG_4744.webp";
import img9578 from "@/assets/Images/IMG_9578.webp";
import img9625 from "@/assets/Images/IMG_9625.webp";
import dsc07418 from "@/assets/Images/DSC07418.webp";
import pmb03283 from "@/assets/Images/PMB03283.webp";
import theatreOne from "@/assets/Images/IMG_0534.webp";
import theatreTwo from "@/assets/Images/IMG_0564.webp";

const TITLE = "Rashmi Uprety — Actor & Theatre Artist";
const DESCRIPTION =
  "Official portfolio of Rashmi Uprety, a Nepalese actor and theatre artist working across stage and screen, associated with Kadam Theatre, Damak.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const HERO_SLIDES = [
  { src: mainPhoto, alt: "Rashmi Uprety portrait", position: "50% 25%" },
  { src: img4724, alt: "Rashmi Uprety portrait shoot", position: "center" },
  { src: img4742, alt: "Rashmi Uprety dramatic lighting", position: "center" },
  { src: img4744, alt: "Rashmi Uprety editorial portrait", position: "center" },
  { src: img9625, alt: "Rashmi Uprety stage still", position: "center" },
  { src: dsc07418, alt: "Rashmi Uprety performance photograph", position: "center" },
];

function Home() {
  const { photos, bio, featuredVideoId } = useCms();
  
  const firstParagraph = typeof bio === "string"
    ? bio.split("\n").filter((p) => p.trim() !== "")[0]
    : "I am a Nepalese actor and theatre artist working across stage and screen, with a practice rooted in character, voice and physical presence.";

  const activeSlides = photos.length > 0
    ? photos.map((p) => ({ src: p.dataUrl, alt: p.caption || "Rashmi Uprety", position: "center" }))
    : HERO_SLIDES;

  const embedVideoId = featuredVideoId || SITE.socials.featuredVideoEmbedId;

  return (
    <>
      {/* 01. IMMERSIVE EDITORIAL HERO */}
      <section className="relative min-h-[88vh] flex flex-col justify-between pt-4 pb-12 overflow-hidden">
        <div className="container-editorial w-full grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="order-2 lg:order-1 lg:col-span-5 pb-6">
            <p className="meta text-clay mb-4">Actor · Theatre Artist · Nepal</p>
            <h1 className="display-hero text-ink uppercase tracking-tight">
              Rashmi
              <br />
              Uprety
            </h1>
            <p className="mt-6 max-w-[36ch] text-ink-soft text-sm md:text-base leading-relaxed font-light">
              {firstParagraph}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-rule pt-6">
              <ButtonLink to="/work" variant="quiet">
                Explore Work →
              </ButtonLink>
              <Link
                to="/theatre"
                className="meta link-underline text-ink-soft hover:text-ink transition-colors"
              >
                Stage Credits
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <HeroSlideshow slides={activeSlides} ratio="4 / 5" intervalMs={4000} />
          </div>
        </div>

        <div className="container-editorial pt-6 flex items-center justify-between border-t border-rule/50 mt-8 text-ink-muted">
          <span className="meta text-[10px]">Damak / Jhapa / Nepal</span>
          <span className="meta text-[10px]">Scroll to Explore ↓</span>
        </div>
      </section>

      {/* 02. ARTIST STATEMENT */}
      <Section space="lg" rule>
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="meta text-clay">Artistic Statement</p>
          </div>
          <Reveal className="md:col-span-9 lg:col-span-8">
            <p className="font-serif text-[clamp(1.75rem,3.8vw,3.25rem)] leading-[1.12] font-light text-ink">
              “Acting begins with listening — to a character, to a stage, and to the quiet space between dialogue.”
            </p>
            <p className="lede mt-8 max-w-[54ch]">
              I am a Nepalese actor and theatre artist associated with Kadam Theatre in Damak,
              where I trained in the first pioneer batch. My work moves between stage and screen, built
              on character development, voice modulation, and physical performance.
            </p>
            <Link to="/about" className="meta link-underline mt-8 inline-flex items-center text-clay">
              Read Complete Profile →
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 03. THEATRE ARCHIVE (DARK DRAMATIC SECTION) */}
      <Section tone="noir" space="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-paper/10 pb-8">
          <div>
            <p className="meta text-paper/40">Stage Archive</p>
            <h2 className="display-xl text-paper mt-3">Selected Theatre Work</h2>
          </div>
          <Link to="/theatre" className="meta link-underline text-paper/70 hover:text-paper">
            Explore Full Stage Archive →
          </Link>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {THEATRE_CREDITS.map((credit, i) => (
            <Reveal key={credit.title} delay={i * 100}>
              <Link to="/theatre" className="group block">
                <EditorialImage
                  src={i === 0 ? theatreOne : theatreTwo}
                  alt={`Stage photograph from ${credit.title}`}
                  width={1200}
                  height={1500}
                  ratio={i === 0 ? "4 / 3" : "3 / 4"}
                  position="center"
                />
                <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-paper/15 pt-4">
                  <div>
                    <h3 className="heading-md text-paper group-hover:text-clay transition-colors">{credit.title}</h3>
                    <p className="mt-1 text-sm text-paper/60">{credit.role}</p>
                  </div>
                  <span className="meta text-paper/40">{credit.association || "Kadam Theatre"}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 04. PRACTICE & CRAFT */}
      <Section space="lg">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <EditorialImage
              src={img4744}
              alt="Portrait of Rashmi Uprety"
              width={1200}
              height={1500}
              ratio="4 / 5"
              position="center"
            />
          </Reveal>
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
            <p className="meta text-clay">Discipline &amp; Craft</p>
            <h2 className="title-lg text-ink mt-4">Trained on stage, focused on character</h2>
            <ul className="mt-8 border-b border-rule">
              {PRACTICE.map((skill, i) => (
                <li key={skill} className="border-t border-rule py-4 flex items-center justify-between">
                  <span className="text-ink text-sm md:text-base font-light">{skill}</span>
                  <span className="meta text-ink-muted">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 05. PHOTOGRAPHY ARCHIVE PREVIEW */}
      <Section tone="dim" space="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rule pb-8">
          <div>
            <p className="meta text-clay">Visual Archive</p>
            <h2 className="title-lg text-ink mt-3">Portraits &amp; Performance Stills</h2>
          </div>
          <Link to="/gallery" className="meta link-underline text-ink hover:text-clay">
            Enter Full Gallery Archive →
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-12 items-center">
          <Reveal className="md:col-span-5">
            <EditorialImage
              src={img9578}
              alt="Portrait photo of Rashmi Uprety"
              width={1200}
              height={1504}
              ratio="3 / 4"
            />
          </Reveal>
          <Reveal delay={120} className="md:col-span-7">
            <EditorialImage
              src={pmb03283}
              alt="Performance still of Rashmi Uprety"
              width={1200}
              height={1200}
              ratio="16 / 10"
            />
          </Reveal>
        </div>
      </Section>

      {/* 06. FEATURED SHOWREEL */}
      <Section space="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rule pb-8">
          <div>
            <p className="meta text-clay">Moving Image</p>
            <h2 className="title-lg text-ink mt-3">Featured Screen Performance</h2>
          </div>
          <ButtonLink to="/showreel" variant="outline">
            Watch Full Showreel →
          </ButtonLink>
        </div>

        <div className="mt-10 overflow-hidden bg-noir aspect-video w-full rounded-none border border-rule">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${embedVideoId}?rel=0`}
            title="Rashmi Uprety Featured Performance Reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-none"
          />
        </div>
      </Section>

      {/* 07. CLOSING EDITORIAL CTA */}
      <Section tone="noir" space="lg">
        <div className="py-8 text-center max-w-3xl mx-auto flex flex-col items-center">
          <p className="meta text-paper/40">Inquiries &amp; Casting</p>
          <h2 className="display-xl text-paper mt-6 leading-tight font-light">
            “Open to the next stage, the next frame, the next narrative.”
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <ButtonLink to="/contact" variant="quiet">
              Start a Conversation →
            </ButtonLink>
            <a
              href={`mailto:${SITE.email}`}
              className="meta link-underline inline-flex min-h-[44px] items-center text-paper/60 hover:text-paper"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
