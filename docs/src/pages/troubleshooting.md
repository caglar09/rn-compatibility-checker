---
title: Troubleshooting
---

# Troubleshooting

This page contains common issues and their solutions that you may encounter while using the rn-compatibility-checker package.

## Known Issues

### 1. Some Packages Cannot Be Found

**Issue:** Some React Native packages result in a "Package not found" error.

**Cause:** This usually happens because:
- The package may not yet be listed in the React Native Directory data source
- The package name may have changed or be listed under a different name
- The package may no longer be maintained or has been archived

**Solution:**
1. Ensure the package name is correct
2. Manually search for the package on the [React Native Directory](https://reactnative.directory/) site
3. If the package is indeed a React Native library but not found in the directory, submit a Pull Request to the [React Native Directory GitHub repository](https://github.com/react-native-community/directory)
4. Alternatively, use a custom data source as described on the [Advanced Usage](./docs/examples/advanced-usage) page

### 2. Unable to Load Data Source

**Issue:** You receive an "Unable to load data source" error.

**Cause:** This usually occurs due to:
- Internet connectivity issues
- Access problems with the GitHub API
- Temporary unavailability of the data source

**Solution:**
1. Check your internet connection
2. If you are using a proxy or VPN, temporarily disable it
3. Wait a few minutes and try again
4. Use a locally cached copy of the data source:

```javascript
const fs = require('fs');
const { checkPlatformCompatibility } = require('rn-compatibility-checker/src/utils/compatibilityChecker');

// Use the cached data source
const librariesData = JSON.parse(fs.readFileSync('./cached-libraries.json', 'utf8'));

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const dependencies = packageJson.dependencies || {};

// Perform compatibility check
const platforms = ['ios', 'android', 'web'];
const results = checkPlatformCompatibility(dependencies, platforms, librariesData);
```

### 3. Slow Performance in CI/CD Environment

**Issue:** The tool runs slowly or times out in CI/CD pipelines.

**Cause:** This often results from:
- Downloading the large data source on every run
- Network restrictions in the CI/CD environment

**Solution:**
1. Cache the data source and use the CI/CD cache mechanism
2. Use a custom script as described on the [CI/CD Integration](./docs/examples/ci-integration) page
3. Include the data source in your project and use it directly:

```bash
# Download and include the data source in your project
curl -o ./data/react-native-libraries.json https://raw.githubusercontent.com/react-native-community/directory/main/react-native-libraries.json

# Use with a custom script
node ./scripts/check-compatibility.js
```

## Debugging Tips

### Verbose Mode

To enable verbose mode for additional debugging information, set the environment variable:

```bash
DEBUG=rn-compatibility-checker* rn-compatibility-checker ./package.json
```

This will display more logs during execution.

### Inspecting the Data Source

To manually inspect the data source:

```bash
# Download the data source
curl -o react-native-libraries.json https://raw.githubusercontent.com/react-native-community/directory/main/react-native-libraries.json

# Search for a specific package
grep -i "package-name" react-native-libraries.json
```

### Programmatic Debugging

For debugging programmatic usage, use a try-catch block:

```javascript
const { checkCompatibility } = require('rn-compatibility-checker');

try {
  const results = checkCompatibility('./package.json', {
    platforms: 'ios,android,web',
    detailed: true,
  });

  console.log('Results:', JSON.stringify(results, null, 2));
} catch (error) {
  console.error('An error occurred:', error);
  console.error('Stack trace:', error.stack);
}
```

### Checking Dependency Versions

If you are getting unexpected results, verify dependency versions:

```bash
npm list rn-compatibility-checker
npm list commander
```

### Cleaning Temporary Files

Temporary files can sometimes cause issues. Clean them:

```bash
# Clean node modules
rm -rf node_modules
npm cache clean --force
npm install

# Clean temp files
rm -rf ~/.rn-compatibility-checker
```

## Common Error Messages and Solutions

### "Cannot find module 'rn-compatibility-checker'"

**Issue:** Module not found error.

**Solution:**
1. Install the package: `npm install -g rn-compatibility-checker`
2. Or use npx: `npx rn-compatibility-checker ./package.json`

### "Error: ENOENT: no such file or directory, open 'package.json'"

**Issue:** package.json file not found.

**Solution:**
1. Ensure you are in the correct directory
2. Provide the full path: `rn-compatibility-checker /full/path/package.json`

### "SyntaxError: Unexpected token in JSON at position X"

**Issue:** package.json file is not valid JSON.

**Solution:**
1. Validate the file using a JSON validator
2. Fix missing commas, braces, or quotes

### "Error: Failed to load libraries data"

**Issue:** Failed to load the library data.

**Solution:**
1. Check your internet connection
2. Verify your access to GitHub
3. Use a cached copy of the data source

## Getting Help

If you can't find a solution here, refer to:

1. [GitHub Issues](https://github.com/rn-compatibility-checker/rn-compatibility-checker/issues): Search for existing issues or report a new one
2. [React Native Community](https://reactnative.dev/help): General help for React Native
3. [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native): Ask questions with the "react-native" and "rn-compatibility-checker" tags