"use client";
import GithubIcon from "./github";
import LinkedinIcon from "./linkedin";
import TwitterXIcon from "./x-icon";
import GmailIcon from "./gmail-icon";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-[768px] flex-col items-start gap-4 px-5 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Rishit Sinha
          </p>
          <p className="text-xs text-[var(--muted)]">
            Shipping fast, breaking less, learning always.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Rishit-Sinha10"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/rishit-sinha-6953ab363"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/RishitSinh41144"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="X (Twitter)"
          >
            <TwitterXIcon className="h-5 w-5" />
          </a>
          <a
            href="mailto:Sinharishit04@gmail.com"
            className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            aria-label="Email"
          >
            <GmailIcon className="h-5 w-5" />
          </a>
        </div>

        <p className="text-[11px] text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Rishit Sinha
        </p>
      </div>
    </footer>
  );
}
