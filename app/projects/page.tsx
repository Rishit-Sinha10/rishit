"use client";
import { Reveal } from "../pages/reavel";
import { PROJECTS } from "../../data/projects";
import { ProjectOverviewCard } from "../components/project-card";
export function Work() {
  return (
    <section
      id="work"
      className="mx-auto flex w-full max-w-4xl flex-col px-4 py-6 sm:px-6 md:px-8 lg:px-10"
    >
      <Reveal>
        <div className="mb-8">
          <p className="text-label mb-2">Selected work</p>
          <h2 className="heading-section text-[var(--foreground)]">Projects</h2>
        </div>
      </Reveal>
      <div className="flex flex-col gap-0 border border-[var(--border)] rounded-lg overflow-hidden">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="border-b border-[var(--border)] last:border-b-0"
          >
            <ProjectOverviewCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
export default Work;
