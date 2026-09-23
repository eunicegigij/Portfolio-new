export const site = {
  name: "Eunice Jacob",
  title: "Software Engineer",
  email: "eunice.gigij@gmail.com",
  github: "https://github.com/eunicegigijacob",
  linkedin: "https://www.linkedin.com/in/eunice-jacob-6a0840252/",
  location: "Nigeria",
  resumePath: "/resume.pdf",
  description:
    "Software Engineer with 4+ years of experience building backend and full-stack systems across payments, financial infrastructure, APIs, integrations, and reliable distributed workflows.",
  metaTitle:
    "Eunice Jacob — Software Engineer | Backend · Full-Stack · Fintech",
} as const;

export const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (value) return value;
  return "http://localhost:3000";
}
