/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction"
    },
    {
      type: "doc",
      id: "installation",
      label: "Installation"
    },
    {
      type: "doc",
      id: "usage",
      label: "Usage"
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        "api/index",
        "api/cli",
        "api/compatibility-checker",
        "api/package-json-parser"
      ]
    },
    {
      type: "category",
      label: "Examples",
      items: [
        "examples/index",
        "examples/basic-usage",
        "examples/advanced-usage",
        "examples/ci-integration"
      ]
    }
  ]
};

module.exports = sidebars;
