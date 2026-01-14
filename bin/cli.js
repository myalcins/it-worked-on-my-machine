#! /usr/bin/env node

const { Command } = require('commander');
const { runTests } = require('../src');
const chalk = require('chalk');

const program = new Command();

program
  .name('it-worked-on-my-machine')
  .version('1.0.0')
  .description('It worked on my machine');

program
  .requiredOption('-u, --url <type>', 'The URL to run tests on')
  .requiredOption('-l --local <path', 'Path toyour local JS build file')
  .requiredOption('-r --remote <path>', 'The path of the JS file on live to replace')
  .option('--headless', 'Run tests in headless mode', false)
  .option('-w --watch', 'Watch for changes in the local file and automatically reload the browser', false);

program.parse(process.argv);

const options = program.opts();

console.log(chalk.green(`Starting tests on: ${options.url}`));
console.log(chalk.green(`Local JS build file: ${options.local}`));
console.log(chalk.green(`Remote JS file: ${options.remote}`));
console.log(chalk.green(`Headless mode: ${options.headless}`));

runTests(options);
