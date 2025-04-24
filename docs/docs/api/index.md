---
sidebar_position: 1
---

# API Reference

This section contains the API reference documentation for the rn-compatibility-checker package. The package is modular and consists of several components.

## Overview

The rn-compatibility-checker package consists of the following main modules:

1. **CLI Interface**: Processes command-line arguments and invokes other modules
2. **Package.json Parser**: Reads the project's package.json file and extracts React Native dependencies
3. **Compatibility Checker**: Checks platform compatibility of dependencies and formats the results

These modules work together to enable platform compatibility checks for dependencies in React Native projects.

## Modules

For detailed information about each module in the package, see the following pages:

- [CLI Interface](./cli.md): Command-line interface and argument handling
- [Compatibility Checker](./compatibility-checker.md): Compatibility checking and result formatting
- [Package.json Parser](./package-json-parser.md): Reading package.json files and extracting dependencies

## Programmatic Usage

The rn-compatibility-checker package can be used both as a CLI tool and programmatically:

```javascript
const { checkCompatibility } = require('rn-compatibility-checker');

// Perform a compatibility check
const results = checkCompatibility('./package.json', {
  platforms: 'ios,android,web,windows',
  detailed: true,
  format: 'csv',
  version: false
});

// Process the results
console.log(`Total packages: ${results.length}`);
console.log(`iOS-compatible packages: ${results.filter(r => r.platforms.ios).length}`);
```

This programmatic API is useful for scenarios such as CI/CD pipeline integration or building custom tools.
