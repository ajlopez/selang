
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse uint variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint counter;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'counter',
        type: 'uint'
    });
};

exports['parse uint variable declaration and initialization'] = function (test) {
    const result = parser.parse('command', 'uint answer = 42;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'answer',
        type: 'uint',
        expression: {
            ntype: 'constant',
            value: 42
        }
    });
};

exports['parse int variable declaration'] = function (test) {
    const result = parser.parse('command', 'int counter;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'counter',
        type: 'int'
    });
};

exports['parse bool variable declaration'] = function (test) {
    const result = parser.parse('command', 'bool flag;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'flag',
        type: 'bool'
    });
};

exports['parse uint dynamic array variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint[] counter;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'counter',
        type: {
            ntype: 'array',
            type: 'uint'
        }
    });
};

exports['parse uint fixed size array variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint[10] counter;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'counter',
        type: {
            ntype: 'array',
            length: {
                ntype: 'constant',
                value: 10
            },
            type: 'uint'
        }
    });
};

exports['parse address variable declaration'] = function (test) {
    const result = parser.parse('command', 'address counter;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'counter',
        type: 'address'
    });
};

exports['parse address variable declaration'] = function (test) {
    const result = parser.parse('command', 'address counter;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'counter',
        type: 'address'
    });
};

exports['parse struct/contract variable declaration'] = function (test) {
    const result = parser.parse('command', 'Vote counter;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'counter',
        type: 'Vote'
    });
};

exports['parse bytes variable declaration'] = function (test) {
    const result = parser.parse('command', 'bytes data;');
    
    test.deepEqual(geast.toObject(result), {
        ntype: 'variable',
        name: 'data',
        type: 'bytes'
    });
};

