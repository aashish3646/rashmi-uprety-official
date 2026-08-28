import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { EditorialImage } from "@/components/EditorialImage";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { PRACTICE, SITE, THEATRE_CREDITS } from "@/data/site";

// Image Imports from assets/Images
import mainPhoto from "@/assets/Images/Main Photo.jpg";
import img4724 from "@/assets/Images/IMG_4724.JPG";
import img4742 from "@/assets/Images/IMG_4742.JPG";
import img4744 from "@/assets/Images/IMG_4744.JPG";
import img9578 from "@/assets/Images/IMG_9578.JPG";
import img9625 from "@/assets/Images/IMG_9625.JPG";
import dsc07418 from "@/assets/Images/DSC07418.JPG";
import pmb03283 from "@/assets/Images/PMB03283.jpg";
import theatreOne from "@/assets/Images/IMG_0534.JPG";
import theatreTwo from "@/assets/Images/IMG_0564.JPG";

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
  return (
    <>
      {/* HERO WITH AUTO-PLAY SLIDESHOW */}
      <section className="bg-noir text-paper">
        <div className="container-editorial pt-6 pb-14 md:pt-14 md:pb-20">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="order-2 lg:order-none lg:col-span-5 lg:pb-6">
              <p className="meta text-paper/50">{SITE.professions.join(" · ")}</p>
              <h1 className="display-xl mt-5">
                Rashmi
                <br />
                Uprety
              </h1>
              <p className="mt-6 max-w-[38ch] text-paper/70">{SITE.statement}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <ButtonLink to="/work" variant="quiet">
                  Explore my work
                </ButtonLink>
                <Link
                  to="/theatre"
                  className="meta link-underline inline-flex min-h-[44px] items-center text-paper/70 hover:text-paper"
                >
                  Theatre
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-none lg:col-span-7">
              <HeroSlideshow slides={HERO_SLIDES} ratio="4 / 5" intervalMs={3500} />
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <Section space="lg">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <p className="meta text-clay md:col-span-3">Artist statement</p>
          <Reveal className="md:col-span-9 lg:col-span-8">
            <p className="font-display text-[clamp(1.5rem,3vw,2.375rem)] leading-[1.2] font-light">
              “Acting, for me, begins with listening — to a character, to a stage, to the people
              sharing it.”
            </p>
            <p className="lede mt-8 max-w-[58ch]">
              I am a Nepalese actor and theatre artist associated with Kadam Theatre in Damak,
              where I was part of the pioneering first batch. My work moves between stage and screen, built
              on character development, dialogue delivery and physical presence.
            </p>
            <Link to="/about" className="meta link-underline mt-8 inline-flex min-h-[44px] items-center text-clay">
              Read my full profile
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* SELECTED WORK */}
      <Section tone="dim" space="lg">
        <SectionHeader
          eyebrow="Selected work"
          title="Performance across stage and screen"
          intro="A selection of my stage work. My screen credits are being compiled and will be listed as they are confirmed."
        />
        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 md:mt-20">
          {THEATRE_CREDITS.map((credit, i) => (
            <Reveal key={credit.title} delay={i * 90} className={i === 1 ? "md:mt-20" : ""}>
              <Link to="/theatre" className="group block">
                <EditorialImage
                  src={i === 0 ? theatreOne : theatreTwo}
                  alt={`Stage photograph from ${credit.title}`}
                  width={1200}
                  height={1500}
                  ratio={i === 0 ? "4 / 3" : "3 / 4"}
                  position="center"
                />
                <div className="mt-6 flex items-baseline justify-between gap-6 border-t border-rule pt-4">
                  <div>
                    <h3 className="heading-md">{credit.title}</h3>
                    <p className="mt-2 text-ink-soft">{credit.role}</p>
                  </div>
                  <p className="meta text-ink-muted">{credit.discipline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PRACTICE */}
      <Section space="lg">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
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
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <p className="meta text-clay">My Practice</p>
            <h2 className="title-lg mt-6">Craft, trained on stage</h2>
            <ul className="mt-10 grid grid-cols-1 gap-0 sm:grid-cols-2">
              {PRACTICE.map((skill, i) => (
                <li key={skill} className="border-t border-rule py-4">
                  <span className="meta mr-4 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FEATURED PHOTOGRAPHY */}
      <Section tone="noir" space="lg">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="meta text-paper/45">Photography</p>
            <h2 className="title-lg mt-6">Stills &amp; Portraits</h2>
            <Link to="/gallery" className="meta link-underline mt-8 inline-flex min-h-[44px] items-center">
              View full gallery
            </Link>
          </div>
          <Reveal className="md:col-span-4">
            <EditorialImage
              src={img9578}
              alt="Portrait photo of Rashmi Uprety"
              width={1200}
              height={1500}
              ratio="3 / 4"
            />
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:mt-16">
            <EditorialImage
              src={pmb03283}
              alt="Performance still of Rashmi Uprety"
              width={1200}
              height={1200}
              ratio="1 / 1"
            />
          </Reveal>
        </div>
      </Section>

      {/* SHOWREEL + CTA */}
      <Section space="lg">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="meta text-clay">Showreel</p>
            <h2 className="title-lg mt-6">Featured Video</h2>
            <p className="lede mt-6 max-w-[40ch]">
              Watch my featured screen performance and video reel online.
            </p>
            <ButtonLink to="/showreel" variant="outline" className="mt-9">
              Watch showreel
            </ButtonLink>
          </div>
          <div className="md:col-span-6 md:border-l md:border-rule md:pl-8 lg:pl-14">
            <p className="meta text-clay">Enquiries</p>
            <h2 className="title-lg mt-6">Casting &amp; Collaboration</h2>
            <p className="lede mt-6 max-w-[40ch]">
              For roles, productions, workshops, or artistic collaborations, feel free to get in touch.
            </p>
            <ButtonLink to="/contact" className="mt-9">
              Send enquiry
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
