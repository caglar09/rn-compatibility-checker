/**
 * Main module
 * Combines CLI interface with other modules
 */

const chalk = require("chalk");
const {
	parsePackageJson,
	filterReactNativeDependencies,
} = require("./utils/packageJsonParser");
const {
	checkPlatformCompatibility,
	formatResults,
} = require("./utils/compatibilityChecker");

/**
 * Performs compatibility check
 * @param {string} packageJsonPath - Path to package.json file
 * @param {Object} options - Check options
 */
async function checkCompatibility(packageJsonPath, options) {
	try {
		// Set platforms
		const platforms = options.platforms.split(",").map((p) => p.trim());

		// Read package.json file
		const packageData = parsePackageJson(packageJsonPath);

		console.log(
			`\nPerforming compatibility check for ${chalk.bold(
				packageData.name
			)} project...\n`
		);

		// Filter React Native related dependencies
		const dependencies = {
			...filterReactNativeDependencies(packageData.dependencies),
			...filterReactNativeDependencies(packageData.devDependencies),
		};

		console.log(
			`Found ${Object.keys(dependencies).length} dependencies.\n`
		);

		// Perform compatibility check
		const results = await checkPlatformCompatibility(dependencies, platforms);
		// Format and display results
		formatResults(results, platforms, options.detailed, options.format);

		return results;
	} catch (error) {
		console.error(`${chalk.red("Error:")} ${error.message}`);
		process.exit(1);
	}
}

module.exports = {
	checkCompatibility,
};
