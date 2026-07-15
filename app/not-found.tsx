import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-label">404</p>
      <h1 className="heading-section mt-3 text-[var(--foreground)]">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-body">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] no-underline transition hover:bg-[var(--accent-hover)]"
      >
        Back to home
      </Link>
    </div>
  );
}
