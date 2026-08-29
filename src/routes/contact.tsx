import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/EditorialButton";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/data/site";
import galleryOne from "@/assets/gallery-1.jpg";

const TITLE = "Contact & Enquiries — Rashmi Uprety";
const DESCRIPTION =
  "Send casting, theatre, press, and performance enquiries directly to Nepalese actor and theatre artist Rashmi Uprety.";

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

const FIELD_INPUT =
  "mt-2.5 w-full min-h-[48px] rounded-none border-b border-rule bg-transparent px-0 py-3 text-ink outline-none transition-all duration-300 focus:border-ink placeholder:text-ink-muted/50";

type SubmittedData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  mailtoUrl: string;
};

export function Contact() {
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get("_gotcha") as string;

    // Honeypot anti-bot check: quietly ignore automated spam scripts
    if (honeypot) {
      setSubmittedData({
        name: "Sender",
        email: "",
        subject: "Enquiry",
        message: "",
        mailtoUrl: `mailto:${SITE.email}`,
      });
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Input sanitization & validation
    if (!name || name.length > 100) {
      setError("Please enter a valid name (up to 100 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!subject || subject.length > 200) {
      setError("Please enter a subject line (up to 200 characters).");
      return;
    }

    if (!message || message.length > 3000) {
      setError("Please enter a message (up to 3,000 characters).");
      return;
    }

    // Rate limiting: check timestamp of last submission
    const lastSubmitTime = localStorage.getItem("last_contact_ts");
    const now = Date.now();
    if (lastSubmitTime && now - Number(lastSubmitTime) < 10000) {
      setError("Please wait a few seconds before submitting another enquiry.");
      return;
    }

    setIsSubmitting(true);

    try {
      localStorage.setItem("last_contact_ts", String(now));

      // Construct pre-formatted mailto URL so message is ready in sender's mail client
      const formattedBody = `Hello Rashmi,\n\n${message}\n\n---\nSender: ${name}\nContact Email: ${email}`;
      const mailtoUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `[Website Enquiry] ${subject}`
      )}&body=${encodeURIComponent(formattedBody)}`;

      const data: SubmittedData = {
        name,
        email,
        subject,
        message,
        mailtoUrl,
      };

      setSubmittedData(data);

      // Automatically trigger user's default email client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 300);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try sending directly to " + SITE.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Enquiries & Booking"
        title="Get in touch"
        intro="For casting calls, theatre productions, workshops, press, or artistic collaborations."
      />

      <Section space="md">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* LEFT SIDE DETAILS */}
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-paper-dim px-3 py-1.5 text-xs text-clay">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-medium tracking-wide">Available for casting &amp; stage projects</span>
            </div>

            <dl className="mt-8 border-t border-rule">
              <div className="border-b border-rule py-5">
                <dt className="meta text-ink-muted">Direct Email</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline font-display text-xl text-ink transition-colors hover:text-clay"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>

              <div className="border-b border-rule py-5">
                <dt className="meta text-ink-muted">Based in</dt>
                <dd className="mt-1.5 text-ink-soft">Damak, Jhapa, Nepal</dd>
              </div>

              <div className="border-b border-rule py-5">
                <dt className="meta text-ink-muted">Discipline</dt>
                <dd className="mt-1.5 text-ink-soft">{SITE.professions.join(" · ")}</dd>
              </div>

              <div className="border-b border-rule py-5">
                <dt className="meta text-ink-muted">Social Media &amp; Profiles</dt>
                <dd className="mt-3 flex flex-col gap-2.5 text-sm">
                  <a
                    href={SITE.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-ink hover:text-clay"
                  >
                    <span>Instagram:</span> <span className="font-medium">@rashmi_uprety</span> ↗
                  </a>
                  <a
                    href={SITE.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-ink hover:text-clay"
                  >
                    <span>TikTok:</span> <span className="font-medium">@rashmiuprety</span> ↗
                  </a>
                  <a
                    href={SITE.socials.youtubeChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-ink hover:text-clay"
                  >
                    <span>YouTube:</span> <span className="font-medium">Official Channel</span> ↗
                  </a>
                </dd>
              </div>
            </dl>

            <Reveal className="mt-10 hidden md:block">
              <EditorialImage
                src={galleryOne}
                alt="Portrait of Rashmi Uprety"
                width={1200}
                height={1504}
                ratio="4 / 5"
                className="rounded-sm shadow-sm"
              />
            </Reveal>
          </div>

          {/* RIGHT SIDE FORM & CONFIRMATION CARD */}
          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <div className="rounded-sm border border-rule/80 bg-paper p-7 md:p-10 shadow-sm transition-all duration-300 hover:border-rule">
              <p className="meta text-clay">Direct Enquiry</p>
              <h2 className="title-lg mt-3 text-ink">Send a message</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Messages are formatted and dispatched directly to <strong className="text-ink">{SITE.email}</strong>.
              </p>

              {submittedData ? (
                <div className="mt-8 border-t border-rule/70 pt-8 animate-in fade-in duration-500">
                  <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <span>✓</span> Message prepared for dispatch
                  </div>

                  <h3 className="heading-md mt-4 text-ink">Thank you, {submittedData.name}.</h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Your message details have been saved. Your email application should launch automatically to send the message directly to <span className="font-semibold text-ink">{SITE.email}</span>.
                  </p>

                  <div className="mt-6 rounded-sm bg-paper-dim p-4 text-xs">
                    <p className="meta text-ink-muted">Summary:</p>
                    <p className="mt-1 font-medium text-ink">Subject: {submittedData.subject}</p>
                    <p className="mt-1 text-ink-soft truncate">From: {submittedData.email}</p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={submittedData.mailtoUrl}
                      className="meta inline-flex min-h-[44px] items-center justify-center gap-2 bg-ink px-6 text-paper transition-colors hover:bg-clay"
                    >
                      Open Email App ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="meta link-underline min-h-[44px] px-4 text-ink-soft hover:text-ink"
                    >
                      Send another message
                    </button>
                  </div>
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
                      className="mb-6 rounded-sm border border-clay/50 bg-paper-dim p-4 text-xs font-medium tracking-wide text-clay"
                    >
                      {error}
                    </div>
                  ) : null}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="meta text-ink-muted">
                        Your Name <span className="text-clay">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        maxLength={100}
                        placeholder="e.g. Director / Producer"
                        autoComplete="name"
                        className={FIELD_INPUT}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="meta text-ink-muted">
                        Your Email <span className="text-clay">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={254}
                        placeholder="name@domain.com"
                        autoComplete="email"
                        className={FIELD_INPUT}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="subject" className="meta text-ink-muted">
                      Subject <span className="text-clay">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      required
                      maxLength={200}
                      placeholder="e.g. Casting Enquiry / Production Project"
                      className={FIELD_INPUT}
                    />
                  </div>

                  <div className="mt-6">
                    <label htmlFor="message" className="meta text-ink-muted">
                      Message <span className="text-clay">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      maxLength={3000}
                      placeholder="Share details about the project, dates, or enquiry..."
                      className={`${FIELD_INPUT} resize-none`}
                    />
                  </div>

                  <Button type="submit" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Preparing Enquiry..." : "Send Enquiry to Rashmi"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
