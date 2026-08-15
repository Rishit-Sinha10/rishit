"use client";
import GithubIcon from "../components/github";
import LinkedinIcon from "../components/linkedin";
import TwitterXIcon from "../components/x-icon";
import GmailIcon from "../components/gmail-icon";
export default function Contact() {
  return (
    <section className="mx-auto w-full max-w-[768px] px-5 py-6">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Get in touch
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Open to full-time roles starting 2026. Let&apos;s build something
              great together.
            </p>
          </div>
          <a
            href="mailto:Sinharishit04@gmail.com"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:bg-[var(--accent-hover)]"
          >
            <GmailIcon className="h-4 w-4 text-[var(--background)]" />
            Say hello
          </a>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-[var(--border)] pt-4">
          <a
            href="https://github.com/Rishit-Sinha10"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rishit-sinha-6953ab363"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="https://x.com/RishitSinh41144"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="X (Twitter)"
          >
            <TwitterXIcon className="h-4 w-4" />
          </a>
          <a
            href="mailto:Sinharishit04@gmail.com"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="Email"
          >
            <GmailIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
