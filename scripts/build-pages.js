/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function normalizeBasePath(value) {
  if (!value) return '';
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === '/') return '';
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '');
}

function inferRepoName() {
  const ghRepo = process.env.GITHUB_REPOSITORY;
  if (ghRepo && ghRepo.includes('/')) {
    return ghRepo.split('/')[1] || null;
  }

  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
    );
    return typeof pkg.name === 'string' ? pkg.name : null;
  } catch {
    return null;
  }
}

function inferBasePath() {
  if (Object.prototype.hasOwnProperty.call(process.env, 'PAGES_BASE_PATH')) {
    return process.env.PAGES_BASE_PATH;
  }

  const repo = inferRepoName();
  if (!repo) return '';

  // User/Org Pages repo (e.g. `username.github.io`) is hosted at the domain root.
  if (repo.endsWith('.github.io')) return '';

  // Project Pages is hosted at `/<repo>`.
  return `/${repo}`;
}

const basePath = normalizeBasePath(inferBasePath());

const cwd = process.cwd();
const outDir = path.join(cwd, 'out');
const nextDir = path.join(cwd, '.next');

try {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.rmSync(nextDir, { recursive: true, force: true });
} catch {
  // ignore
}

const env = {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_TELEMETRY_DISABLED: '1',
};

console.log(`[buildpages] basePath: ${basePath || '(none)'}`);

const nextCli = path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next');

const result = spawnSync(process.execPath, [nextCli, 'build'], {
  stdio: 'inherit',
  env,
});

if (result.error) {
  console.error(`[buildpages] Failed to run Next.js build: ${result.error.message}`);
  process.exit(1);
}

if (typeof result.status === 'number' && result.status !== 0) {
  process.exit(result.status);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
