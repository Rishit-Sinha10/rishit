import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Github } from "lucide-react";
import {
  PROJECTS,
  type Skill,
  type SkillCategory,
} from "../../../data/projects";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps & Tooling",
  AI: "AI & ML",
};

const CATEGORY_ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "devops",
  "AI",
];

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
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">
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

function Eyebrow({ label }: { label: string }) {
  return <p className="text-label mb-2">{label}</p>;
}

function CodeBlock({
  snippet,
}: {
  snippet: { language: string; filename: string; code: string };
}) {
  return (
    <div className="code-block">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--muted)] opacity-30" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--muted)] opacity-30" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--muted)] opacity-30" />
        </div>
        <span className="ml-2 text-[11px] text-[var(--muted)]">
          {snippet.filename}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="text-[var(--foreground)]">{snippet.code}</code>
      </pre>
    </div>
  );
}

function ProjectCaseStudyView({
  project,
}: {
  project: (typeof PROJECTS)[0];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-[var(--border)] pb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-label mb-2">Selected work</p>
            <h1
              className="heading-section text-[var(--foreground)]"
              style={{ lineHeight: 1.2 }}
            >
              {project.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusDot status={project.status} accent={project.accent} />
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold no-underline text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              Visit
              <ArrowUpRight size={12} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--muted)] no-underline transition hover:text-[var(--foreground)]"
            >
              <Github size={12} />
              Code
            </a>
          </div>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
          {project.tagline}
        </p>
      </div>

      <section className="border-b border-[var(--border)] py-4">
        <Eyebrow label="Summary" />
        <div className="flex flex-col gap-2">
          {project.summary.map((item) => (
            <p
              key={item}
              className="text-[15px] leading-relaxed text-[var(--foreground)]"
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-4">
        <Eyebrow label="Problem" />
        <p className="text-[15px] leading-relaxed text-[var(--foreground)]">
          {project.problem}
        </p>
      </section>

      <section className="border-b border-[var(--border)] py-4">
        <Eyebrow label="Solution" />
        <p className="text-[15px] leading-relaxed text-[var(--foreground)]">
          {project.solution}
        </p>
      </section>

      <section className="border-b border-[var(--border)] py-4">
        <Eyebrow label="Features" />
        <div className="flex flex-col gap-3">
          {project.features.map((feature) => (
            <div key={feature.label} className="flex flex-col gap-0.5">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-1.5">
                <strong className="text-[15px] text-[var(--foreground)]">
                  {feature.label}
                </strong>
                <span className="text-[14px] leading-relaxed text-[var(--muted)]">
                  {feature.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-4">
        <Eyebrow label="Architecture" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5">
            {CATEGORY_ORDER.map((cat) => {
              const skillsInCat = project.skills.filter(
                (s) => s.category === cat,
              );
              if (skillsInCat.length === 0) return null;
              return (
                <div key={cat}>
                  <p className="text-label mb-1.5 opacity-60">
                    {CATEGORY_LABELS[cat]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skillsInCat.map((skill) => (
                      <SkillBadge key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            {project.architecture.flow.map((step) => (
              <p
                key={step}
                className="text-[14px] leading-relaxed text-[var(--muted)]"
              >
                {step}
              </p>
            ))}
          </div>
        </div>
      </section>

      {project.codeSnippet && (
        <section className="border-b border-[var(--border)] py-4">
          <Eyebrow label="Key code" />
          <CodeBlock snippet={project.codeSnippet} />
        </section>
      )}

      <section className="pt-4">
        <Eyebrow label="Results" />
        <div className="flex flex-col gap-2">
          {project.results.map((result) => (
            <p
              key={result}
              className="text-[15px] leading-relaxed text-[var(--foreground)]"
            >
              {result}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Rishit Sinha`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-screen justify-center px-5 py-8">
      <div className="w-full max-w-[768px]">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] no-underline transition hover:text-[var(--foreground)]"
        >
          ← Back to portfolio
        </Link>
        <ProjectCaseStudyView project={project} />
      </div>
    </main>
  );
}
