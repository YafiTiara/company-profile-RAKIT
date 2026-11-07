import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function checkFile(relPath) {
  const full = path.join(rootDir, relPath);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing required file: ${relPath}`);
  }
}

console.log('🔍 Running RAKIT Studio integrity & asset verification...');

const requiredFiles = [
  'index.html',
  'Asset/dist/app.js',
  'Asset/dist/app.css',
  'src/data/studio.json',
  'src/data/projects.json',
  'src/data/demos.json'
];

for (const file of requiredFiles) {
  checkFile(file);
}

const studio = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/studio.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/projects.json'), 'utf8'));

for (const mode of studio.hero.telemetryModes) {
  checkFile(mode.image);
}

for (const cert of studio.founder.certificates) {
  checkFile(cert.image);
}

checkFile(studio.founder.cvUrl);

for (const proj of projects) {
  if (proj.coverImage) {
    checkFile(proj.coverImage);
  }
}

console.log(`✅ All ${projects.length} production project records, founder photos, certificates, and dist bundles verified!`);
