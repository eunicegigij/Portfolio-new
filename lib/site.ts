export const site = {
  name: "Eunice Jacob",
  title: "Software Engineer",
  email: "eunice.gigij@gmail.com",
  github: "https://github.com/eunicegigijacob",
  linkedin: "https://www.linkedin.com/in/eunice-jacob-6a0840252/",
  location: "Nigeria",
  resumePath: "/resume.pdf",
  description:
    "Product-minded, backend-heavy software engineer with 4+ years building across SaaS, health-tech, payments, APIs, and Bitcoin infrastructure.",
  metaTitle:
    "Eunice Jacob — Software Engineer | Backend · Full-Stack · Product",
} as const;

export const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;

function toOrigin(value: string | undefined) {
  const trimmed = value?.trim().replace(/\/$/, "");
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  return (
    toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    toOrigin(process.env.VERCEL_URL) ??
    "http://localhost:3000"
  );
}
