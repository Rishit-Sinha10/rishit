"use client";

import { Reveal } from "./reavel";
import { motion } from "motion/react";

const EXPERIENCES = [
  {
    id: "01",
    title: "Frontend Developer",
    company: "TheTastyMillets",
    period: "May 2026 — Aug 2026",
    description: [
      "Built 12+ responsive page components with React.js and Tailwind CSS, achieving full component reusability across the product.",
      "Implemented WCAG 2.1 AA accessibility standards — keyboard navigation, screen reader support, and color contrast — reducing user navigation friction measurably.",
      "Collaborated with design and backend teams to ship a production-ready frontend in a 3-month sprint cycle.",
    ],
  },
  {
    id: "02",
    title: "Full Stack Intern",
    company: "NextLearn Technologies",
    period: "Apr 2026 — May 2026",
    description: [
      "Designed and deployed a learning application with React + Node.js, reducing page load time by 65% (4.2s → 1.1s) through code splitting, lazy loading, and bundle optimization.",
      "Shipped 8 product features on schedule — including auth, dashboards, and real-time notifications — balancing speed with production-quality code.",
      "Built RESTful API endpoints with Express.js and integrated MongoDB for flexible data storage across course modules and user progress.",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto flex w-full max-w-4xl flex-col px-4 py-6 sm:px-6 md:px-8 lg:px-10"
    >
      <Reveal>
        <div className="mb-8">
          <p className="text-label mb-2">Experience</p>
          <h2 className="heading-section text-[var(--foreground)]">
            Where I&apos;ve worked
          </h2>
        </div>
      </Reveal>

      <div className="flex flex-col">
        {EXPERIENCES.map((exp, index) => (
          <Reveal key={exp.id}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="flex gap-4 border-b border-[var(--border)] py-5"
            >
              <div className="shrink-0 pt-0.5 text-xs font-bold tracking-[0.16em] text-[var(--muted)] opacity-80 min-w-[42px]">
                {exp.id}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-[var(--foreground)]">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">{exp.company}</p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-[var(--muted)]">
                    {exp.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2 pl-4">
                  {exp.description.map((desc, i) => (
                    <li
                      key={i}
                      className="relative pl-3 text-[15px] leading-relaxed text-[var(--muted)]"
                    >
                      <span className="absolute left-0 top-0 text-[var(--border)]">
                        •
                      </span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
