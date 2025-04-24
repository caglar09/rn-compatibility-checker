---
sidebar_position: 3
---

# Usage

Using RN Compatibility Checker is straightforward. This page explains basic and advanced usage scenarios.

## Basic Usage

The simplest usage is to provide your project's package.json file as an argument:

```bash
rn-compatibility-checker ./package.json
```

This command:
1. Reads your project's package.json file
2. Detects React Native-related dependencies
3. Checks platform compatibility for each dependency
4. Displays results in a table format

## CLI Options

RN Compatibility Checker offers various command-line options:

```bash
rn-compatibility-checker <path-to-package.json> [options]
```

### Options

- `-p, --platforms <platforms>`: Platforms to check (comma-separated): ios,android,web,expoGo,newArchitecture (default: "ios,android,web")
- `-d, --detailed`: Show detailed output (default: false)
- `-f, --format`: Output format: table,csv (default: "table")
- `-v, --version`: Display version information
- `-h, --help`: Display help information

### Examples

Check specific platforms:
```bash
rn-compatibility-checker ./package.json -p ios,android,web,expoGo
```

Get a detailed report:
```bash
rn-compatibility-checker ./package.json -d
```

## Output Explanation

RN Compatibility Checker provides two types of output: a detailed table report and summary information.

### Table Report

```
╔═════════════════════════════════╤══════════╤═════════╤═════╤═════════╤═════╗
║ Package                         │ Version  │ Found   │ ios │ android │ web ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native                    │ 0.72.6   │ ✓       │ ✓   │ ✓       │ ✓   ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native-gesture-handler    │ ^2.12.0  │ ✓       │ ✓   │ ✓       │ ✓   ║
╚═════════════════════════════════╧══════════╧═════════╧═════╧═════════╧═════╝
```

- **Package**: Dependency name  
- **Version**: Version specified in package.json  
- **Found**: Whether the package was found in the React Native Directory data source  
- **ios/android/web/etc.**: Whether the package supports the specified platform  

### Summary

```
Summary:
Total packages: 8
Found packages: 8
Missing packages: 0

Platform compatibility:
ios: 8/8 (100%)
android: 8/8 (100%)
web: 7/8 (88%)
```

This summary allows you to quickly assess the overall platform compatibility of your project.

## Detailed Mode

Running with the `-d` or `--detailed` option displays additional information:

```bash
rn-compatibility-checker ./package.json -d
```

Detailed mode includes the following extra information:
- **New Architecture**: Whether the package supports the React Native New Architecture  
- **Unmaintained**: Whether the package is marked as unmaintained  

## CI/CD Integration

RN Compatibility Checker can be easily integrated into CI/CD pipelines. For example, to add it to a GitHub Actions workflow:

```yaml
name: Check React Native Compatibility

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  check-compatibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Check compatibility
        run: npx rn-compatibility-checker ./package.json
```

This workflow will automatically run compatibility checks on every push and pull request.

## Troubleshooting

If you're getting a "Package not found" error:
- This means the package is not present in the React Native Directory data source  
- Verify the package name is correct  
- The package may not be a React Native library  

For more troubleshooting information, see the [FAQ](../faq) page.
