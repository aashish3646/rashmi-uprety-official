import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { EditorialImage } from "@/components/EditorialImage";
import { ButtonLink } from "@/components/EditorialButton";
import { Reveal } from "@/components/Reveal";
import { PRACTICE, SITE, THEATRE_CREDITS } from "@/data/site";
import heroImage from "@/assets/gallery-2.jpg";
import portraitImage from "@/assets/portrait.jpg";
import theatreOne from "@/assets/theatre-1.jpg";
import theatreTwo from "@/assets/theatre-2.jpg";
import galleryOne from "@/assets/gallery-1.jpg";
import galleryThree from "@/assets/gallery-3.jpg";

const TITLE = "Rashmi Uprety — Actor & Theatre Artist";
const DESCRIPTION =
  "Portfolio of Rashmi Uprety, a Nepalese actor and theatre artist working across stage and screen, associated with Kadam Theatre, Damak.";

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

function Home() {
  return (
    <>
      {/* HERO */}
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
                  Explore her work
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
              <EditorialImage
                src={heroImage}
                alt="Rashmi Uprety standing in an empty theatre auditorium"
                width={1600}
                height={1008}
                ratio="4 / 5"
                position="60% 40%"
                priority
                zoom={false}
              />
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
              Rashmi is a Nepalese actor and theatre artist associated with Kadam Theatre in Damak,
              where she was part of the first batch. Her work moves between stage and screen, built
              on character development, dialogue delivery and physical presence.
            </p>
            <Link to="/about" className="meta link-underline mt-8 inline-flex min-h-[44px] items-center text-clay">
              Read the full profile
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* SELECTED WORK */}
      <Section tone="dim" space="lg">
        <SectionHeader
          eyebrow="Selected work"
          title="Performance across stage and screen"
          intro="Verified credits only. Screen credits are being compiled and will appear here as they are confirmed."
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
              src={portraitImage}
              alt="Black and white portrait of Rashmi Uprety"
              width={1200}
              height={1500}
              ratio="4 / 5"
              position="50% 25%"
            />
          </Reveal>
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <p className="meta text-clay">Practice</p>
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
            <h2 className="title-lg mt-6">Stills</h2>
            <Link to="/gallery" className="meta link-underline mt-8 inline-flex min-h-[44px] items-center">
              View gallery
            </Link>
          </div>
          <Reveal className="md:col-span-4">
            <EditorialImage
              src={galleryOne}
              alt="Profile portrait in low light"
              width={1200}
              height={1500}
              ratio="3 / 4"
            />
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:mt-16">
            <EditorialImage
              src={galleryThree}
              alt="Classical dance hand gesture study"
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
            <h2 className="title-lg mt-6">Coming soon</h2>
            <p className="lede mt-6 max-w-[40ch]">
              A selected reel is in preparation. Until then, individual scenes can be shared on
              request.
            </p>
            <ButtonLink to="/showreel" variant="outline" className="mt-9">
              Showreel details
            </ButtonLink>
          </div>
          <div className="md:col-span-6 md:border-l md:border-rule md:pl-8 lg:pl-14">
            <p className="meta text-clay">Enquiries</p>
            <h2 className="title-lg mt-6">Casting, theatre &amp; collaboration</h2>
            <p className="lede mt-6 max-w-[40ch]">
              For roles, productions, workshops or press, send an enquiry and it will be answered
              directly.
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
