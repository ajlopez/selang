
const parser = require('../../lib/parser');
const fs = require('fs');

const code = fs.readFileSync(process.argv[2]).toString();

console.log(code);

const result = parser.parse('contract', code);

console.dir(result);

