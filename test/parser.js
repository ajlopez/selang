
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

exports['parse add integers'] = function (test) {
    const result = parser.parse('expression', '42 + 0');
    
    match(test, result, { 
        ntype: 'binary', 
        operator: '+',
        left: {
            ntype: 'constant',
            value: 42
        },
        right: {
            ntype: 'constant',
            value: 0
        }
    });
};

exports['parse add integer and variable'] = function (test) {
    const result = parser.parse('expression', '42 + foo');
    
    match(test, result, { 
        ntype: 'binary', 
        operator: '+',
        left: {
            ntype: 'constant',
            value: 42
        },
        right: {
            ntype: 'name',
            name: 'foo'
        }
    });
};

exports['parse add variable and integer'] = function (test) {
    const result = parser.parse('expression', 'foo + 42');
    
    match(test, result, { 
        ntype: 'binary', 
        operator: '+',
        left: {
            ntype: 'name',
            name: 'foo'
        },
        right: {
            ntype: 'constant',
            value: 42
        }
    });
};

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        test.equal(typeof node[n], 'function');
        const value = node[n]();
        const expected = obj[n];
        
        if (typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}
