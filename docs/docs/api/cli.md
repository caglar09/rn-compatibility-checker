---
sidebar_position: 2
---

# CLI Interface

The CLI (Command Line Interface) component enables use of the rn-compatibility-checker package from the command line. This module processes user-provided arguments and invokes other modules to perform compatibility checks.

## Overview

The CLI is built using [Commander.js](https://github.com/tj/commander.js/) and provides the following features:

- Parsing command-line arguments
- Displaying help and version information
- Invoking other modules and displaying results

## API Reference

### `bin/cli.js`

This file defines the main entry point of the package and the command-line interface.

```javascript
#!/usr/bin/env node

const { program } = require('commander');
const packageJson = require('../package.json');
const { checkCompatibility } = require('../src/index');

program
  .version(packageJson.version)
  .description('CLI tool for checking platform compatibility of React Native libraries')
  .argument('<packageJsonPath>', 'Path to the package.json file')
  .option('-p, --platforms <platforms>', 'Comma-separated list of platforms to check: ios,android,web,expoGo,newArchitecture', 'ios,android,web')
  .option('-d, --detailed', 'Show detailed output', false)
  .option('-f, --format', 'Output format: table,csv', 'table')
  .action((packageJsonPath, options) => {
    checkCompatibility(packageJsonPath, options);
  });

program.parse(process.argv);
```

## Parameters

The CLI accepts the following parameters:

| Parameter            | Description                                              | Default            |
|----------------------|----------------------------------------------------------|--------------------|
| `packageJsonPath`    | Path to the package.json file (required)                 | -                  |
| `-p, --platforms`    | Platforms to check (comma-separated)                     | `ios,android,web`  |
| `-d, --detailed`     | Show detailed output                                     | `false`            |
| `-v, --version`      | Display version information                              | -                  |
| `-f, --format`       | Output format: table,csv                                 | `table`            |
| `-h, --help`         | Display help information                                 | -                  |

## Usage Examples

### Basic Usage

```bash
rn-compatibility-checker ./package.json
```

### Check Specific Platforms

```bash
rn-compatibility-checker ./package.json -p ios,android,web,expoGo
```

### Detailed Output

```bash
rn-compatibility-checker ./package.json -d
```

### Detailed Custom Output

```bash
rn-compatibility-checker ./package.json -d -f csv
```

### Display Version

```bash
rn-compatibility-checker --version
```

### Display Help

```bash
rn-compatibility-checker --help
```

## Output Format

The CLI displays compatibility check results in a table format along with summary information. For more details, see the [Usage](../usage.md) page.

## Error Handling

The CLI handles various error scenarios and displays meaningful error messages to the user:

- File not found
- JSON parse errors
- Data source load failures

In case of an error, the program exits with an appropriate message.

## Programmatic Usage

The CLI can also be used programmatically:

```javascript
const { program } = require('commander');
const { checkCompatibility } = require('rn-compatibility-checker');

// Customize Commander program
program
  .argument('<packageJsonPath>')
  .option('-p, --platforms <platforms>', 'ios,android,web')
  .action((packageJsonPath, options) => {
    const results = checkCompatibility(packageJsonPath, options);
    // Process results as needed
  });

program.parse(process.argv);
```

This approach is useful when you want to extend the CLI or integrate it into another tool.
