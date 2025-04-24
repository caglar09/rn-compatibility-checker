---
sidebar_position: 2
---

# Installation

There are several ways to install RN Compatibility Checker. Choose the option that best fits your needs.

## Global Installation

Installing RN Compatibility Checker globally allows you to use it from any project:

```bash
npm install -g rn-compatibility-checker
```

After installation, you can run the tool from any directory:

```bash
rn-compatibility-checker ./package.json
```

## Install as a Project Dependency

To add it as a dependency to a specific project:

```bash
npm install --save-dev rn-compatibility-checker
```

After installation, you can add a script to your package.json:

```json
{
  "scripts": {
    "check-compatibility": "rn-compatibility-checker ./package.json"
  }
}
```

Then you can run:

```bash
npm run check-compatibility
```

## Using with npx (Without Installation)

To use the tool via npx without installing:

```bash
npx rn-compatibility-checker ./package.json
```

This method downloads and runs the tool temporarily, then removes it.

## System Requirements

- Node.js version 12.0.0 or higher
- npm or yarn package manager

## Verification

To verify that the installation was successful, run:

```bash
rn-compatibility-checker --version
```

This command will display the version of the installed RN Compatibility Checker.

## Next Steps

After installing, check out the [Usage](./usage.md) guide to learn how to use the tool.
