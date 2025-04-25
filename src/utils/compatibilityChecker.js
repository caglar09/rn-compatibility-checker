/**
 * Compatibility checker module
 * Checks platform compatibility of React Native libraries
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const { table } = require("table");
const axios = require("axios");
const { execSync } = require("child_process");

// GitHub API URL
const GITHUB_API_URL =
	"https://raw.githubusercontent.com/react-native-community/directory/main/react-native-libraries.json";

function getPackageManager() {
	const userAgent = process.env.npm_config_user_agent || "";
	if (userAgent.includes("yarn")) return "yarn";
	if (userAgent.includes("pnpm")) return "pnpm";
	return "npm";
}

function getCacheDir() {
	const pm = getPackageManager();

	try {
		if (pm === "npm") {
			const npmCache = execSync("npm config get cache").toString().trim();
			return path.join(npmCache, "rn-compatibility-checker");
		}

		if (pm === "yarn") {
			const yarnCache = execSync("yarn cache dir").toString().trim();
			return path.join(yarnCache, "rn-compatibility-checker");
		}

		if (pm === "pnpm") {
			const pnpmStore = execSync("pnpm store path").toString().trim();
			return path.join(pnpmStore, "rn-compatibility-checker");
		}

		// fallback
		return path.resolve(
			process.env.HOME || process.env.USERPROFILE,
			".rn-compatibility-checker"
		);
	} catch (err) {
		// fallback if command fails
		return path.resolve(
			process.env.HOME || process.env.USERPROFILE,
			".rn-compatibility-checker"
		);
	}
}

/**
 * Fetches the latest React Native libraries data from GitHub
 * @returns {Promise<Array>} - List of React Native libraries
 */
async function fetchLibrariesFromGitHub() {
	try {
		const response = await axios.get(GITHUB_API_URL);
		return response.data;
	} catch (error) {
		throw new Error(`Failed to fetch data from GitHub: ${error.message}`);
	}
}

/**
 * Checks local cache file and updates if necessary
 * @returns {Promise<Array>} - List of React Native libraries
 */
async function getLocalCache() {
	try {
		// const cacheDir = path.resolve(
		// 	process.env.HOME || process.env.USERPROFILE,
		// 	".rn-compatibility-checker"
		// );
		const cacheDir = getCacheDir();
		const cachePath = path.resolve(cacheDir, "libraries-cache.json");

		// Create cache directory
		if (!fs.existsSync(cacheDir)) {
			fs.mkdirSync(cacheDir, { recursive: true });
		}

		// Check cache file
		let needsUpdate = true;
		let cachedData = [];

		if (fs.existsSync(cachePath)) {
			try {
				const stats = fs.statSync(cachePath);
				const fileDate = new Date(stats.mtime);
				const now = new Date();
				const hoursSinceUpdate = (now - fileDate) / (1000 * 60 * 60);

				// Use cache if it's less than 24 hours old
				if (hoursSinceUpdate < 24) {
					cachedData = JSON.parse(fs.readFileSync(cachePath, "utf8"));
					needsUpdate = false;
				}
			} catch (error) {
				// If cache file can't be read, fetch new data
				needsUpdate = true;
			}
		}

		return { cachedData, needsUpdate, cachePath };
	} catch (error) {
		spinner.error = `${chalk.red(
			"Error:"
		)} An error occurred while checking local cache: ${error.message}`;
		throw error;
	}
}

/**
 * Loads the data source of React Native libraries
 * @returns {Promise<Array>} - List of React Native libraries
 */
async function loadLibrariesData() {
	const spinner = ora("Loading React Native libraries data source...").start();
	try {
		// Check cache status
		let { cachedData, needsUpdate, cachePath } = await getLocalCache();
		needsUpdate = true;
		// If cache is not up to date, fetch new data from GitHub
		if (needsUpdate) {
			spinner.text = "Fetching latest library data from GitHub...";

			try {
				const librariesData = await fetchLibrariesFromGitHub();

				// Save new data to cache
				fs.writeFileSync(cachePath, JSON.stringify(librariesData, null, 2));

				spinner.succeed(
					`Loaded ${librariesData.length} React Native libraries from GitHub.`
				);
				return librariesData;
			} catch (error) {
				console.log("needsUpdate loadLibrariesData catched error", error);

				// If data can't be fetched from GitHub and there's data in cache, use cache
				if (cachedData.length > 0) {
					spinner.warn(
						`Failed to fetch data from GitHub: ${error.message}. Using cache.`
					);
					return cachedData;
				}

				// If there's no data in cache either, throw error
				throw error;
			}
		} else {
			// If cache is up to date, use cache
			spinner.succeed(
				`Loaded ${cachedData.length} React Native libraries from cache.`
			);
			return cachedData;
		}
	} catch (error) {
		console.log("loadLibrariesData catched error", error);
		spinner.fail(
			`${chalk.red("Error:")} An error occurred while loading data source: ${
				error.message
			}`
		);

		// Try using backup JSON file in package
		try {
			const backupPath = path.resolve(
				__dirname,
				"../../react-native-libraries.json"
			);
			if (fs.existsSync(backupPath)) {
				spinner.warn("Using backup data source (may not be up to date).");
				return JSON.parse(fs.readFileSync(backupPath, "utf8"));
			}
		} catch (backupError) {
			console.log("loadLibrariesData backup catched error", error);

			// If backup doesn't work either, exit
			process.exit(1);
		}

		process.exit(1);
	}
}

/**
 * Finds library information by package name
 * @param {Array} librariesData - List of React Native libraries
 * @param {string} packageName - Package name
 * @returns {Object|null} - Library information or null
 */
function findLibraryByPackageName(librariesData, packageName) {
	// First search by npmPkg field
	let library = librariesData.find((lib) => lib.npmPkg === packageName);

	// If not found, extract from GitHub URL
	if (!library) {
		library = librariesData.find((lib) => {
			if (!lib.githubUrl) return false;

			const repoName = lib.githubUrl.split("/").pop().toLowerCase();
			return (
				repoName === packageName.toLowerCase() ||
				repoName === packageName.toLowerCase().replace("react-native-", "") ||
				repoName === packageName.toLowerCase().replace("@react-native/", "")
			);
		});
	}

	return library || null;
}

/**
 * Checks platform compatibility of packages
 * @param {Object} dependencies - List of dependencies
 * @param {Array} platforms - Platforms to check
 * @param {Array} [customLibrariesData] - Custom library data (optional)
 * @returns {Promise<Array>} - Compatibility results
 */
async function checkPlatformCompatibility(
	dependencies,
	platforms,
	customLibrariesData
) {
	const spinner = ora("Checking platform compatibility...").start();
	const results = [];

	try {
		const librariesData = customLibrariesData || (await loadLibrariesData());

		Object.keys(dependencies).forEach((packageName) => {
			const version = dependencies[packageName];
			const library = findLibraryByPackageName(librariesData, packageName);

			const result = {
				packageName,
				version,
				found: !!library,
				platforms: {},
			};

			if (library) {
				platforms.forEach((platform) => {
					// Special check for Windows platform
					if (platform === "windows") {
						// If windows property is explicitly defined use it, otherwise assume false
						result.platforms[platform] = !!library[platform];
					} else {
						result.platforms[platform] = !!library[platform];
					}
				});

				// Additional information
				if (library.newArchitecture !== undefined) {
					result.newArchitecture = library.newArchitecture;
				}

				if (library.unmaintained) {
					result.unmaintained = true;
				}
			}

			results.push(result);
		});

		spinner.succeed("Platform compatibility check completed.");
		return results;
	} catch (error) {
		spinner.fail(
			`${chalk.red("Error:")} An error occurred during compatibility check: ${
				error.message
			}`
		);
		process.exit(1);
	} finally {
		spinner.stop();
		return results;
	}
}

/**
 * Exports compatibility results in CSV format
 * @param {Array} results - Compatibility results
 * @param {Array} platforms - Checked platforms
 * @param {boolean} detailed - Show detailed output
 * @returns {string} - Results in CSV format
 */
function formatResultsAsCSV(results, platforms, detailed = false) {
	// CSV headers
	const headers = ["Package", "Version", "Found", ...platforms];
	if (detailed) {
		headers.push("New Architecture", "Unmaintained");
	}

	// CSV rows
	const rows = [headers.join(",")];

	results.forEach((result) => {
		const row = [
			result.packageName,
			result.version,
			result.found ? "true" : "false",
		];

		// Platform compatibilities
		platforms.forEach((platform) => {
			if (!result.found) {
				row.push("unknown");
			} else if (result.platforms[platform]) {
				row.push("true");
			} else {
				row.push("false");
			}
		});

		// Detailed information
		if (detailed) {
			if (result.found) {
				row.push(
					result.newArchitecture !== undefined
						? result.newArchitecture
							? "true"
							: "false"
						: "unknown",
					result.unmaintained ? "true" : "false"
				);
			} else {
				row.push("unknown", "unknown");
			}
		}

		rows.push(row.join(","));
	});

	return rows.join("\n");
}

/**
 * Formats and displays compatibility results
 * @param {Array} results - Compatibility results
 * @param {Array} platforms - Checked platforms
 * @param {boolean} detailed - Show detailed output
 * @param {string} format - Output format (table or csv)
 */
function formatResults(results, platforms, detailed = false, format = "table") {
	console.log("\n");
	console.log(chalk.bold("React Native Libraries Compatibility Report"));
	console.log("=".repeat(50));

	if (format === "csv") {
		const csvContent = formatResultsAsCSV(results, platforms, detailed);
		console.log(csvContent);

		// Save to CSV file
		const csvFilePath = path.resolve(process.cwd(), "compatibility-report.csv");
		fs.writeFileSync(csvFilePath, csvContent);
		console.log(`\nCSV report saved: ${csvFilePath}`);
	} else {
		// Table headers
		const headers = ["Package", "Version", "Found", ...platforms];
		if (detailed) {
			headers.push("New Architecture", "Unmaintained");
		}

		// Table data
		const data = [headers];

		results.forEach((result) => {
			const row = [
				result.packageName,
				result.version,
				result.found ? chalk.green("✓") : chalk.red("✗"),
			];

			// Platform compatibilities
			platforms.forEach((platform) => {
				if (!result.found) {
					row.push(chalk.yellow("?"));
				} else if (result.platforms[platform]) {
					row.push(chalk.green("✓"));
				} else {
					row.push(chalk.red("✗"));
				}
			});

			// Detailed information
			if (detailed) {
				if (result.found) {
					row.push(
						result.newArchitecture !== undefined
							? result.newArchitecture
								? chalk.green("✓")
								: chalk.red("✗")
							: chalk.yellow("?"),
						result.unmaintained ? chalk.red("✓") : chalk.green("✗")
					);
				} else {
					row.push(chalk.yellow("?"), chalk.yellow("?"));
				}
			}

			data.push(row);
		});

		// Display table
		console.log(table(data));
	}

	// Summary information
	const foundCount = results.filter((r) => r.found).length;
	const notFoundCount = results.length - foundCount;

	const platformStats = {};
	platforms.forEach((platform) => {
		platformStats[platform] = results.filter(
			(r) => r.found && r.platforms[platform]
		).length;
	});

	// Display summary information
	console.log(chalk.bold("Summary:"));
	console.log(`Total packages: ${results.length}`);
	console.log(`Found packages: ${chalk.green(foundCount)}`);
	console.log(`Not found packages: ${chalk.red(notFoundCount)}`);

	console.log("\nPlatform compatibility:");
	platforms.forEach((platform) => {
		const compatibleCount = platformStats[platform];
		const percentage = Math.round((compatibleCount / foundCount) * 100) || 0;
		console.log(
			`${platform}: ${chalk.green(
				compatibleCount
			)}/${foundCount} (${percentage}%)`
		);
	});

	if (detailed) {
		const newArchCount = results.filter(
			(r) => r.found && r.newArchitecture
		).length;
		const unmaintainedCount = results.filter(
			(r) => r.found && r.unmaintained
		).length;

		console.log("\nAdditional information:");
		console.log(
			`New Architecture support: ${chalk.green(newArchCount)}/${foundCount} (${
				Math.round((newArchCount / foundCount) * 100) || 0
			}%)`
		);
		console.log(
			`Unmaintained packages: ${chalk.red(unmaintainedCount)}/${foundCount} (${
				Math.round((unmaintainedCount / foundCount) * 100) || 0
			}%)`
		);
	}
}

module.exports = {
	loadLibrariesData,
	checkPlatformCompatibility,
	formatResults,
	formatResultsAsCSV,
};
