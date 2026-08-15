"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ProjectCaseStudy, Skill } from "../../data/projects";
function iconUrl(skill: Skill) {
  return skill.color
    ? `https://cdn.simpleicons.org/${skill.slug}/${skill.color}`
    : `https://cdn.simpleicons.org/${skill.slug}`;
}
function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div className="group relative flex">
      <span
        title={skill.name}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]"
      >
        <img
          src={iconUrl(skill)}
          alt={skill.name}
          width={12}
          height={12}
          loading="lazy"
          className="block"
        />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--foreground)] px-2 py-1 text-[10px] font-medium text-[var(--background)] opacity-0 shadow-md transition duration-150 group-hover:opacity-100">
        {skill.name}
      </span>
    </div>
  );
}
function StatusDot({ status, accent }: { status: string; accent: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: status === "Live" ? accent : "var(--muted)" }}
      />
      <span style={{ color: status === "Live" ? accent : "var(--muted)" }}>
        {status}
      </span>
    </span>
  );
}
export function ProjectOverviewCard({ project }: { project: ProjectCaseStudy }) {
  return (
    <Link href={`/work/${project.id}`} className="block w-full no-underline">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-6 sm:px-6 md:px-8 lg:px-10 transition duration-150 ease-out hover:bg-[var(--accent-light)]">
        <div className="mb-2.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            {project.title}
          </h3>
          <StatusDot status={project.status} accent={project.accent} />
        </div>
        <p className="mb-3 text-[15px] leading-relaxed text-[var(--muted)]">
          {project.tagline}
        </p>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.skills.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]">
          Read case study
          <ArrowUpRight size={12} />
        </div>
      </div>
    </Link>
  );
}
