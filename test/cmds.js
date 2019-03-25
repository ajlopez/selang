
const parser = require('../lib/parser');

exports['parse break command'] = function (test) {
    const result = parser.parse('command', 'break;');
    
    test.ok(result);
    test.equal(result.ntype(), 'break');
};

