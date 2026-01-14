/**
 * Sample test file for demonstration purposes.
 * 
 * This file serves as an example of a local JavaScript build that can be
 * injected into a live website using the it-worked-on-my-machine CLI.
 * 
 * Usage:
 *   it-work-on-my-machine -u https://example.com -l ./src/test.js -r https://example.com/app.js
 * 
 * When the target website requests the remote JS file specified with -r,
 * this local file will be served instead, allowing you to:
 *   - Debug production issues with local code
 *   - Test new features against live data
 *   - Verify fixes before deployment
 */

console.log('WORKED ON MY MACHINE');

// Example: Add custom debugging or feature flags
window.__DEBUG_MODE__ = true;

// Example: Override or patch existing functionality
// window.originalFunction = function() {
//   console.log('Patched version running!');
// };
