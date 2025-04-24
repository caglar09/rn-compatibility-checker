# React Native Compatibility Checker

This NPM package is a command-line tool for checking platform compatibility of dependencies in React Native projects.

## Features

- Automatically detects React Native dependencies from the project's package.json file
- Checks compatibility for iOS, Android, Web, Windows, Expo Go, and the New Architecture
- Provides detailed and summary reports
- Supports table and CSV output formats
- Identifies unmaintained packages

## Installation

```bash
npm install -g rn-compatibility-checker
```

## Usage

```bash
rn-compatibility-checker <path-to-package.json> [options]
```

### Options

- `-p, --platforms <platforms>`: Platforms to check (comma-separated): ios,android,web,windows,expoGo,newArchitecture (default: "ios,android,web,windows")
- `-d, --detailed`: Show detailed output (default: false)
- `-f, --format <format>`: Output format: table,csv (default: "table")
- `-v, --version`: Show version information
- `-h, --help`: Show help information

### Examples

Basic usage:
```bash
rn-compatibility-checker ./package.json
```

Checking specific platforms:
```bash
rn-compatibility-checker ./package.json -p ios,android,web,windows,expoGo
```

Getting a detailed report:
```bash
rn-compatibility-checker ./package.json -d
```

Getting CSV formatted output:
```bash
rn-compatibility-checker ./package.json -f csv
```

Checking compatibility for the Windows platform:
```bash
rn-compatibility-checker ./package.json -p windows
```

## Output Formats

### Table Format (Default)

The table format displays results in an easy-to-read table in the console:

```
React Native Libraries Compatibility Report
==================================================
╔═════════════════════════════════╤══════════╤═════════╤═════╤═════════╤═════════╤═════╗
║ Package                         │ Version  │ Found   │ ios │ android │ windows │ web ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────────┼─────╢
║ react-native                    │ 0.72.6   │ ✓       │ ✓   │ ✓       │ ✓       │ ✓   ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────────┼─────╢
║ react-native-gesture-handler    │ ^2.12.0  │ ✓       │ ✓   │ ✓       │ ✗       │ ✓   ║
╚═════════════════════════════════╧══════════╧═════════╧═════╧═════════╧═════════╧═════╝
```

### CSV Format

The CSV format displays results as comma-separated values that can be saved to a CSV file:

```
Package,Version,Found,ios,android,windows,web
react-native,0.72.6,Yes,Yes,Yes,Yes,Yes
react-native-gesture-handler,^2.12.0,Yes,Yes,Yes,No,Yes
```

The CSV report is saved to `compatibility-report.csv` in the working directory.

## How It Works

This tool uses data from the [React Native Directory](https://github.com/react-native-community/directory) project to check platform compatibility of dependencies listed in your project's package.json file.

1. Reads the project's package.json file
2. Detects React Native-related dependencies
3. Checks platform compatibility for each dependency
4. Displays the results in the selected format

## License

MIT
