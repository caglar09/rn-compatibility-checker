#!/usr/bin/env node

const { program } = require('commander');
const packageJson = require('../package.json');
const { checkCompatibility } = require('../src/index');

program
  .version(packageJson.version)
  .description('CLI tool to check platform compatibility of React Native libraries')
  .argument('<packageJsonPath>', 'path to package.json file')
  .option('-p, --platforms <platforms>', 'Platforms to check (comma-separated): ios,android,web,windows,expoGo,newArchitecture', 'ios,android,web,windows')
  .option('-d, --detailed', 'Show detailed output', false)
  .option('-f, --format <format>', 'Output format: table,csv', 'table')
  .action((packageJsonPath, options) => {
    checkCompatibility(packageJsonPath, options);
  });

program.parse(process.argv);
