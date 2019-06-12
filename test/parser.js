
const parser = require('../lib/parser');

exports['parse type bytes'] = function (test) {
    const result = parser.parse('type', 'bytes');
    
    test.ok(result);
    test.equal(result, 'bytes');
};

