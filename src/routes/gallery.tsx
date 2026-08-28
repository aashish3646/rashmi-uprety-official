import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";

// Import all photos from Images folder
import mainPhoto from "@/assets/Images/Main Photo.jpg";
import img4724 from "@/assets/Images/IMG_4724.JPG";
import img4742 from "@/assets/Images/IMG_4742.JPG";
import img4744 from "@/assets/Images/IMG_4744.JPG";
import img9578 from "@/assets/Images/IMG_9578.JPG";
import img9581 from "@/assets/Images/IMG_9581.JPG";
import img9625 from "@/assets/Images/IMG_9625.JPG";
import dsc07111 from "@/assets/Images/DSC07111.JPG";
import dsc07418 from "@/assets/Images/DSC07418.JPG";
import pmb03283 from "@/assets/Images/PMB03283.jpg";
import pmb03284 from "@/assets/Images/PMB03284.jpg";
import pmb04429 from "@/assets/Images/PMB04429.jpg";
import j9a8103 from "@/assets/Images/_J9A8103.jpg";
import j9a8111 from "@/assets/Images/_J9A8111.jpg";
import theatreOne from "@/assets/Images/IMG_0534.JPG";
import theatreTwo from "@/assets/Images/IMG_0564.JPG";
import imgWa0005 from "@/assets/Images/IMG-20250913-WA0005.jpg";

const TITLE = "Gallery — Rashmi Uprety";
const DESCRIPTION =
  "Official photography and stills gallery of Nepalese actor and theatre artist Rashmi Uprety.";

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
    src: mainPhoto,
    alt: "Rashmi Uprety main portrait",
    width: 1600,
    height: 2000,
    ratio: "4 / 5",
    span: "md:col-span-6",
  },
  {
    src: img4724,
    alt: "Rashmi Uprety portrait shoot",
    width: 1200,
    height: 1500,
    ratio: "4 / 5",
    span: "md:col-span-6",
    offset: "md:mt-12",
  },
  {
    src: img4742,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-4",
  },
  {
    src: img4744,
    alt: "Rashmi Uprety studio portrait",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-4",
  },
  {
    src: img9578,
    alt: "Rashmi Uprety portrait",
    width: 1200,
    height: 1504,
    ratio: "3 / 4",
    span: "md:col-span-4",
  },
  {
    src: dsc07418,
    alt: "Rashmi Uprety performance photograph",
    width: 1600,
    height: 1072,
    ratio: "16 / 9",
    span: "md:col-span-12",
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
    ratio: "3 / 2",
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
    alt: "Rashmi Uprety on stage under spotlight",
    width: 1600,
    height: 1072,
    ratio: "3 / 2",
    span: "md:col-span-6",
  },
  {
    src: theatreTwo,
    alt: "Rashmi Uprety stage rehearsal",
    width: 1600,
    height: 1072,
    ratio: "3 / 2",
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
  return (
    <>
      <PageHeader
        eyebrow="Photography"
        title="Gallery"
        intro="A visual archive of portraits, stage stills, and performance photography."
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
                priority={i === 0 || i === 1}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
