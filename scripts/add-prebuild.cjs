const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts['prebuild'] = 'node scripts/sync-from-expert-pack.cjs 2>nul || echo Sync skipped: expert pack not available';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Updated package.json with prebuild script');