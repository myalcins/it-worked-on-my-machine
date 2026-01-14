const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

async function runTests(options) {
  const localFilePath = path.resolve(path.resolve(process.cwd(), options.local));
  
  if (!fs.existsSync(localFilePath)) {
    console.error(chalk.red(`Local JS build file not found: ${localFilePath}`));
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: options.headless });
  const page = await browser.newPage();

  await page.route(options.remote, async (route) => {
    console.log(chalk.blue(`Intercepting request to: ${route.request().url()}`));

    const localCode = fs.readFileSync(localFilePath);
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: localCode,
    });
  });

  console.log(`Navigating to: ${options.url}...`);
  await page.goto(options.url);

  if (options.watch) {
    console.log(chalk.yellow('Watching for changes in the local file...'));
    fs.watch(localFilePath, () => {
      console.log(chalk.yellow('Local file changed, reloading browser...'));
      page.reload();
    });
  }

  console.log(chalk.green('Injecting successful! Pausing for manual tests...'));
  console.log(chalk.yellow('Press Ctrl+C to exit, or close the browser window.'));

  browser.on('disconnected', () => {
    console.log(chalk.blue('\nBrowser closed. Exiting...'));
    process.exit(0);
  });

  if (!options.headless) {
    try {
      await page.pause();
    } catch (err) {
      console.error(chalk.red('Error pausing browser:'), err);
    }
  } else {
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
  }
}

module.exports = {
  runTests,
};
