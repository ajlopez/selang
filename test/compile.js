
const selang = require('..');
const fs = require('fs');
const path = require('path');

exports['Compile counter program'] = function (test) {
    const text = fs.readFileSync(path.join(__dirname, 'files', 'Counter.sel')).toString();
    
    const bytecodes = selang.compile(text);
    
    test.ok(bytecodes);
    console.log(bytecodes);
};
