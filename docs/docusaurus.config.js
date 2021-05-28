/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "ChunkScript",
  tagline: "The first programming language for pro coders only",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "cpimhoff",
  projectName: "ChunkScript",
  themeConfig: {
    navbar: {
      title: "ChunkScript",
      logo: {
        alt: "ChunkScript",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Docs",
        },
        { to: "/proposals", label: "Proposals", position: "left" },
        {
          href: "https://github.com/cpimhoff/ChunkScript",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/installation/easy-install",
            },
          ],
        },
      ],
      copyright: `ChunkScript is licensed under the MIT license.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/cpimhoff/ChunkScript/edit/master/docs/docs/",
        },
        blog: {
          path: "proposals",
          routeBasePath: "proposals",
          blogTitle: "ChunkScript Evolution Proposals",
          blogSidebarTitle: "All Proposals",
          showReadingTime: false,
          editUrl:
            "https://github.com/cpimhoff/ChunkScript/edit/master/docs/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
