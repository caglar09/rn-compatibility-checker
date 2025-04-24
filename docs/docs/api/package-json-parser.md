---
sidebar_position: 4
---

# Package.json Parser

The Package.json Parser module is responsible for reading the project's package.json file and extracting React Native dependencies. This module provides the dependency information required for compatibility checking.

## Overview

The Package.json Parser module provides the following key functions:

- Reading the project's package.json file
- Extracting dependencies and devDependencies sections
- Filtering React Native-related packages

## API Reference

### `parsePackageJson(packageJsonPath)`

Reads the package.json file at the given path and extracts the dependencies and devDependencies.

**Parameters:**
- `packageJsonPath` (string): Path to the package.json file

**Return Value:**
- `Object`: An object containing `name`, `version`, `dependencies`, and `devDependencies`

**Example:**

```javascript
const { parsePackageJson } = require('./utils/packageJsonParser');

const packageData = parsePackageJson('./package.json');
console.log('Project name:', packageData.name);
console.log('Project version:', packageData.version);
console.log('Dependencies:', packageData.dependencies);
console.log('DevDependencies:', packageData.devDependencies);
```

### `filterReactNativeDependencies(dependencies)`

Filters the list of dependencies to include only React Native-related packages.

**Parameters:**
- `dependencies` (Object): An object mapping package names to versions

**Return Value:**
- `Object`: An object containing only React Native-related packages

**Example:**

```javascript
const { parsePackageJson, filterReactNativeDependencies } = require('./utils/packageJsonParser');

const packageData = parsePackageJson('./package.json');
const allDependencies = {
  ...packageData.dependencies,
  ...packageData.devDependencies
};

const reactNativeDependencies = filterReactNativeDependencies(allDependencies);
console.log('React Native dependencies:', reactNativeDependencies);
```

## Data Structures

### Package.json Data Structure

The package.json file is expected to have the following structure:

```javascript
{
  "name": "sample-react-native-project",
  "version": "0.1.0",
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-gesture-handler": "^2.12.0"
    // other dependencies...
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@react-native/eslint-config": "^0.72.2"
    // other dev dependencies...
  }
}
```

### Return Data Structure

The result returned by `parsePackageJson` has the following structure:

```javascript
{
  "name": "sample-react-native-project",
  "version": "0.1.0",
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-gesture-handler": "^2.12.0"
    // other dependencies...
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@react-native/eslint-config": "^0.72.2"
    // other dev dependencies...
  }
}
```

The result returned by `filterReactNativeDependencies` is structured as:

```javascript
{
  "react-native": "0.72.6",
  "react-native-gesture-handler": "^2.12.0"
  // other React Native dependencies...
}
```

## Error Handling

The Package.json Parser module handles various error conditions:

- File not found
- JSON parse errors
- File reading errors

In case of an error, an appropriate error message is displayed and the process terminates.

## Filtering Logic

The following criteria are used to filter React Native-related packages:

- Package name is exactly "react-native"
- Package name starts with "react-native-"
- Package name starts with "@react-native"
- Package name contains "react-native"

This filtering logic is designed to cover most packages in the React Native ecosystem.

## Customization

The Package.json Parser module is customizable for special use cases:

```javascript
const fs = require('fs');
const { filterReactNativeDependencies } = require('./utils/packageJsonParser');

// Custom package.json parse function
function customParsePackageJson(packageJsonPath) {
  const content = fs.readFileSync(packageJsonPath, 'utf8');
  const json = JSON.parse(content);

  // Only include production dependencies
  return {
    name: json.name,
    version: json.version,
    dependencies: json.dependencies || {}
  };
}

// Custom filter function
function customFilterDependencies(dependencies, pattern) {
  const filtered = {};

  Object.keys(dependencies).forEach(packageName => {
    if (packageName.includes(pattern)) {
      filtered[packageName] = dependencies[packageName];
    }
  });

  return filtered;
}

// Usage
const packageData = customParsePackageJson('./package.json');
const reactNativeDependencies = filterReactNativeDependencies(packageData.dependencies);
const navigationDependencies = customFilterDependencies(packageData.dependencies, 'navigation');

console.log('React Native dependencies:', reactNativeDependencies);
console.log('Navigation dependencies:', navigationDependencies);
```

This customization approach allows using the Package.json Parser module in various scenarios.
