/**
 * Runner for integration tests.
 * Extracts --apiKey=<key> from CLI args, sets it as TE_API_KEY env var,
 * then spawns Jest with the remaining args.
 *
 * Usage:
 *   npm run test:integration -- --apiKey=your_key:your_secret
 *   npm run test:integration -- --apiKey=your_key:your_secret --testPathPattern=calendar
 */
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const keyArg = args.find(a => a.startsWith('--apiKey='));
const jestArgs = args.filter(a => !a.startsWith('--apiKey='));

const env = { ...process.env };
if (keyArg) {
    env.TE_API_KEY = keyArg.split('=').slice(1).join('=');
}

if (!env.TE_API_KEY) {
    console.warn('Warning: No API key provided. Pass --apiKey=key:secret or set TE_API_KEY. Tests will be skipped.');
}

const result = spawnSync(
    'npx',
    ['jest', '--selectProjects', 'integration', '--runInBand', ...jestArgs],
    { stdio: 'inherit', env, shell: true }
);

process.exit(result.status ?? 0);
