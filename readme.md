# it-works-on-my-machine

A CLI tool that lets you test your local JavaScript builds against live websites by intercepting and replacing remote JS files on-the-fly using Playwright.

## Why?

Ever had a bug that only appears in production? Or need to test your local changes against a live environment without deploying? This tool intercepts requests to remote JavaScript files and serves your local build instead, letting you debug and test in real-time.

## Installation

```bash
npm install -g it-works-on-my-machine
```

Or run locally:

```bash
npm install
npm link
```

## Usage

```bash
it-works-on-my-machine -u <url> -l <local-file> -r <remote-file> [options]
```

### Required Options

| Option | Description |
|--------|-------------|
| `-u, --url <url>` | The URL of the website to test |
| `-l, --local <path>` | Path to your local JS build file |
| `-r, --remote <url>` | The URL of the remote JS file to replace |

### Optional Flags

| Option | Description | Default |
|--------|-------------|---------|
| `--headless` | Run browser in headless mode | `false` |
| `-w, --watch` | Watch for changes and auto-reload | `false` |

## Examples

### Interactive Testing

Test your local bundle against a production site:

```bash
it-works-on-my-machine \
  -u https://example.com \
  -l ./dist/bundle.js \
  -r https://example.com/assets/app.js
```

This opens a browser window where you can manually test. The browser pauses for inspection using Playwright's debug mode.

### Headless Mode (CI/Screenshots)

Run in headless mode for automated testing or screenshots:

```bash
it-works-on-my-machine \
  -u https://example.com \
  -l ./dist/bundle.js \
  -r https://example.com/assets/app.js \
  --headless
```

In headless mode, a `screenshot.png` is saved to the current directory.

### Watch Mode

Auto-reload when your local file changes:

```bash
it-works-on-my-machine \
  -u https://example.com \
  -l ./dist/bundle.js \
  -r https://example.com/assets/app.js \
  --watch
```

## How It Works

1. Launches a Chromium browser via Playwright
2. Sets up a route interceptor for the specified remote JS URL
3. Navigates to the target URL
4. When the page requests the remote JS file, it's replaced with your local build
5. In interactive mode, the browser pauses for manual testing
6. In headless mode, a screenshot is captured

## Dependencies

- [Playwright](https://playwright.dev/) - Browser automation
- [Commander](https://github.com/tj/commander.js) - CLI argument parsing
- [Chalk](https://github.com/chalk/chalk) - Terminal styling

## License

ISC
