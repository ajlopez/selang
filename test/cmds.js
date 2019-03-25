
const parser = require('../lib/parser');

exports['parse break command'] = function (test) {
    const result = parser.parse('command', 'break;');
    
    test.ok(result);
    test.equal(result.ntype(), 'break');
};

exports['parse continue command'] = function (test) {
    const result = parser.parse('command', 'continue;');
    
    test.ok(result);
    test.equal(result.ntype(), 'continue');
};

