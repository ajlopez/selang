
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

exports['parse add'] = function (test) {
    parseBinary(test, '42 + 0', [ 42, '+', 0] );
    parseBinary(test, '1 + 2', [ 1, '+', 2 ]);
    parseBinary(test, '42 + foo', [ 42, '+', 'foo' ]);
    parseBinary(test, 'foo + 42', [ 'foo', '+', 42 ]);
    parseBinary(test, 'foo + bar', [ 'foo', '+', 'bar' ]);
};

exports['parse subtract'] = function (test) {
    parseBinary(test, '42 - 0', [ 42, '-', 0] );
    parseBinary(test, '1 - 2', [ 1, '-', 2 ]);
    parseBinary(test, '42 - foo', [ 42, '-', 'foo' ]);
    parseBinary(test, 'foo - 42', [ 'foo', '-', 42 ]);
    parseBinary(test, 'foo - bar', [ 'foo', '-', 'bar' ]);
};

exports['parse multiply'] = function (test) {
    parseBinary(test, '42 * 0', [ 42, '*', 0] );
    parseBinary(test, '1 * 2', [ 1, '*', 2 ]);
    parseBinary(test, '42 * foo', [ 42, '*', 'foo' ]);
    parseBinary(test, 'foo * 42', [ 'foo', '*', 42 ]);
    parseBinary(test, 'foo * bar', [ 'foo', '*', 'bar' ]);
};

exports['parse divide'] = function (test) {
    parseBinary(test, '42 / 0', [ 42, '/', 0] );
    parseBinary(test, '1 / 2', [ 1, '/', 2 ]);
    parseBinary(test, '42 / foo', [ 42, '/', 'foo' ]);
    parseBinary(test, 'foo / 42', [ 'foo', '/', 42 ]);
    parseBinary(test, 'foo / bar', [ 'foo', '/', 'bar' ]);
};

function parseBinary(test, text, expected) {
    const node = parser.parse('expression', text);
    const obj = toObj(expected);
    
    match(test, node, obj);
    
    function toObj(obj) {
        if (Array.isArray(obj))
            return {
                ntype: 'binary',
                operator: obj[1],
                left: toObj(obj[0]),
                right: toObj(obj[2])
            };
            
        if (typeof obj === 'string')
            return {
                ntype: 'name',
                name: obj
            };
            
        return {
            ntype: 'constant',
            value: obj
        }
    }
}

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

