import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";
import { useCms } from "@/hooks/useCms";

// Import default plates (optimized WebP)
import mainPhoto from "@/assets/Images/main-photo.webp";
import img4724 from "@/assets/Images/IMG_4724.webp";
import img4742 from "@/assets/Images/IMG_4742.webp";
import img4744 from "@/assets/Images/IMG_4744.webp";
import img9578 from "@/assets/Images/IMG_9578.webp";
import img9581 from "@/assets/Images/IMG_9581.webp";
import img9625 from "@/assets/Images/IMG_9625.webp";
import dsc07111 from "@/assets/Images/DSC07111.webp";
import dsc07418 from "@/assets/Images/DSC07418.webp";
import pmb03283 from "@/assets/Images/PMB03283.webp";
import pmb03284 from "@/assets/Images/PMB03284.webp";
import pmb04429 from "@/assets/Images/PMB04429.webp";
import j9a8103 from "@/assets/Images/_J9A8103.webp";
import j9a8111 from "@/assets/Images/_J9A8111.webp";
import theatreOne from "@/assets/Images/IMG_0534.webp";
import theatreTwo from "@/assets/Images/IMG_0564.webp";
import imgWa0005 from "@/assets/Images/IMG-20250913-WA0005.webp";

const TITLE = "Visual Archive — Rashmi Uprety";
const DESCRIPTION =
  "Curated photographic archive, portrait studies, and performance captures of Nepalese actor Rashmi Uprety.";

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
  caption?: string;
};

const DEFAULT_PLATES: Plate[] = [
  {
    src: mainPhoto,
    alt: "Rashmi Uprety editorial portrait plate",
    width: 1600,
    height: 2000,
    ratio: "4 / 5",
    span: "md:col-span-6",
    caption: "Plate 01 — Editorial Studio Portrait",
  },
  {
    src: img4724,
    alt: "Rashmi Uprety portrait shoot",
    width: 1200,
    height: 1500,
    ratio: "4 / 5",
    span: "md:col-span-6",
    offset: "md:mt-12",
    caption: "Plate 02 — Character Light Study",
  },
  {
    src: img4742,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-4",
    caption: "Plate 03 — Portrait Study",
  },
  {
    src: img4744,
    alt: "Rashmi Uprety studio portrait",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-4",
    caption: "Plate 04 — Expression Study",
  },
  {
    src: img9578,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-4",
    caption: "Plate 05 — Natural Light",
  },
  {
    src: dsc07418,
    alt: "Rashmi Uprety performance photograph",
    width: 1600,
    height: 1072,
    ratio: "21 / 9",
    span: "md:col-span-12",
    caption: "Plate 06 — Stage Motion & Physicality",
  },
  {
    src: img9581,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1500,
    ratio: "4 / 5",
    span: "md:col-span-5",
  },
  {
    src: img9625,
    alt: "Rashmi Uprety stage capture",
    width: 1200,
    height: 1500,
    ratio: "4 / 5",
    span: "md:col-span-6 md:col-start-7",
    offset: "md:mt-16",
  },
  {
    src: dsc07111,
    alt: "Rashmi Uprety performance photo",
    width: 1600,
    height: 1072,
    ratio: "16 / 10",
    span: "md:col-span-7",
  },
  {
    src: pmb03283,
    alt: "Rashmi Uprety theatre portrait",
    width: 1200,
    height: 1200,
    ratio: "1 / 1",
    span: "md:col-span-4 md:col-start-9",
    offset: "md:mt-12",
  },
  {
    src: pmb03284,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1504,
    ratio: "4 / 5",
    span: "md:col-span-6",
  },
  {
    src: pmb04429,
    alt: "Rashmi Uprety stage shot",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-5 md:col-start-8",
    offset: "md:mt-16",
  },
  {
    src: theatreOne,
    alt: "Rashmi Uprety stage spotlight",
    width: 1600,
    height: 1072,
    ratio: "16 / 10",
    span: "md:col-span-6",
  },
  {
    src: theatreTwo,
    alt: "Rashmi Uprety stage rehearsal",
    width: 1600,
    height: 1072,
    ratio: "16 / 10",
    span: "md:col-span-6",
  },
  {
    src: j9a8103,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1500,
    ratio: "4 / 5",
    span: "md:col-span-4",
  },
  {
    src: j9a8111,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1500,
    ratio: "4 / 5",
    span: "md:col-span-4",
  },
  {
    src: imgWa0005,
    alt: "Rashmi Uprety photo",
    width: 1200,
    height: 1500,
    ratio: "4 / 5",
    span: "md:col-span-4",
  },
];

function Gallery() {
  const { photos } = useCms();

  const cmsPlates: Plate[] = photos.map((p, idx) => {
    const spans = ["md:col-span-6", "md:col-span-6", "md:col-span-4", "md:col-span-4", "md:col-span-4"];
    return {
      src: p.dataUrl,
      alt: p.caption || p.name,
      width: 1200,
      height: 1500,
      ratio: "4 / 5",
      span: spans[idx % spans.length] || "md:col-span-6",
      caption: `Uploaded Plate — ${p.name}`,
    };
  });

  const allPlates = [...cmsPlates, ...DEFAULT_PLATES];

  return (
    <>
      <PageHeader
        eyebrow="Photographic Archive"
        title="Visual Contact Sheet"
        intro="Curated archive of editorial portraits, performance captures, and stage photography."
      />

      <Section space="lg">
        <div className="border-b border-rule pb-6 mb-12 flex items-center justify-between">
          <p className="meta text-clay">Contact Sheet Archive</p>
          <span className="meta text-ink-muted">{allPlates.length} Visual Plates</span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {allPlates.map((plate, i) => (
            <Reveal key={plate.src + i} className={`${plate.span} ${plate.offset ?? ""}`}>
              <EditorialImage
                src={plate.src}
                alt={plate.alt}
                width={plate.width}
                height={plate.height}
                ratio={plate.ratio}
                caption={plate.caption}
                priority={i === 0 || i === 1}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
