import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-12 md:gap-8">
      <p className="meta text-clay md:col-span-3">{eyebrow}</p>
      <div className="md:col-span-9 lg:col-span-7">
        <h2 className="title-lg">{title}</h2>
        {intro ? <p className="lede mt-5 max-w-[46ch]">{intro}</p> : null}
      </div>
      {aside ? <div className="md:col-span-12 lg:col-span-2 lg:justify-self-end">{aside}</div> : null}
    </Reveal>
  );
}
