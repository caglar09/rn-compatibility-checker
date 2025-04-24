---
sidebar_position: 1
---

# Examples

This section contains various usage scenarios and examples for the rn-compatibility-checker package. You can find examples ranging from basic usage to advanced scenarios.

## Overview

The rn-compatibility-checker package is used to check the platform compatibility of dependencies in React Native projects. In this section, you can find the following example scenarios:

- [Basic Usage](./basic-usage.md): Simple command-line usage and basic scenarios
- [Advanced Usage](./advanced-usage.md): Customized checks and programmatic usage
- [CI/CD Integration](./ci-integration.md): Integrating into continuous integration pipelines

## Quick Start

The simplest usage is to provide your project's package.json file as an argument:

```bash
# With global installation
rn-compatibility-checker ./package.json

# Or using npx
npx rn-compatibility-checker ./package.json
```

This command detects the React Native dependencies in your project's package.json file and checks their platform compatibility.

## Example Output

```
React Native Libraries Compatibility Report
==================================================
╔═════════════════════════════════╤══════════╤═════════╤═════╤═════════╤═════╗
║ Package                         │ Version  │ Found   │ ios │ android │ web ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native                    │ 0.72.6   │ ✓       │ ✓   │ ✓       │ ✓   ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native-gesture-handler    │ ^2.12.0  │ ✓       │ ✓   │ ✓       │ ✓   ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native-reanimated         │ ^3.3.0   │ ✓       │ ✓   │ ✓       │ ✓   ║
╚═════════════════════════════════╧══════════╧═════════╧═════╧═════════╧═════╝

Summary:
Total packages: 3
Found packages: 3
Missing packages: 0

Platform compatibility:
ios: 3/3 (100%)
android: 3/3 (100%)
web: 3/3 (100%)
```

## More Examples

For more examples and usage scenarios, check out the other pages in this section. Each example includes step-by-step explanations and code snippets.
