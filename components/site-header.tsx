"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      data-inert-with-intro
      className={`site-header sticky top-0 z-40 border-b text-white ${
        scrolled
          ? "border-white/10 bg-navy/95 backdrop-blur"
          : "border-transparent bg-navy"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/#top" className="text-sm font-semibold tracking-tight">
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-blue-100 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.resumePath}
            className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Resume
          </a>
          <a
            href={site.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={site.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/10 bg-navy px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-2 py-2 text-blue-50 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-4 px-2">
              <a
                href={site.resumePath}
                className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium"
              >
                Resume
              </a>
              <a
                href={site.github}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={site.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
