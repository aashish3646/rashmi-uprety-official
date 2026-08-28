import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-noir text-paper">
      <div className="container-editorial py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-4xl leading-none font-light md:text-5xl">{SITE.name}</p>
            <p className="meta mt-5 text-paper/55">Actor · Theatre Artist</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <p className="meta text-paper/40">Index</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline inline-flex min-h-[44px] items-center text-paper/80 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="meta text-paper/40">Connect &amp; Social</p>
            <ul className="mt-5 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="meta link-underline inline-flex min-h-[44px] items-center text-paper hover:text-paper/80"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta link-underline inline-flex min-h-[44px] items-center text-paper/80 hover:text-paper"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta link-underline inline-flex min-h-[44px] items-center text-paper/80 hover:text-paper"
                >
                  TikTok ↗
                </a>
              </li>
              <li>
                <a
                  href={SITE.socials.youtubeChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta link-underline inline-flex min-h-[44px] items-center text-paper/80 hover:text-paper"
                >
                  YouTube Channel ↗
                </a>
              </li>
            </ul>

            <div className="mt-8 border-t border-paper/12 pt-6">
              <Link to="/contact" className="meta link-underline inline-flex min-h-[44px] items-center">
                Send Enquiry
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta text-paper/40">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="meta text-paper/40">{SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
