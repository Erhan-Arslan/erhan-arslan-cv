// Usage: node screenshot.mjs [url] [label] [--width=1440] [--height=900] [--mobile] [--viewport-only]
// Saves to ./screenshots/screenshot-N[-label].png (N auto-increments, nothing is overwritten).
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const DEFAULT_URL = 'http://127.0.0.1:5500';
const OUT_DIR = path.resolve('screenshots');

const args = process.argv.slice(2);
const flags = new Map(
  args.filter((a) => a.startsWith('--')).map((a) => {
    const [key, value] = a.slice(2).split('=');
    return [key, value ?? 'true'];
  }),
);
const [urlArg, labelArg] = args.filter((a) => !a.startsWith('--'));

const url = urlArg ?? DEFAULT_URL;
const label = (labelArg ?? '').replace(/[^a-z0-9_-]/gi, '-');
const isMobile = flags.has('mobile');
const width = Number(flags.get('width') ?? (isMobile ? 390 : 1440));
const height = Number(flags.get('height') ?? (isMobile ? 844 : 900));
const fullPage = !flags.has('viewport-only');

const { protocol, hostname } = new URL(url);
if (!['http:', 'https:'].includes(protocol) || !['localhost', '127.0.0.1'].includes(hostname)) {
  console.error(`Refusing ${url}: screenshots must be taken from localhost (never file:///).`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
const taken = (await readdir(OUT_DIR))
  .map((f) => /^screenshot-(\d+)/.exec(f)?.[1])
  .filter((n) => n !== undefined)
  .map(Number);
const next = taken.length ? Math.max(...taken) + 1 : 1;
const file = path.join(OUT_DIR, `screenshot-${next}${label ? `-${label}` : ''}.png`);

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2, isMobile, hasTouch: isMobile });
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
  } catch (err) {
    console.error(`Could not load ${url}. Is the dev server running? (${err.message})`);
    process.exitCode = 1;
    throw err;
  }
  await page.evaluate(() => document.fonts.ready);
  if (fullPage) {
    // Scroll through the page so scroll-triggered reveals fire, then return to the top.
    await page.evaluate(async () => {
      const step = Math.max(200, window.innerHeight * 0.6);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 140));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  }
  await page.screenshot({ path: file, fullPage });
  console.log(`${file}  (${width}x${height}${fullPage ? ', full page' : ''})`);
} catch {
  // error already reported above
} finally {
  await browser.close();
}
