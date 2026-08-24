import type { ReactNode } from "react";
import { Container } from "./Container";

type Space = "sm" | "md" | "lg";

const PAD: Record<Space, string> = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24 lg:py-28",
  lg: "py-20 md:py-28 lg:py-36",
};

export function Section({
  children,
  space = "md",
  bleed = false,
  rule = false,
  tone = "paper",
  className = "",
  id,
}: {
  children: ReactNode;
  space?: Space;
  /** full-bleed sections skip the container */
  bleed?: boolean;
  rule?: boolean;
  tone?: "paper" | "noir" | "dim";
  className?: string;
  id?: string;
}) {
  const toneClass =
    tone === "noir"
      ? "bg-noir text-paper"
      : tone === "dim"
        ? "bg-paper-dim text-ink"
        : "bg-paper text-ink";

  return (
    <section id={id} className={`${toneClass} ${PAD[space]} ${className}`}>
      {bleed ? children : <Container>{rule ? <div className="rule-top pt-10 md:pt-14">{children}</div> : children}</Container>}
    </section>
  );
}
