export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Refine + DI Example",
  description: "Example app using @abdokouta/refine with dependency injection",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Posts",
      href: "/posts",
    },
  ],
  links: {
    github: "https://github.com/pixielity-inc/refine",
  },
};
