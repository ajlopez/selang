
const parser = require('../lib/parser');

exports['parse simple assignment'] = function (test) {
    const result = parser.parse('command', 'answer = 42;');
    
    match(test, result, {
        ntype: 'assign',
        lefthand: {
            ntype: 'name',
            name: 'answer'
        },
        expression: {
            ntype: 'constant',
            value: 42
        }
    });
};

exports['parse assignment'] = function (test) {
    const result = parser.parse('command', 'counter = counter + 1;');
    
    match(test, result, {
        ntype: 'assign',
        lefthand: {
            ntype: 'name',
            name: 'counter'
        },
        expression: {
            ntype: 'binary',
            operator: '+',
            left: {
                ntype: 'name',
                name: 'counter'
            },
            right: {
                ntype: 'constant',
                value: 1
            }
        }
    });
};

function match(test, node, obj) {
    test.ok(node);
    
    for (var n in obj) {
        test.ok(node[n]);
        
        let value;
        
        if (typeof node[n] === 'function')
            value = node[n]();
        else
            value = node[n];
        
        const expected = obj[n];
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}

