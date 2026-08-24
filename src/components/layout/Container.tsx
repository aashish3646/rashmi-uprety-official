import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={`container-editorial ${className}`}>{children}</Tag>;
}