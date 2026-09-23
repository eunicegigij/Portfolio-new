import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col justify-center px-5 py-24">
      <p className="font-mono text-xs tracking-[0.18em] text-primary-dark uppercase">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-charcoal">
        That page is not on this site.
      </h1>
      <p className="mt-4 text-muted">
        The work, experience, and contact sections are still on the home page.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex text-sm font-medium text-primary-dark hover:text-primary"
      >
        Back home
      </Link>
    </section>
  );
}
