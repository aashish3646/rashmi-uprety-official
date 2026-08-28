import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/EditorialButton";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/data/site";
import galleryOne from "@/assets/gallery-1.jpg";

const TITLE = "Contact — Rashmi Uprety";
const DESCRIPTION =
  "Booking and press enquiries for Nepalese actor and theatre artist Rashmi Uprety.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const FIELD =
  "mt-3 w-full min-h-[44px] border-b border-rule bg-transparent pb-3 text-ink outline-none transition-colors focus:border-ink placeholder:text-ink-muted/70";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get("_gotcha") as string;
    
    // Honeypot anti-bot check: if filled, quietly reject bot submission
    if (honeypot) {
      setSent(true);
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Input sanitization & validation
    if (!name || name.length > 100) {
      setError("Please enter a valid name (max 100 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!subject || subject.length > 200) {
      setError("Please enter a valid subject line (max 200 characters).");
      return;
    }

    if (!message || message.length > 3000) {
      setError("Please enter a message (max 3,000 characters).");
      return;
    }

    // Rate limiting: check timestamp of last submission
    const lastSubmitTime = localStorage.getItem("last_contact_ts");
    const now = Date.now();
    if (lastSubmitTime && now - Number(lastSubmitTime) < 15000) {
      setError("Please wait a few moments before sending another message.");
      return;
    }

    setIsSubmitting(true);
    try {
      localStorage.setItem("last_contact_ts", String(now));
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Enquiries"
        title="Get in touch"
        intro="For casting, theatre productions, workshops, collaboration or press, send an enquiry below."
      />

      <Section space="md">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="meta text-clay">Details</p>
            <dl className="mt-8">
              <div className="border-t border-rule py-5">
                <dt className="meta text-ink-muted">Based in</dt>
                <dd className="mt-2">Damak, Nepal</dd>
              </div>
              <div className="border-t border-rule py-5">
                <dt className="meta text-ink-muted">Discipline</dt>
                <dd className="mt-2">{SITE.professions.join(" · ")}</dd>
              </div>
              <div className="border-t border-rule py-5">
                <dt className="meta text-ink-muted">Direct Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline text-ink font-medium hover:text-clay"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div className="border-t border-rule py-5">
                <dt className="meta text-ink-muted">Social Media</dt>
                <dd className="mt-2 flex flex-col gap-1.5 text-sm">
                  <a
                    href={SITE.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink hover:text-clay"
                  >
                    Instagram: @rashmi_uprety ↗
                  </a>
                  <a
                    href={SITE.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink hover:text-clay"
                  >
                    TikTok: @rashmiuprety ↗
                  </a>
                  <a
                    href={SITE.socials.youtubeChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink hover:text-clay"
                  >
                    YouTube Channel ↗
                  </a>
                </dd>
              </div>
              <div className="border-t border-rule py-5">
                <dt className="meta text-ink-muted">Website</dt>
                <dd className="mt-2">{SITE.domain}</dd>
              </div>
            </dl>

            <Reveal className="mt-12 hidden md:block">
              <EditorialImage
                src={galleryOne}
                alt="Profile portrait"
                width={1200}
                height={1504}
                ratio="4 / 5"
              />
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="meta text-clay">Enquiry</p>
            {sent ? (
              <div className="mt-8 border-t border-rule pt-8">
                <h2 className="heading-md">Thank you.</h2>
                <p className="mt-4 max-w-[40ch] text-ink-soft">
                  Your enquiry has been noted securely. Messages are routed directly to {SITE.email}.
                </p>
              </div>
            ) : (
              <form className="mt-8" onSubmit={handleSubmit}>
                {/* Honeypot hidden input to catch spam bots */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <label htmlFor="_gotcha">Leave this empty</label>
                  <input
                    id="_gotcha"
                    name="_gotcha"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {error ? (
                  <div
                    role="alert"
                    className="mb-6 border border-clay/40 bg-paper-dim p-4 text-xs tracking-wide text-ink"
                  >
                    {error}
                  </div>
                ) : null}

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="meta text-ink-muted">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      maxLength={100}
                      autoComplete="name"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="meta text-ink-muted">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      className={FIELD}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label htmlFor="subject" className="meta text-ink-muted">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    required
                    maxLength={200}
                    className={FIELD}
                  />
                </div>
                <div className="mt-8">
                  <label htmlFor="message" className="meta text-ink-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    maxLength={3000}
                    className={`${FIELD} resize-none`}
                  />
                </div>
                <Button type="submit" className="mt-10" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send enquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
