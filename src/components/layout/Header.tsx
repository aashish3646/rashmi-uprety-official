import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/90 backdrop-blur-[2px]">
      <div className="container-editorial grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 md:py-5">
        <Link
          to="/"
          className="min-w-0 truncate font-display text-lg tracking-[0.14em] uppercase md:text-xl"
        >
          {SITE.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="meta link-underline text-ink-soft transition-colors hover:text-ink"
                  activeProps={{ className: "meta link-underline text-ink" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="meta -mr-3 flex min-h-[44px] min-w-[44px] items-center justify-end px-3 text-ink lg:hidden"
        >
          Menu
        </button>
      </div>
    </header>

    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      hidden={!open}
      className="fixed inset-0 z-50 bg-noir text-paper lg:hidden"
    >
      <div className="container-editorial flex h-full flex-col py-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.14em] uppercase">{SITE.name}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="meta -mr-3 flex min-h-[44px] min-w-[44px] items-center justify-end px-3"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-10 flex-1">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.to} className="border-b border-paper/12">
                <Link
                  to={item.to}
                  className="reveal reveal-in flex min-h-[64px] items-baseline gap-5 py-4"
                  style={{ transitionDelay: `${60 + i * 45}ms` }}
                >
                  <span className="meta text-paper/45">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-3xl leading-none font-light sm:text-4xl">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="meta pb-6 text-paper/50">{SITE.role}</p>
      </div>
    </div>
    </>
  );
}
