"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../../lib/utils";
import Proof from "../../public/Images/imag1.png";
import { useActiveSection } from "../hooks/useActiveSection";

const NAV_LINKS = [
  { label: "Home", href: "/", section: null },
  { label: "About", href: "/about", section: null },
  { label: "Blog", href: "/blog", section: null },
  { label: "Projects", href: "/projects", section: null },
  { label: "Experience", href: "/experience", section: null },
];

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === "/";
  const sectionIds = useMemo(
    () => NAV_LINKS.filter((l) => l.section).map((l) => l.section!),
    [],
  );
  const activeSection = useActiveSection(isHome ? sectionIds : []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-[768px] items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src={Proof}
            alt="Rishit Image"
            width={18}
            height={18}
            className="rounded-full object-cover"
          />
          <div></div>
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.section
                ? isHome && activeSection === link.section
                : link.href === "/"
                  ? isHome && !activeSection
                  : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-[13px] font-medium transition no-underline",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className={cn(
              "rounded-full border p-2 transition",
              mounted && resolvedTheme === "dark",
            )}
            aria-label={
              resolvedTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun size={15} />
            ) : (
              <Moon size={15} />
            )}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-md p-2 text-[var(--muted)] transition hover:text-[var(--foreground)] sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] px-5 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.section
                ? isHome && activeSection === link.section
                : link.href === "/"
                  ? isHome && !activeSection
                  : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition no-underline",
                    isActive
                      ? "bg-[var(--accent-light)] text-[var(--accent)]"
                      : "text-[var(--muted)] hover:bg-[var(--accent-light)] hover:text-[var(--foreground)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
