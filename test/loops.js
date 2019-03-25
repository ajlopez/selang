
const parser = require('../lib/parser');

exports['parse while'] = function (test) {
    const result = parser.parse('command', 'while (b) c;');
    
    match(test, result, {
        ntype: 'loop',
        condition: {
            ntype: 'name',
            name: 'b'
        },
        body: {
            ntype: 'name',
            name: 'c'
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
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}
