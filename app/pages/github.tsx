"use client";
import { useEffect, useRef, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
const GITHUB_HANDLE = "Rishit-Sinha10";
const GITHUB_CONTRIBUTIONS_ENDPOINT =
  "https://github-contributions-api.jogruber.de/v4";
type HeatmapValue = { date: string; count: number };
type LiveContributionResponse = {
  contributions?: Array<{ date?: string; count?: number; level?: number }>;
};
export const sampleData = [
  { date: "2026-01-01", count: 1 },
  { date: "2026-01-02", count: 2 },
  { date: "2026-01-03", count: 0 },
  { date: "2026-01-04", count: 0 },
  { date: "2026-01-05", count: 2 },
  { date: "2026-01-06", count: 0 },
  { date: "2026-01-07", count: 0 },
  { date: "2026-01-08", count: 0 },
  { date: "2026-01-09", count: 8 },
  { date: "2026-01-10", count: 15 },
  { date: "2026-01-11", count: 0 },
  { date: "2026-01-12", count: 0 },
  { date: "2026-01-13", count: 2 },
  { date: "2026-01-14", count: 0 },
  { date: "2026-01-15", count: 0 },
  { date: "2026-01-16", count: 0 },
  { date: "2026-01-17", count: 0 },
  { date: "2026-01-18", count: 0 },
  { date: "2026-01-19", count: 3 },
  { date: "2026-01-20", count: 0 },
  { date: "2026-01-21", count: 0 },
  { date: "2026-01-22", count: 0 },
  { date: "2026-01-23", count: 0 },
  { date: "2026-01-24", count: 0 },
  { date: "2026-01-25", count: 0 },
  { date: "2026-01-26", count: 0 },
  { date: "2026-01-27", count: 0 },
  { date: "2026-01-28", count: 0 },
  { date: "2026-01-29", count: 8 },
  { date: "2026-01-30", count: 0 },
  { date: "2026-01-31", count: 0 },
  { date: "2026-02-01", count: 0 },
  { date: "2026-02-02", count: 0 },
  { date: "2026-02-03", count: 4 },
  { date: "2026-02-04", count: 0 },
  { date: "2026-02-05", count: 0 },
  { date: "2026-02-06", count: 0 },
  { date: "2026-02-07", count: 0 },
  { date: "2026-02-08", count: 0 },
  { date: "2026-02-09", count: 0 },
  { date: "2026-02-10", count: 0 },
  { date: "2026-02-11", count: 1 },
  { date: "2026-02-12", count: 22 },
  { date: "2026-02-13", count: 1 },
  { date: "2026-02-14", count: 15 },
  { date: "2026-02-15", count: 1 },
  { date: "2026-02-16", count: 0 },
  { date: "2026-02-17", count: 0 },
  { date: "2026-02-18", count: 0 },
  { date: "2026-02-19", count: 2 },
  { date: "2026-02-20", count: 0 },
  { date: "2026-02-21", count: 0 },
  { date: "2026-02-22", count: 0 },
  { date: "2026-02-23", count: 1 },
  { date: "2026-02-24", count: 2 },
  { date: "2026-02-25", count: 0 },
  { date: "2026-02-26", count: 0 },
  { date: "2026-02-27", count: 0 },
  { date: "2026-02-28", count: 0 },
  { date: "2026-03-01", count: 0 },
  { date: "2026-03-02", count: 0 },
  { date: "2026-03-03", count: 1 },
  { date: "2026-03-04", count: 0 },
  { date: "2026-03-05", count: 0 },
  { date: "2026-03-06", count: 5 },
  { date: "2026-03-07", count: 1 },
  { date: "2026-03-08", count: 22 },
  { date: "2026-03-09", count: 2 },
  { date: "2026-03-10", count: 3 },
  { date: "2026-03-11", count: 3 },
  { date: "2026-03-12", count: 3 },
  { date: "2026-03-13", count: 1 },
  { date: "2026-03-14", count: 0 },
  { date: "2026-03-15", count: 2 },
  { date: "2026-03-16", count: 1 },
  { date: "2026-03-17", count: 3 },
  { date: "2026-03-18", count: 4 },
  { date: "2026-03-19", count: 3 },
  { date: "2026-03-20", count: 0 },
  { date: "2026-03-21", count: 0 },
  { date: "2026-03-22", count: 3 },
  { date: "2026-03-23", count: 8 },
  { date: "2026-03-24", count: 0 },
  { date: "2026-03-25", count: 0 },
  { date: "2026-03-26", count: 3 },
  { date: "2026-03-27", count: 0 },
  { date: "2026-03-28", count: 1 },
  { date: "2026-03-29", count: 2 },
  { date: "2026-03-30", count: 0 },
  { date: "2026-03-31", count: 0 },
  { date: "2026-04-01", count: 0 },
  { date: "2026-04-02", count: 6 },
  { date: "2026-04-03", count: 6 },
  { date: "2026-04-04", count: 5 },
  { date: "2026-04-05", count: 0 },
  { date: "2026-04-06", count: 6 },
  { date: "2026-04-07", count: 6 },
  { date: "2026-04-08", count: 4 },
  { date: "2026-04-09", count: 2 },
  { date: "2026-04-10", count: 4 },
  { date: "2026-04-11", count: 0 },
  { date: "2026-04-12", count: 6 },
  { date: "2026-04-13", count: 0 },
  { date: "2026-04-14", count: 0 },
  { date: "2026-04-15", count: 0 },
  { date: "2026-04-16", count: 0 },
  { date: "2026-04-17", count: 0 },
  { date: "2026-04-18", count: 1 },
  { date: "2026-04-19", count: 2 },
  { date: "2026-04-20", count: 0 },
  { date: "2026-04-21", count: 0 },
  { date: "2026-04-22", count: 0 },
  { date: "2026-04-23", count: 0 },
  { date: "2026-04-24", count: 1 },
  { date: "2026-04-25", count: 0 },
  { date: "2026-04-26", count: 0 },
  { date: "2026-04-27", count: 0 },
  { date: "2026-04-28", count: 0 },
  { date: "2026-04-29", count: 0 },
  { date: "2026-04-30", count: 0 },
  { date: "2026-05-01", count: 0 },
  { date: "2026-05-02", count: 0 },
  { date: "2026-05-03", count: 0 },
  { date: "2026-05-04", count: 0 },
  { date: "2026-05-05", count: 0 },
  { date: "2026-05-06", count: 0 },
  { date: "2026-05-07", count: 0 },
  { date: "2026-05-08", count: 3 },
  { date: "2026-05-09", count: 0 },
  { date: "2026-05-10", count: 1 },
  { date: "2026-05-11", count: 3 },
  { date: "2026-05-12", count: 1 },
  { date: "2026-05-13", count: 0 },
  { date: "2026-05-14", count: 0 },
  { date: "2026-05-15", count: 0 },
  { date: "2026-05-16", count: 2 },
  { date: "2026-05-17", count: 0 },
  { date: "2026-05-18", count: 2 },
  { date: "2026-05-19", count: 2 },
  { date: "2026-05-20", count: 0 },
  { date: "2026-05-21", count: 0 },
  { date: "2026-05-22", count: 0 },
  { date: "2026-05-23", count: 0 },
  { date: "2026-05-24", count: 0 },
  { date: "2026-05-25", count: 0 },
  { date: "2026-05-26", count: 0 },
  { date: "2026-05-27", count: 0 },
  { date: "2026-05-28", count: 0 },
  { date: "2026-05-29", count: 0 },
  { date: "2026-05-30", count: 0 },
  { date: "2026-05-31", count: 0 },
  { date: "2026-06-01", count: 2 },
  { date: "2026-06-02", count: 1 },
  { date: "2026-06-03", count: 4 },
  { date: "2026-06-04", count: 4 },
  { date: "2026-06-05", count: 0 },
  { date: "2026-06-06", count: 0 },
  { date: "2026-06-07", count: 0 },
  { date: "2026-06-08", count: 0 },
  { date: "2026-06-09", count: 0 },
  { date: "2026-06-10", count: 1 },
  { date: "2026-06-11", count: 0 },
  { date: "2026-06-12", count: 15 },
  { date: "2026-06-13", count: 3 },
  { date: "2026-06-14", count: 1 },
  { date: "2026-06-15", count: 3 },
  { date: "2026-06-16", count: 0 },
  { date: "2026-06-17", count: 4 },
  { date: "2026-06-18", count: 2 },
  { date: "2026-06-19", count: 2 },
  { date: "2026-06-20", count: 20 },
  { date: "2026-06-21", count: 0 },
  { date: "2026-06-22", count: 7 },
  { date: "2026-06-23", count: 0 },
  { date: "2026-06-24", count: 0 },
  { date: "2026-06-25", count: 0 },
  { date: "2026-06-26", count: 6 },
  { date: "2026-06-27", count: 0 },
  { date: "2026-06-28", count: 2 },
  { date: "2026-06-29", count: 3 },
  { date: "2026-06-30", count: 3 },
  { date: "2026-07-01", count: 0 },
  { date: "2026-07-02", count: 1 },
  { date: "2026-07-03", count: 5 },
  { date: "2026-07-04", count: 0 },
  { date: "2026-07-05", count: 0 },
  { date: "2026-07-06", count: 0 },
  { date: "2026-07-07", count: 0 },
  { date: "2026-07-08", count: 0 },
  { date: "2026-07-09", count: 0 },
  { date: "2026-07-10", count: 4 },
];
export default function ContributionGraph({ values = sampleData }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activityValues, setActivityValues] = useState<HeatmapValue[]>(() =>
    Array.isArray(values) && values.length > 0 ? values : sampleData,
  );
  useEffect(() => {
    let isMounted = true;
    const loadLiveContributions = async () => {
      try {
        const response = await fetch(
          `${GITHUB_CONTRIBUTIONS_ENDPOINT}/${GITHUB_HANDLE}`,
        );
        if (!response.ok) {
          throw new Error(`GitHub contributions request failed: ${response.status}`);
        }
        const data = (await response.json()) as LiveContributionResponse;
        const contributions = Array.isArray(data.contributions)
          ? data.contributions
              .filter((item) => Boolean(item?.date))
              .map((item) => ({
                date: item.date as string,
                count: Number(item.count ?? 0),
              }))
          : [];
        if (isMounted && contributions.length > 0) {
          setActivityValues(contributions);
        }
      } catch {
        if (isMounted) {
          setActivityValues(
            Array.isArray(values) && values.length > 0 ? values : sampleData,
          );
        }
      }
    };
    loadLiveContributions();
    return () => {
      isMounted = false;
    };
  }, [values]);

  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);

  const totalContributions = activityValues.reduce(
    (sum: number, item: { count?: number }) => sum + (item.count ?? 0),
    0,
  );

  const year = today.getFullYear();

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section id="github" className="w-full">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="relative flex items-center gap-1">
          <button
            type="button"
            aria-label="Scroll earlier"
            onClick={() => scrollBy(-1)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-[var(--border)] p-1 text-[var(--muted)] transition hover:bg-[var(--accent-light)] sm:flex"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto scroll-smooth [scrollbar-width:thin]"
          >
            <div className="min-w-[720px] px-1 pb-1 sm:min-w-[780px] [&_.react-calendar-heatmap_.color-github-0]:fill-[#ebedf0] [&_.react-calendar-heatmap_.color-github-1]:fill-[#9be9a8] [&_.react-calendar-heatmap_.color-github-2]:fill-[#40c463] [&_.react-calendar-heatmap_.color-github-3]:fill-[#30a14e] [&_.react-calendar-heatmap_.color-github-4]:fill-[#216e39] [&_.react-calendar-heatmap_rect]:rx-[2px] [&_.react-calendar-heatmap_text]:fill-[var(--muted)] [&_.react-calendar-heatmap_text]:text-[9px] dark:[&_.react-calendar-heatmap_.color-github-0]:fill-[#161b22]">
              <CalendarHeatmap
                startDate={startDate}
                endDate={today}
                values={activityValues}
                classForValue={(value: { count?: number } | undefined) => {
                  const count = value?.count ?? 0;
                  if (count === 0) return "color-github-0";
                  if (count >= 10) return "color-github-4";
                  if (count >= 5) return "color-github-3";
                  if (count >= 2) return "color-github-2";
                  return "color-github-1";
                }}
                tooltipDataAttrs={(
                  value: { date?: string; count?: number } | undefined,
                ) => {
                  if (!value || !value.date) {
                    return { "data-tooltip-content": "No contributions" };
                  }
                  return {
                    "data-tooltip-content": `${value.count ?? 0} contribution${value.count === 1 ? "" : "s"}`,
                  };
                }}
                gutterSize={2.5}
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Scroll later"
            onClick={() => scrollBy(1)}
            className="hidden shrink-0 items-center justify-center rounded-full border border-[var(--border)] p-1 text-[var(--muted)] transition hover:bg-[var(--accent-light)] sm:flex"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-[var(--border)] pt-2 text-[10px] text-[var(--muted)] sm:text-xs">
          <span>
            <span className="font-semibold text-[var(--foreground)]">
              {totalContributions}
            </span>{" "}
            contributions in {year}
          </span>

          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Less</span>
            <div className="flex items-center gap-[2px] sm:gap-[3px]">
              {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map(
                (color) => (
                  <span
                    key={color}
                    className="h-2 w-2 rounded-[1px] sm:h-[10px] sm:w-[10px] sm:rounded-[2px]"
                    style={{ backgroundColor: color }}
                  />
                ),
              )}
            </div>
            <span className="hidden sm:inline">More</span>
          </div>
        </div>
        <Tooltip anchorSelect="[data-tooltip-content]" />
      </div>
    </section>
  );
}
