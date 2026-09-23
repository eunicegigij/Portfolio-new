import {
  siBitcoin,
  siCss,
  siDatadog,
  siDigitalocean,
  siDocker,
  siExpress,
  siGithubactions,
  siGooglecloud,
  siGrafana,
  siHtml5,
  siJavascript,
  siLinux,
  siMetabase,
  siMongodb,
  siMysql,
  siNestjs,
  siNetlify,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRender,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  React: siReact,
  HTML: siHtml5,
  CSS: siCss,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  "Express.js": siExpress,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  MySQL: siMysql,
  Redis: siRedis,
  Docker: siDocker,
  Linux: siLinux,
  "GitHub Actions": siGithubactions,
  DigitalOcean: siDigitalocean,
  "Google Cloud": siGooglecloud,
  Render: siRender,
  Vercel: siVercel,
  Netlify: siNetlify,
  Grafana: siGrafana,
  Datadog: siDatadog,
  Metabase: siMetabase,
  Bitcoin: siBitcoin,
};

export function TechIcon({ name }: { name: string }) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}
