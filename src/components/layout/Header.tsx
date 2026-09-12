import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "border-b border-rule/80 bg-paper/90 backdrop-blur-md py-3 md:py-4"
            : "bg-transparent py-5 md:py-7"
        }`}
      >
        <div className="container-editorial flex items-center justify-between gap-6">
          <Link
            to="/"
            className="group flex flex-col tracking-wider font-serif text-lg md:text-xl uppercase transition-opacity hover:opacity-75"
          >
            <span className="font-light leading-none">{SITE.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="meta link-underline text-ink-soft transition-colors hover:text-ink"
                    activeProps={{ className: "meta link-underline text-ink font-semibold" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="meta -mr-2 flex min-h-[44px] items-center gap-2 px-3 text-ink transition-opacity hover:opacity-70 lg:hidden"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-0 z-50 bg-noir text-paper transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-6"
        }`}
      >
        <div className="container-editorial flex h-full flex-col justify-between py-6">
          <div className="flex items-center justify-between border-b border-paper/10 pb-5">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="font-serif text-xl tracking-wider uppercase font-light"
            >
              {SITE.name}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="meta flex min-h-[44px] items-center gap-2 text-paper/70 transition-colors hover:text-paper"
            >
              Close ✕
            </button>
          </div>

          <nav aria-label="Mobile Navigation" className="my-auto py-8">
            <ul className="flex flex-col gap-2">
              {NAV.map((item, i) => (
                <li key={item.to} className="border-b border-paper/10">
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline justify-between py-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
                  >
                    <span className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-paper">
                      {item.label}
                    </span>
                    <span className="meta text-paper/40">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-paper/10 pt-5 gap-4">
            <p className="meta text-paper/50">{SITE.role} — Nepal</p>
            <p className="meta text-paper/40">Direct: {SITE.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}
