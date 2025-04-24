---
sidebar_position: 4
---

# CI/CD Integration

This page describes how to integrate rn-compatibility-checker into continuous integration (CI) and continuous deployment (CD) processes.

## Overview

Integrating rn-compatibility-checker into CI/CD pipelines allows you to automatically check the platform compatibility of your React Native projects. This is particularly useful for cross-platform (iOS, Android, Web) projects.

## GitHub Actions Integration

### Basic GitHub Actions Workflow

The following example workflow runs compatibility checks on every push and pull request:

```yaml
name: Check React Native Compatibility

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  check-compatibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Check compatibility
        run: npx rn-compatibility-checker ./package.json
```

Save this file as `.github/workflows/compatibility-check.yml` in your project.

### Advanced GitHub Actions Workflow

This advanced example saves the compatibility results as an artifact and comments the report on pull requests:

```yaml
name: Check React Native Compatibility

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  check-compatibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Create compatibility check script
        run: |
          cat > check-compatibility.js << 'EOL'
          const { checkCompatibility } = require('rn-compatibility-checker');
          const fs = require('fs');

          // Perform compatibility check
          const results = checkCompatibility('./package.json', {
            platforms: 'ios,android,web,expoGo',
            detailed: true
          });

          // Generate Markdown report
          let markdown = '# React Native Compatibility Report\n\n';

          markdown += '## Summary\n\n';
          const totalPackages = results.length;
          const foundPackages = results.filter(r => r.found).length;

          markdown += `- Total packages: ${totalPackages}\n`;
          markdown += `- Found packages: ${foundPackages}\n`;
          markdown += `- Missing packages: ${totalPackages - foundPackages}\n\n`;

          markdown += '## Platform Compatibility\n\n';
          const platforms = ['ios', 'android', 'web', 'expoGo'];
          platforms.forEach(platform => {
            const supportedCount = results.filter(r => r.platforms[platform]).length;
            const percentage = (supportedCount / totalPackages * 100).toFixed(2);
            markdown += `- ${platform}: ${supportedCount}/${totalPackages} (${percentage}%)\n`;
          });

          markdown += '\n## Detailed Report\n\n';
          markdown += '| Package | Version | iOS | Android | Web | Expo Go |\n';
          markdown += '|---------|---------|-----|---------|-----|---------|\n';

          results.forEach(result => {
            const ios = result.platforms.ios ? '✅' : '❌';
            const android = result.platforms.android ? '✅' : '❌';
            const web = result.platforms.web ? '✅' : '❌';
            const expoGo = result.platforms.expoGo ? '✅' : '❌';
            markdown += `| ${result.packageName} | ${result.version} | ${ios} | ${android} | ${web} | ${expoGo} |\n`;
          });

          // Save report
          fs.writeFileSync('compatibility-report.md', markdown);
          EOL

      - name: Run compatibility script
        run: node check-compatibility.js

      - name: Upload compatibility report
        uses: actions/upload-artifact@v2
        with:
          name: compatibility-report
          path: compatibility-report.md

      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v5
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('compatibility-report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: report
            });
```

## GitLab CI/CD Integration

### Basic GitLab CI/CD Pipeline

The following example adds compatibility checks to a GitLab CI/CD pipeline:

```yaml
stages:
  - test

compatibility-check:
  stage: test
  image: node:16
  script:
    - npm ci
    - npx rn-compatibility-checker ./package.json
  only:
    - main
    - merge_requests
```

Add this configuration to your `.gitlab-ci.yml` file.

### Advanced GitLab CI/CD Pipeline

This advanced example saves the compatibility results as an artifact and fails the job if not all platforms are supported:

```yaml
stages:
  - test

compatibility-check:
  stage: test
  image: node:16
  script:
    - npm ci
    - |
      cat > check-compatibility.js << 'EOL'
      const { checkCompatibility } = require('rn-compatibility-checker');
      const fs = require('fs');

      // Perform compatibility check
      const results = checkCompatibility('./package.json', {
        platforms: 'ios,android,web',
        detailed: true
      });

      // Generate Markdown report
      let markdown = '# React Native Compatibility Report\n\n';

      // Summary
      const totalPackages = results.length;
      const foundPackages = results.filter(r => r.found).length;
      markdown += `- Total packages: ${totalPackages}\n`;
      markdown += `- Found packages: ${foundPackages}\n`;
      markdown += `- Missing packages: ${totalPackages - foundPackages}\n\n`;

      // Platform Compatibility
      markdown += '## Platform Compatibility\n\n';
      const platforms = ['ios', 'android', 'web'];
      let allSupported = true;
      platforms.forEach(platform => {
        const supportedCount = results.filter(r => r.platforms[platform]).length;
        const percentage = (supportedCount / totalPackages * 100).toFixed(2);
        markdown += `- ${platform}: ${supportedCount}/${totalPackages} (${percentage}%)\n`;
        if (supportedCount < totalPackages) {
          allSupported = false;
        }
      });

      // Detailed Report
      markdown += '\n## Detailed Report\n\n';
      markdown += '| Package | Version | iOS | Android | Web |\n';
      markdown += '|---------|---------|-----|---------|-----|\n';
      results.forEach(result => {
        const ios = result.platforms.ios ? '✅' : '❌';
        const android = result.platforms.android ? '✅' : '❌';
        const web = result.platforms.web ? '✅' : '❌';
        markdown += `| ${result.packageName} | ${result.version} | ${ios} | ${android} | ${web} |\n`;
      });

      // Save report
      fs.writeFileSync('compatibility-report.md', markdown);

      // Fail if not all supported
      if (!allSupported) {
        console.error('Warning: Some packages do not support all platforms!');
        process.exit(1);
      }
      EOL
    - node check-compatibility.js || echo "Compatibility check completed with warnings."
  artifacts:
    paths:
      - compatibility-report.md
    expire_in: 1 week
  only:
    - main
    - merge_requests
```

## Jenkins Integration

### Jenkinsfile Example

The following Jenkinsfile adds compatibility checks to a Jenkins pipeline:

```groovy
pipeline {
    agent {
        docker {
            image 'node:16'
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Check compatibility') {
            steps {
                sh 'npx rn-compatibility-checker ./package.json'
            }
        }
    }
}
```

Save this Jenkinsfile at the root of your project.

## CircleCI Integration

### CircleCI Config Example

The following example adds compatibility checks to a CircleCI configuration:

```yaml
version: 2.1
jobs:
  compatibility-check:
    docker:
      - image: cimg/node:16.13
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package.json" }}
            - v1-dependencies-
      - run: npm ci
      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}
      - run: npx rn-compatibility-checker ./package.json

workflows:
  build-and-test:
    jobs:
      - compatibility-check
```

Add this configuration to your `.circleci/config.yml` file.

## Conclusion

Integrating rn-compatibility-checker into your CI/CD pipelines ensures continuous monitoring of your React Native projects' platform compatibility. The core principle remains the same: analyze your package.json and report the results. Customize these examples to fit your needs.
