/**
 * Package.json parser module
 * Reads project package.json file and extracts dependencies section
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

/**
 * Reads the package.json file at the given path and extracts the dependencies section
 * @param {string} packageJsonPath - Path to package.json file
 * @returns {Object} - dependencies and devDependencies objects
 */
function parsePackageJson(packageJsonPath) {
  const spinner = ora('Reading package.json file...').start();
  
  try {
    // Normalize path
    const absolutePath = path.resolve(packageJsonPath);
    
    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      spinner.fail(`${chalk.red('Error:')} File ${absolutePath} not found.`);
      process.exit(1);
    }
    
    // Read file and parse as JSON
    const packageJsonContent = fs.readFileSync(absolutePath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    
    // Extract dependencies and devDependencies sections
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};
    
    spinner.succeed('Package.json file successfully read.');
    
    return {
      dependencies,
      devDependencies,
      name: packageJson.name,
      version: packageJson.version
    };
  } catch (error) {
    spinner.fail(`${chalk.red('Error:')} An error occurred while reading package.json file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Filters React Native related packages from the dependencies list
 * @param {Object} dependencies - dependencies object
 * @returns {Object} - React Native related packages
 */
function filterReactNativeDependencies(dependencies) {
  const reactNativeDependencies = {};
  
  // Filter React Native related packages
  Object.keys(dependencies).forEach(packageName => {
    if (
      packageName === 'react-native' ||
      packageName.startsWith('react-native-') ||
      packageName.startsWith('@react-native') ||
      packageName.includes('react-native')
    ) {
      reactNativeDependencies[packageName] = dependencies[packageName];
    }
  });
  
  return reactNativeDependencies;
}

module.exports = {
  parsePackageJson,
  filterReactNativeDependencies
};
