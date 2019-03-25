
const parser = require('../lib/parser');

exports['parse variable declaration'] = function (test) {
    const result = parser.parse('command', 'uint counter;');
    
    match(test, result, {
        ntype: 'variable',
        name: 'counter',
        type: 'uint'
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
