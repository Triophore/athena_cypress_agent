const saveFile = require('fs').writeFileSync;

const pkgJsonPath = require.main.paths[0].split('node_modules')[0] + 'package.json';

const json = require(pkgJsonPath);

if (!json.hasOwnProperty('scripts')) {
  json.scripts = {};
}

json.scripts['athena'] = 'athena';

saveFile(pkgJsonPath, JSON.stringify(json, null, 2));


console.log(" Please configure this agent using CLI")

console.log(" ")

console.log("Please run :")

console.log(" npm run athena ")