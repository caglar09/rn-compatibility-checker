---
sidebar_position: 3
---

# Advanced Usage

This page explains advanced usage scenarios and customization options for the rn-compatibility-checker package.

## Programmatic Usage

The rn-compatibility-checker package can be used both as a CLI tool and programmatically. This is useful when building custom tools or integrating into existing workflows.

### Basic Programmatic Usage

```javascript
const { checkCompatibility } = require('rn-compatibility-checker');

// Perform compatibility check
const results = checkCompatibility('./package.json', {
  platforms: 'ios,android,web',
  detailed: true
});

// Process results
console.log(`Total packages: ${results.length}`);
console.log(`iOS-compatible packages: ${results.filter(r => r.platforms.ios).length}`);
```

### Custom Output Format

```javascript
const { checkCompatibility } = require('rn-compatibility-checker');

// Perform compatibility check
const results = checkCompatibility('./package.json', {
  platforms: 'ios,android,web,expoGo',
  detailed: true
});

// Generate custom HTML report
let htmlReport = '<html><body>';
htmlReport += '<h1>React Native Libraries Compatibility Report</h1>';
htmlReport += '<table border="1">';
htmlReport += '<tr><th>Package</th><th>Version</th><th>iOS</th><th>Android</th><th>Web</th><th>Expo Go</th></tr>';

results.forEach(result => {
  htmlReport += `<tr>
    <td>${result.packageName}</td>
    <td>${result.version}</td>
    <td>${result.platforms.ios ? '✅' : '❌'}</td>
    <td>${result.platforms.android ? '✅' : '❌'}</td>
    <td>${result.platforms.web ? '✅' : '❌'}</td>
    <td>${result.platforms.expoGo ? '✅' : '❌'}</td>
  </tr>`;
});

htmlReport += '</table>';
htmlReport += '</body></html>';

// Save HTML report
const fs = require('fs');
fs.writeFileSync('compatibility-report.html', htmlReport);
console.log('HTML report generated: compatibility-report.html');
```

## Using a Custom Data Source

By default, rn-compatibility-checker uses the React Native Directory data source. However, you can supply a custom data source when needed.

### Custom JSON Data Source

```javascript
const { checkPlatformCompatibility } = require('rn-compatibility-checker/src/utils/compatibilityChecker');
const fs = require('fs');

// Load custom data source
const customLibrariesData = JSON.parse(fs.readFileSync('./custom-libraries.json', 'utf8'));

// Read package.json and extract dependencies
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const dependencies = packageJson.dependencies || {};

// Perform compatibility check with custom data source
const platforms = ['ios', 'android', 'web'];
const results = checkPlatformCompatibility(dependencies, platforms, customLibrariesData);

// Process results
console.log('Compatibility results:', results);
```

## Advanced Filtering

You may want to filter packages based on specific criteria.

### Filtering Packages that Support Specific Platforms

```javascript
const { checkCompatibility } = require('rn-compatibility-checker');

// Perform compatibility check for all platforms
const results = checkCompatibility('./package.json', {
  platforms: 'ios,android,web,expoGo,newArchitecture',
  detailed: true
});

// Filter packages that support web
const webSupportedPackages = results.filter(result => result.platforms.web);
console.log('Packages that support web:');
webSupportedPackages.forEach(pkg => {
  console.log(`- ${pkg.packageName} (${pkg.version})`);
});

// Filter packages that support all specified platforms
const allPlatformPackages = results.filter(result =>
  result.platforms.ios &&
  result.platforms.android &&
  result.platforms.web &&
  result.platforms.expoGo
);
console.log('\nPackages that support all platforms:');
allPlatformPackages.forEach(pkg => {
  console.log(`- ${pkg.packageName} (${pkg.version})`);
});

// Filter packages that support New Architecture
const newArchPackages = results.filter(result => result.newArchitecture);
console.log('\nPackages that support New Architecture:');
newArchPackages.forEach(pkg => {
  console.log(`- ${pkg.packageName} (${pkg.version})`);
});
```

## Automatic Update Suggestions

You can provide alternative suggestions for packages with compatibility issues.

```javascript
const { checkCompatibility } = require('rn-compatibility-checker');

// Perform compatibility check
const results = checkCompatibility('./package.json', {
  platforms: 'ios,android,web',
  detailed: true
});

// Find packages without web support
const nonWebPackages = results.filter(result => !result.platforms.web);

if (nonWebPackages.length > 0) {
  console.log('\nAlternative suggestions for packages without web support:');
  
  nonWebPackages.forEach(pkg => {
    console.log(`\nAlternatives for ${pkg.packageName}:`);
    
    // In a real application, you might use a database or API to suggest alternatives.
    // Here we use a simple mapping.
    
    const alternatives = {
      'react-native-webview': ['@react-native-community/react-native-webview', 'react-native-web-webview'],
      'react-native-maps': ['google-map-react', 'pigeon-maps'],
      'react-native-camera': ['react-webcam', 'html5-camera']
      // Other package alternatives...
    };
    
    if (alternatives[pkg.packageName]) {
      alternatives[pkg.packageName].forEach(alt => {
        console.log(`- ${alt}`);
      });
    } else {
      console.log('- No known alternatives');
    }
  });
}
```

## Performance Optimization

For large projects or CI/CD environments, you can apply various optimizations.

### Caching the Data Source

```javascript
const { loadLibrariesData, checkPlatformCompatibility } = require('rn-compatibility-checker/src/utils/compatibilityChecker');
const fs = require('fs');
const path = require('path');

// Function to get cached data source
function getCachedLibrariesData() {
  const cacheDir = path.join(process.env.HOME || process.env.USERPROFILE, '.rn-compatibility-checker');
  const cacheFile = path.join(cacheDir, 'libraries-cache.json');
  
  // Create cache directory if it doesn't exist
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  
  // If cache file exists and is fresh, use it
  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    const cacheAge = Date.now() - stats.mtimeMs;
    if (cacheAge < 24 * 60 * 60 * 1000) {
      console.log('Loading data source from cache...');
      return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    }
  }
  
  // Cache is missing or stale, load new data
  console.log('Loading new data source...');
  const librariesData = loadLibrariesData();
  fs.writeFileSync(cacheFile, JSON.stringify(librariesData));
  return librariesData;
}

// Usage
const librariesData = getCachedLibrariesData();
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const dependencies = packageJson.dependencies || {};
const platforms = ['ios', 'android', 'web'];
const results = checkPlatformCompatibility(dependencies, platforms, librariesData);
console.log('Compatibility results:', results);
```

## Next Steps

After exploring advanced usage scenarios, see the [CI/CD Integration](./ci-integration.md) page to learn how to include compatibility checks in your continuous integration processes.
