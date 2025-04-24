---
sidebar_position: 2
---

# Basic Usage

This page explains the basic usage scenarios of the rn-compatibility-checker package step by step.

## Installation

Before you begin, you need to install the rn-compatibility-checker package. You can do this in several ways:

### Global Installation

```bash
npm install -g rn-compatibility-checker
```

### Install as a Project Dependency

```bash
npm install --save-dev rn-compatibility-checker
```

### Using with npx (Without Installation)

```bash
npx rn-compatibility-checker ./package.json
```

## Basic Command Line Usage

### Checking Default Platforms

The simplest usage is to provide your project's package.json file as an argument:

```bash
rn-compatibility-checker ./package.json
```

This command checks compatibility for the default platforms: iOS, Android, and Web.

### Checking Specific Platforms

Use the `-p` or `--platforms` option to specify particular platforms:

```bash
rn-compatibility-checker ./package.json -p ios,android
```

```bash
rn-compatibility-checker ./package.json --platforms ios,android,web,expoGo
```

### Getting a Detailed Report

Use the `-d` or `--detailed` option to get a more detailed report:

```bash
rn-compatibility-checker ./package.json -d
```

This option also shows New Architecture support and unmaintained package information.

## Example Scenarios

### Scenario 1: Create a New React Native Project and Check Dependencies

```bash
# Create a new React Native project
npx react-native init MyNewProject

# Navigate to the project directory
cd MyNewProject

# Check dependencies
npx rn-compatibility-checker ./package.json
```

### Scenario 2: Checking Dependencies Before Adding New Packages

Before adding a new dependency, you might want to verify its platform compatibility. You can create a temporary package.json file:

```bash
# Create a temporary package.json file
echo '{
  "dependencies": {
    "react-native-maps": "^1.7.1",
    "react-native-reanimated": "^3.3.0",
    "react-native-gesture-handler": "^2.12.0"
  }
}' > temp-package.json

# Check dependencies
npx rn-compatibility-checker ./temp-package.json

# Clean up the temporary file
rm temp-package.json
```

### Scenario 3: Checking Packages for Web Support

If you are planning to target the web platform, you may want to check which of your dependencies support web:

```bash
rn-compatibility-checker ./package.json -p web
```

## Understanding the Output

rn-compatibility-checker provides two types of output: a detailed table report and summary information.

### Table Report

```
╔═════════════════════════════════╤══════════╤═════════╤═════╤═════════╤═════╗
║ Package                         │ Version  │ Found   │ ios │ android │ web ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native                    │ 0.72.6   │ ✓       │ ✓   │ ✓       │ ✓   ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native-gesture-handler    │ ^2.12.0  │ ✓       │ ✓   │ ✓       │ ✓   ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native-reanimated         │ ^3.3.0   │ ✓       │ ✓   │ ✓       │ ✓   ║
╚═════════════════════════════════╧══════════╧═════════╧═════╧═════════╧═════╝
```

- **Package**: Dependency name  
- **Version**: Version specified in package.json  
- **Found**: Whether the package was found in the React Native Directory data source  
- **ios/android/web/etc.**: Whether the package supports the specified platform  

### Summary

```
Summary:
Total packages: 3
Found packages: 3
Missing packages: 0

Platform compatibility:
ios: 3/3 (100%)
android: 3/3 (100%)
web: 3/3 (100%)
```

This summary allows you to quickly assess the overall platform compatibility of your project.

## Next Steps

After learning the basic usage, check out the [Advanced Usage](./advanced-usage.md) and [CI/CD Integration](./ci-integration.md) pages to explore more advanced scenarios.
