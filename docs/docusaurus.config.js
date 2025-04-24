// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'RN Compatibility Checker',
  tagline: 'CLI tool for checking platform compatibility of React Native libraries',
  url: 'https://rn-compatibility-checker.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'rn-compatibility-checker',
  projectName: 'rn-compatibility-checker',

  scripts: [
    {
      src: '/js/responsive.js',
      async: true,
    },
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/rn-compatibility-checker/rn-compatibility-checker/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/rn-compatibility-checker/rn-compatibility-checker/edit/main/website/blog/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/responsive.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0'},
        {name: 'description', content: 'CLI tool for checking platform compatibility of React Native libraries'},
        {name: 'keywords', content: 'react-native, compatibility, platform, checker, ios, android, web, expo'},
        {name: 'theme-color', content: '#4f46e5'},
      ],
      navbar: {
        title: 'RN Compatibility Checker',
        logo: {
          alt: 'RN Compatibility Checker Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'api/index',
            position: 'left',
            label: 'API',
          },
          {
            type: 'doc',
            docId: 'examples/index',
            position: 'left',
            label: 'Examples',
          },
          {
            to: '/faq',
            label: 'FAQ',
            position: 'left'
          },
          {
            to: '/troubleshooting',
            label: 'Troubleshooting',
            position: 'left'
          },
          {
            href: 'https://github.com/rn-compatibility-checker/rn-compatibility-checker',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Installation',
                to: '/docs/installation',
              },
              {
                label: 'Usage',
                to: '/docs/usage',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'API Reference',
                to: '/docs/api/index',
              },
              {
                label: 'Examples',
                to: '/docs/examples/index',
              },
              {
                label: 'FAQ',
                to: '/faq',
              },
              {
                label: 'Troubleshooting',
                to: '/troubleshooting',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/rn-compatibility-checker/rn-compatibility-checker',
              },
              {
                label: 'React Native Directory',
                href: 'https://reactnative.directory/',
              },
              {
                label: 'NPM Package',
                href: 'https://www.npmjs.com/package/rn-compatibility-checker',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} RN Compatibility Checker. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'yaml', 'groovy'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      announcementBar: {
        id: 'support_us',
        content: '⭐️ If you like RN Compatibility Checker, don\'t forget to star us on GitHub!',
        backgroundColor: '#4f46e5',
        textColor: '#fff',
        isCloseable: true,
      },
    }),
};

module.exports = config;
