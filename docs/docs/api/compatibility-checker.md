---
sidebar_position: 3
---

# Compatibility Checker

The Compatibility Checker module provides the core functionality of the rn-compatibility-checker package. This module checks the platform compatibility of React Native libraries and formats the results.

## Overview

The Compatibility Checker module provides the following main functions:

- Loading the React Native libraries data source
- Finding library information by package name
- Checking platform compatibility
- Formatting and displaying results

## API Reference

### `loadLibrariesData()`

Loads the data source of React Native libraries.

**Return Value:**
- `Array`: List of React Native libraries

**Example:**

```javascript
const { loadLibrariesData } = require('./utils/compatibilityChecker');

const librariesData = loadLibrariesData();
console.log(`Total libraries: ${librariesData.length}`);
```

### `findLibraryByPackageName(librariesData, packageName)`

Finds library information by package name.

**Parameters:**
- `librariesData` (Array): List of React Native libraries
- `packageName` (string): Package name

**Return Value:**
- `Object|null`: Library information or null if not found

**Example:**

```javascript
const { loadLibrariesData, findLibraryByPackageName } = require('./utils/compatibilityChecker');

const librariesData = loadLibrariesData();
const library = findLibraryByPackageName(librariesData, 'react-native-gesture-handler');

if (library) {
  console.log('Library found:', library);
  console.log('iOS support:', library.ios ? 'Yes' : 'No');
  console.log('Android support:', library.android ? 'Yes' : 'No');
}
```

### `checkPlatformCompatibility(dependencies, platforms)`

Checks the platform compatibility of packages.

**Parameters:**
- `dependencies` (Object): Map of dependencies (package name and version)
- `platforms` (Array): Platforms to check

**Return Value:**
- `Array`: Compatibility results

**Example:**

```javascript
const { checkPlatformCompatibility } = require('./utils/compatibilityChecker');

const dependencies = {
  'react-native': '0.72.6',
  'react-native-gesture-handler': '^2.12.0'
};

const platforms = ['ios', 'android', 'web'];
const results = checkPlatformCompatibility(dependencies, platforms);

console.log('Compatibility results:', results);
```

### `formatResults(results, platforms, detailed = false)`

Formats and displays compatibility results.

**Parameters:**
- `results` (Array): Compatibility results
- `platforms` (Array): The platforms checked
- `detailed` (boolean, optional): Show detailed output (default: false)

**Example:**

```javascript
const { checkPlatformCompatibility, formatResults } = require('./utils/compatibilityChecker');

const dependencies = {
  'react-native': '0.72.6',
  'react-native-gesture-handler': '^2.12.0'
};

const platforms = ['ios', 'android', 'web'];
const results = checkPlatformCompatibility(dependencies, platforms);

// Format and display results
formatResults(results, platforms, true);
```

## Data Structures

### Library Data Structure

The library data from React Native Directory has the following structure:

```javascript
{
  "githubUrl": "https://github.com/react-native-gesture-handler/react-native-gesture-handler",
  "ios": true,
  "android": true,
  "web": true,
  "expoGo": true,
  "newArchitecture": true,
  "npmPkg": "react-native-gesture-handler",
  "unmaintained": false
}
```

### Result Data Structure

The result returned by `checkPlatformCompatibility` has the following structure:

```javascript
[
  {
    "packageName": "react-native-gesture-handler",
    "version": "^2.12.0",
    "found": true,
    "platforms": {
      "ios": true,
      "android": true,
      "web": true
    },
    "newArchitecture": true,
    "unmaintained": false
  }
  // Other packages...
]
```

## Error Handling

The Compatibility Checker module handles various error conditions:

- Data source not found
- Data source load failure
- Error during compatibility checking

In case of an error, an appropriate error message is displayed and the process is terminated.

## Customization

The Compatibility Checker module can be customized for special use cases:

```javascript
const { loadLibrariesData, checkPlatformCompatibility } = require('./utils/compatibilityChecker');

// Use a custom data source
const customLibrariesData = require('./custom-libraries.json');

// Define custom platforms
const customPlatforms = ['ios', 'android', 'windows'];

// Define custom dependencies
const customDependencies = {
  'react-native': '0.72.6',
  'react-native-windows': '^0.70.0'
};

// Perform compatibility check
const results = checkPlatformCompatibility(customDependencies, customPlatforms);

// Process results as needed
results.forEach(result => {
  console.log(`${result.packageName}: ${result.found ? 'Found' : 'Not Found'}`);
  if (result.found) {
    customPlatforms.forEach(platform => {
      console.log(`  ${platform}: ${result.platforms[platform] ? 'Supported' : 'Not Supported'}`);
    });
  }
});
```

This customization approach allows you to use the Compatibility Checker module in various scenarios.
