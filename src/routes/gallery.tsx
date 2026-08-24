import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";
import portraitImage from "@/assets/portrait.jpg";
import galleryOne from "@/assets/gallery-1.jpg";
import galleryTwo from "@/assets/gallery-2.jpg";
import galleryThree from "@/assets/gallery-3.jpg";
import galleryFour from "@/assets/gallery-4.jpg";
import theatreOne from "@/assets/theatre-1.jpg";
import theatreTwo from "@/assets/theatre-2.jpg";

const TITLE = "Gallery — Rashmi Uprety";
const DESCRIPTION =
  "Editorial and stage photography of Nepalese actor and theatre artist Rashmi Uprety.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

type Plate = {
  src: string;
  alt: string;
  width: number;
  height: number;
  ratio: string;
  span: string;
  offset?: string;
  position?: string;
};

const PLATES: Plate[] = [
  {
    src: galleryTwo,
    alt: "Standing in an empty auditorium lit by high windows",
    width: 1600,
    height: 1008,
    ratio: "16 / 9",
    span: "md:col-span-12",
  },
  {
    src: galleryOne,
    alt: "Profile portrait against a dark backdrop",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-5",
  },
  {
    src: portraitImage,
    alt: "Black and white portrait in window light",
    width: 1200,
    height: 1504,
    ratio: "4 / 5",
    span: "md:col-span-6 md:col-start-7",
    offset: "md:mt-24",
    position: "50% 20%",
  },
  {
    src: theatreOne,
    alt: "Performer under a single stage spotlight",
    width: 1600,
    height: 1072,
    ratio: "3 / 2",
    span: "md:col-span-7",
  },
  {
    src: galleryThree,
    alt: "Classical dance hand gesture study",
    width: 1200,
    height: 1200,
    ratio: "1 / 1",
    span: "md:col-span-4 md:col-start-9",
    offset: "md:mt-20",
  },
  {
    src: galleryFour,
    alt: "Backstage in a dressing-room mirror",
    width: 1200,
    height: 1504,
    ratio: "4 / 5",
    span: "md:col-span-6",
  },
  {
    src: theatreTwo,
    alt: "Rehearsal on a bare stage with the company",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-5 md:col-start-8",
    offset: "md:mt-16",
  },
];

function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="Photography"
        title="Gallery"
        intro="Stills from stage and studio. Placeholder photography for now — Rashmi's own images will replace these."
      />

      <Section space="md">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {PLATES.map((plate, i) => (
            <Reveal key={plate.src + i} className={`${plate.span} ${plate.offset ?? ""}`}>
              <EditorialImage
                src={plate.src}
                alt={plate.alt}
                width={plate.width}
                height={plate.height}
                ratio={plate.ratio}
                position={plate.position ?? "center"}
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
