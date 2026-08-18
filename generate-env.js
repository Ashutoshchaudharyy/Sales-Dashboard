const fs = require('fs');
const path = require('path');

// 1. Create or clean the dist directory
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// 2. Copy static files (HTML, JS, CSS) to the dist folder
const filesToCopy = ['index.html', 'app.js', 'styles.css'];
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file} to dist/`);
  }
});

// 3. Write environment variables to config.json inside the dist folder
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const config = {
  SUPABASE_URL: supabaseUrl,
  SUPABASE_ANON_KEY: supabaseAnonKey
};

fs.writeFileSync(path.join(distDir, 'config.json'), JSON.stringify(config, null, 2));
console.log('Generated dist/config.json successfully!');
console.log('Build completed successfully!');
