import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper py-14 md:py-20 text-ink">
      <div className="container-editorial flex flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <span className="font-serif text-2xl md:text-3xl uppercase tracking-tight block font-light">
              {SITE.name}
            </span>
            <p className="meta text-clay mt-2">{SITE.role} — Nepal</p>
            <p className="mt-4 max-w-[36ch] text-ink-soft text-sm font-light leading-relaxed">
              Associated with Kadam Theatre in Damak, Nepal. Performing across stage and screen with a focus on character, dialogue, and movement.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="meta text-ink-muted mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="meta link-underline text-ink-soft hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="meta text-ink-muted mb-4">Social &amp; Profiles</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink-soft hover:text-ink"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink-soft hover:text-ink"
                >
                  TikTok ↗
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.youtubeChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink-soft hover:text-ink"
                >
                  YouTube ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-rule/60 pt-8 gap-4 meta text-[11px] text-ink-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <Link to="/admin" className="hover:text-ink transition-colors">
            Portal Admin →
          </Link>
        </div>
      </div>
    </footer>
  );
}
