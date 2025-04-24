---
sidebar_position: 1
---

# Introduction

**RN Compatibility Checker** is a command-line tool designed to check the platform compatibility of dependencies in React Native projects.

## Problem

In React Native development, it is important to know which platforms your libraries support. Some libraries support only iOS and Android, while others also offer support for Web, Expo Go, or the New Architecture.

When your project has a large number of dependencies, manually verifying each library’s compatibility with every platform becomes a time-consuming and error-prone task.

## Solution

RN Compatibility Checker automates this process by analyzing your project's `package.json` file and checking the platform compatibility of React Native libraries automatically.

This tool uses the up-to-date data source from the [React Native Directory](https://reactnative.directory/) project, which includes compatibility information for over 1700 React Native libraries, to provide accurate results for your project.

## Features

- **Automatic Detection**: Automatically detects React Native dependencies in your project's `package.json`.
- **Comprehensive Checking**: Checks compatibility for iOS, Android, Web, Expo Go, and the New Architecture.
- **Detailed Reporting**: Provides both detailed table reports and summary information.
- **Unmaintained Package Detection**: Identifies packages that are no longer maintained.
- **Easy to Use**: Simple command-line interface with clear options.

## Example Output

```bash
React Native Libraries Compatibility Report
==================================================
╔═════════════════════════════════╤══════════╤═════════╤═════╤═════════╤═════╗
║ Package                         │ Version  │ Found   │ ios │ android │ web ║
╟─────────────────────────────────┼──────────┼─────────┼─────┼─────────┼─────╢
║ react-native                    │ 0.72.6   │ ✓       │ ✓   │ ✓       │ ✓   ║
║ react-native-gesture-handler    │ ^2.12.0  │ ✓       │ ✓   │ ✓       │ ✓   ║
║ react-native-reanimated         │ ^3.3.0   │ ✓       │ ✓   │ ✓       │ ✓   ║
║ react-native-safe-area-context  │ ^4.6.3   │ ✓       │ ✓   │ ✓       │ ✓   ║
║ react-native-screens            │ ^3.22.0  │ ✓       │ ✓   │ ✓       │ ✓   ║
║ react-native-svg                │ ^13.9.0  │ ✓       │ ✓   │ ✓       │ ✓   ║
║ react-native-vector-icons       │ ^10.0.0  │ ✓       │ ✓   │ ✓       │ ✓   ║
║ react-native-webview            │ ^13.2.2  │ ✓       │ ✓   │ ✓       │ ✗   ║
╚═════════════════════════════════╧══════════╧═════════╧═════╧═════════╧═════╝

Summary:
Total packages: 8  
Found packages: 8  
Missing packages: 0  

Platform compatibility:  
ios: 8/8 (100%)  
android: 8/8 (100%)  
web: 7/8 (88%)
```

## Getting Started

To get started with RN Compatibility Checker, see the [Installation](./installation.md) and [Usage](./usage.md) guides.

Quick start:

```bash
# Install globally
npm install -g rn-compatibility-checker

# Or use npx
npx rn-compatibility-checker ./package.json
```
