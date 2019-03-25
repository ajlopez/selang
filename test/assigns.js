
const parser = require('../lib/parser');

exports['parse simple assignment'] = function (test) {
    const result = parser.parse('command', 'answer = 42;');
    
    match(test, result, {
        ntype: 'assignment',
        lefthand: {
            ntype: 'name',
            name: 'answer'
        },
        value: {
            ntype: 'constant',
            value: 42
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

