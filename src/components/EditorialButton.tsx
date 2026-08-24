import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "quiet";

const BASE =
  "meta inline-flex min-h-[44px] items-center justify-center gap-3 px-7 transition-colors duration-300";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-clay",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  quiet: "border border-paper/30 text-paper hover:bg-paper hover:text-ink",
};

export function ButtonLink({
  children,
  variant = "solid",
  className = "",
  ...props
}: { children: ReactNode; variant?: Variant; className?: string } & ComponentProps<typeof Link>) {
  return (
    <Link className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: { children: ReactNode; variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
