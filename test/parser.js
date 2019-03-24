
const parser = require('../lib/parser');

exports['parse lowercase name'] = function (test) {
    const result = parser.parse('name', 'foo');
    
    match(test, result, { ntype: 'name', name: 'foo' });
};

exports['parse mixed case name'] = function (test) {
    const result = parser.parse('name', 'Foo');
    
    match(test, result, { ntype: 'name', name: 'Foo' });
};

exports['parse uppercase name'] = function (test) {
    const result = parser.parse('name', 'BAR');
    
    match(test, result, { ntype: 'name', name: 'BAR' });
};

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        test.equal(typeof node[n], 'function');
        test.equal(node[n](), obj[n]);
    }
}

