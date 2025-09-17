import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import { generateScalarConfigs } from './scalar-configs';
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Agile Software Engineering 25",
  tagline: "Hochschul Verwaltungs System",
  favicon: "img/favicon.ico",

  url: "https://agile-software-engineering-25.github.io", // <- No trailing slash
  baseUrl: "/documentation/", // <- Important: starts and ends with a slash if using trailingSlash: true
  organizationName: "Agile-Software-Engineering-25", // <- GitHub org name
  projectName: "documentation", // <- Repo name
  trailingSlash: false, // Recommended to avoid double slashes on GitHub Pages

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "requirements",
        path: "requirements",
        routeBasePath: "requirements",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "service-definitions",
        path: "service-definitions",
        routeBasePath: "service-definitions",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    // Spread all the Scalar configurations from the TypeScript function
    ...generateScalarConfigs(),
  ],

  // Set the production url of your site here
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/Agile-Software-Engineering-25/documentation/edit/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "SAU",
      logo: {
        alt: "SAU Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "documentationSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          to: "requirements/intro",
          sideBarId: "requirementsSidebar",
          position: "left",
          label: "Requirements",
          activeBaseRegex: "/requirements/",
        },
        {
          to: "service-definitions/intro",
          sideBarId: "serviceDefinitionsSidebar",
          position: "left",
          label: "Service Definitions",
          activeBaseRegex: "/service-definitions/",
        },
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Overview",
          items: [
            {
              label: "Docs",
              to: "/docs/intro",
            },
            {
              label: "Requirements",
              to: "/requirements/intro",
            },
            {
              label: "Service Definitions",
              to: "/service-definitions/intro",
            },
          ],
        },

        {
          title: "Community",
          items: [
            {
              label: "Jira",
              href: "https://jira.telekom.de/secure/RapidBoard.jspa?rapidView=50753&projectKey=ASE",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/orgs/Agile-Software-Engineering-25",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Agile Software Engineering 25, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
