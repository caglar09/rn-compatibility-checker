---
title: FAQ (Frequently Asked Questions)
---

# Frequently Asked Questions

This page contains frequently asked questions and answers about the rn-compatibility-checker package.

## General Questions

### What is rn-compatibility-checker?

rn-compatibility-checker is a command-line tool that checks the platform compatibility of dependencies in React Native projects. It analyzes your project's package.json file and verifies whether the React Native libraries you use support iOS, Android, Web, Expo Go, and the New Architecture.

### Why should I use this tool?

In React Native development, knowing which platforms your dependencies support is crucial, especially when building cross-platform (iOS, Android, Web) applications. This tool automates the compatibility checking process, saving you time and helping you avoid platform-specific errors.

### What is the data source?

rn-compatibility-checker uses data from the [React Native Directory](https://reactnative.directory/) project. This community-maintained directory includes compatibility information for over 1700 React Native libraries.

### Which platforms can I check?

Currently, you can check compatibility for the following platforms:
- iOS
- Android
- Web
- Expo Go
- New Architecture

## Installation and Usage

### How do I install it?

You can install rn-compatibility-checker in several ways:

**Global Installation:**
```bash
npm install -g rn-compatibility-checker
```

**As a Project Dependency:**
```bash
npm install --save-dev rn-compatibility-checker
```

**Without Installation (using npx):**
```bash
npx rn-compatibility-checker ./package.json
```

For detailed installation instructions, see the [Installation](./docs/installation) page.

### How do I use it?

The simplest usage is to provide your project's package.json file as an argument:

```bash
rn-compatibility-checker ./package.json
```

For more examples, see the [Usage](./docs/usage) page.

### How do I check specific platforms?

Use the `-p` or `--platforms` option to specify which platforms to check:

```bash
rn-compatibility-checker ./package.json -p ios,android,web,expoGo
```

### How do I get a detailed report?

Use the `-d` or `--detailed` flag for a more comprehensive report:

```bash
rn-compatibility-checker ./package.json -d
```

## Troubleshooting

### I'm getting a "Package not found" error. What should I do?

This error indicates that the package is not present in the React Native Directory data source. Possible reasons:
1. The package name is misspelled.
2. The package is not a React Native library.
3. The package has not been added to the React Native Directory yet.

Ensure the package name is correct. If it is a valid React Native library but missing, you can submit a Pull Request to the [React Native Directory GitHub repository](https://github.com/react-native-community/directory).

### I'm getting a "Data source could not be loaded" error. What should I do?

This error means the tool could not access the React Native Directory data source. Possible causes:
1. Internet connectivity issues.
2. GitHub API rate limits or access problems.
3. Temporary unavailability of the data source.

Check your internet connection and try again later. If the issue persists, consider using a custom data source as explained in the [Advanced Usage](./docs/examples/advanced-usage) page.

### How can I integrate this into my CI/CD pipeline?

rn-compatibility-checker can be integrated into CI/CD pipelines easily. Examples for GitHub Actions, GitLab CI/CD, Jenkins, and CircleCI are available on the [CI/CD Integration](./docs/examples/ci-integration) page.

### Can I use it programmatically?

Yes. You can import and use the tool in JavaScript:

```javascript
const { checkCompatibility } = require('rn-compatibility-checker');

const results = checkCompatibility('./package.json', {
  platforms: 'ios,android,web',
  detailed: true,
});

console.log(results);
```

See the [Advanced Usage](./docs/examples/advanced-usage) page for more examples.

## Contributing

### How can I contribute?

rn-compatibility-checker is open source and welcomes contributions. To contribute:
1. Fork the repository.
2. Make your changes.
3. Add tests.
4. Open a Pull Request.

### How do I report a bug?

If you discover a bug, please open an issue in the GitHub repository. Include steps to reproduce, expected behavior, and actual behavior.

### How do I request a new feature?

To request a feature, open an issue on GitHub. Describe the feature, why it is useful, and how it should work.

## Other Questions

### How often is the data source updated?

The React Native Directory is continuously maintained by the community. rn-compatibility-checker uses the latest data each time it runs.

### Can I use a custom data source?

Yes. Use a custom data source via the programmatic API as described on the [Advanced Usage](./docs/examples/advanced-usage) page.

### Does this tool work in monorepos?

Yes. You can check each package.json individually:

```bash
rn-compatibility-checker ./packages/mobile/package.json
rn-compatibility-checker ./packages/web/package.json
```

### Can I use this tool in Expo projects?

Yes. Expo projects include a package.json file that can be analyzed by rn-compatibility-checker.