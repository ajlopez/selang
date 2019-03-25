
const parser = require('../lib/parser');

exports['parse empty private void method'] = function (test) {
    const result = parser.parse('method', 'void foo() {}');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'private',
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse empty public void method'] = function (test) {
    const result = parser.parse('method', 'public void foo() {}');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'public',
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
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

