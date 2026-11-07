import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'Asset', 'dist');

fs.mkdirSync(distDir, { recursive: true });

async function build() {
  const start = Date.now();
  console.log('⚡ Building RAKIT Studio (RAKIT Digital Solutions) Company Profile...');

  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src', 'app.jsx')],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['es2020'],
    format: 'esm',
    jsx: 'automatic',
    outfile: path.join(distDir, 'app.js'),
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.json': 'json'
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });

  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src', 'styles.css')],
    bundle: true,
    minify: true,
    outfile: path.join(distDir, 'app.css')
  });

  const jsSize = (fs.statSync(path.join(distDir, 'app.js')).size / 1024).toFixed(1);
  const cssSize = (fs.statSync(path.join(distDir, 'app.css')).size / 1024).toFixed(1);
  console.log(`✅ Build complete in ${Date.now() - start}ms`);
  console.log(`   • Asset/dist/app.js  (${jsSize} KB)`);
  console.log(`   • Asset/dist/app.css (${cssSize} KB)`);
}

build().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
