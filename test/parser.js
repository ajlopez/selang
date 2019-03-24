
const parser = require('../lib/parser');

exports['parse lowercase name'] = function (test) {
    const result = parser.parse('name', 'foo');
    
    match(test, result, { ntype: 'name', name: 'foo' });
};

exports['parse name with digits'] = function (test) {
    const result = parser.parse('name', 'foo42');
    
    match(test, result, { ntype: 'name', name: 'foo42' });
};

exports['parse name with underscore and digits'] = function (test) {
    const result = parser.parse('name', 'foo_42');
    
    match(test, result, { ntype: 'name', name: 'foo_42' });
};

exports['parse mixed case name'] = function (test) {
    const result = parser.parse('name', 'Foo');
    
    match(test, result, { ntype: 'name', name: 'Foo' });
};

exports['parse uppercase name'] = function (test) {
    const result = parser.parse('name', 'BAR');
    
    match(test, result, { ntype: 'name', name: 'BAR' });
};

exports['parse name with underscore'] = function (test) {
    const result = parser.parse('name', 'foo_bar');
    
    match(test, result, { ntype: 'name', name: 'foo_bar' });
};

exports['parse name with initial underscore'] = function (test) {
    const result = parser.parse('name', '_foo');
    
    match(test, result, { ntype: 'name', name: '_foo' });
};

exports['parse integer'] = function (test) {
    const result = parser.parse('integer', '42');
    
    match(test, result, { ntype: 'constant', value: 42 });
};

exports['parse string'] = function (test) {
    const result = parser.parse('string', '"foo"');
    
    match(test, result, { ntype: 'constant', value: 'foo' });
};

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        test.equal(typeof node[n], 'function');
        test.strictEqual(node[n](), obj[n]);
    }
}

