export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "@abdokouta/react-redis",
  description:
    "Browser-compatible Redis client using Upstash HTTP API for React",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Configuration", href: "/config" },
    { label: "Advanced", href: "/advanced" },
  ],
  navMenuItems: [
    { label: "Home", href: "/" },
    { label: "Configuration", href: "/config" },
    { label: "Advanced", href: "/advanced" },
  ],
  links: {
    github: "https://github.com/abdokouta/redis",
    docs: "https://github.com/abdokouta/redis#readme",
    twitter: "https://twitter.com/abdokouta",
    discord: "https://discord.gg/abdokouta",
    sponsor: "https://github.com/sponsors/abdokouta",
  },
};
