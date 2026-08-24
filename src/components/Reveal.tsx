import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
};

/** Subtle one-shot fade/rise on scroll entry. Motion is disabled via CSS for
 * prefers-reduced-motion, so content is always readable. */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
