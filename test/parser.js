
const parser = require('../lib/parser');

exports['parse lowercase name'] = function (test) {
    const result = parser.parse('name', 'foo');
    
    match(test, result, { ntype: 'name', name: 'foo' });
};

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        test.equal(typeof node[n], 'function');
        test.equal(node[n](), obj[n]);
    }
}

