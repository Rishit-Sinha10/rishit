"use client";
import { Reveal } from "../pages/reavel";
import Link from "next/link";
import { LinkPreview } from "../components/link_preview";

export default function About() {
  return (
    <section className="mx-auto w-full max-w-[768px] px-5 py-12">
      <Reveal>
        <div className="mb-12">
          <p className="text-label mb-2">About</p>
          <h1 className="heading-section text-[var(--foreground)]">
            The long version
          </h1>
        </div>
      </Reveal>

      <div className="flex flex-col gap-12">
        {/* Where I started */}
        <Reveal delay={0.05}>
          <Section label="Where I started">
            <p>
              I didn&apos;t set out to become a software engineer. I started by
              being curious about how things on the internet actually worked —
              why a button did what it did, how a page knew your name, what
              happened between clicking &quot;submit&quot; and seeing a result.
            </p>
            <p>
              That curiosity pulled me into computer science. I spent the early
              days bouncing between tutorials, breaking small projects, and
              slowly learning that the real skill isn&apos;t writing code —
              it&apos;s understanding the problem well enough that the code
              becomes obvious.
            </p>
          </Section>
        </Reveal>

        {/* Turning points */}
        <Reveal delay={0.05}>
          <Section label="Turning points">
            <p>
              The first real turning point was building{" "}
              <LinkPreview url="https://finan-cino.vercel.app/">
                <Link
                  href="/work/financinno"
                  className="font-medium text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 transition hover:decoration-[var(--foreground)]"
                >
                  FinanCinno
                </Link>
              </LinkPreview>
              . Not because it was the most complex thing I&apos;d built, but
              because it was the first time I shipped something people actually
              used. It taught me that a good product isn&apos;t about features —
              it&apos;s about clarity. The experience should feel calm, not
              crowded.
            </p>
            <p>
              Then came my internships. At{" "}
              <LinkPreview url="https://thetastymillets.com/">
                <span className="font-medium text-[var(--foreground)]">
                  TheTastyMillets
                </span>
              </LinkPreview>
              , I learned what production code looks like — the kind that has to
              work for real users, not just pass a demo. I built responsive UI
              components across 12+ pages and deep-dived into accessibility in
              ways no textbook had taught me.
            </p>
            <p>
              At{" "}
              <LinkPreview url="https://www.nextlearn.in/">
                <span className="font-medium text-[var(--foreground)]">
                  NextLearn Technologies
                </span>
              </LinkPreview>
              , I went full-stack. I designed and deployed a learning
              application that cut page load time by 65%. But the bigger lesson
              was shipping 8 product features on schedule — learning to balance
              speed with quality under real constraints.
            </p>
            <p>
              Each project after that —{" "}
              <LinkPreview url="https://lumina-nine-tan.vercel.app/">
                <Link
                  href="/work/notemog"
                  className="font-medium text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 transition hover:decoration-[var(--foreground)]"
                >
                  NoteMog
                </Link>
              </LinkPreview>
              ,{" "}
              <LinkPreview url="https://echo-rizz.vercel.app/">
                <Link
                  href="/work/Flux"
                  className="font-medium text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 transition hover:decoration-[var(--foreground)]"
                >
                  Flux
                </Link>
              </LinkPreview>
              ,{" "}
              <LinkPreview url="https://zecoai.vercel.app/">
                <Link
                  href="/work/zecoai"
                  className="font-medium text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 transition hover:decoration-[var(--foreground)]"
                >
                  ZecoAI
                </Link>{" "}
              </LinkPreview>
              — pushed me in a different direction. Real-time systems,
              collaborative tools, AI-assisted workflows. Each one reinforced
              the same idea: the best interfaces stay out of the way.
            </p>
          </Section>
        </Reveal>

        {/* Where I am now */}
        <Reveal delay={0.05}>
          <Section label="Where I am now">
            <p>
              I&apos;m a final-year CS student focused on backend systems and
              full-stack product work. My day-to-day involves building things
              that are meant to ship — not sit in a repo.
            </p>
            <p>
              Right now I&apos;m most interested in the space between
              infrastructure and user experience: how the backend shapes what
              the frontend can promise, and how small design decisions ripple
              into reliability, speed, and trust.
            </p>
          </Section>
        </Reveal>

        {/* What drives me */}
        <Reveal delay={0.05}>
          <Section label="What drives me">
            <p>
              I&apos;m drawn to products that feel inevitable — the kind where
              every interaction makes sense on the first try. That means writing
              code that&apos;s boring in the best way: predictable,
              maintainable, and easy to hand off.
            </p>
            <p>
              Going forward, I want to work on systems where the engineering is
              invisible to the user but obvious to the next developer who reads
              the code. I&apos;m exploring distributed systems, developer
              tooling, and anything that makes building software feel less like
              a chore and more like a craft.
            </p>
          </Section>
        </Reveal>

        {/* Colophon */}
        <Reveal delay={0.05}>
          <div className="border-t border-[var(--border)] pt-8">
            <p className="text-label mb-3">Colophon</p>
            <p className="text-[15px] leading-7 text-[var(--muted)]">
              Built with Next.js, React, Tailwind CSS, and Framer Motion. Hosted
              on Vercel. Set in Satoshi.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-4 text-base font-semibold text-[var(--foreground)]">
        {label}
      </h2>
      <div className="flex flex-col gap-4 text-[18px] leading-[1.8] text-[var(--muted)]">
        {children}
      </div>
    </div>
  );
}
