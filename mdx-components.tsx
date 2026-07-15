import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="heading-section text-[var(--foreground)]">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 text-2xl font-bold text-[var(--foreground)]" style={{ letterSpacing: "-0.02em" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-[var(--foreground)]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[18px] leading-[1.8] text-[var(--muted)]">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 transition hover:decoration-[var(--foreground)]"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc pl-6 text-[var(--muted)]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal pl-6 text-[var(--muted)]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="mb-2 text-[18px] leading-[1.8]">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-[var(--border)] pl-4 text-[var(--muted)] italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-[var(--background-secondary)] px-1.5 py-0.5 text-[14px] font-mono text-[var(--foreground)]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] p-4 text-[14px] leading-relaxed">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-8 border-[var(--border)]" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[15px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[var(--border)]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 font-medium text-[var(--foreground)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-[var(--muted)]">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
