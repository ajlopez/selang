
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

exports['parse empty explicit private void method'] = function (test) {
    const result = parser.parse('method', 'private void foo() {}');
    
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

exports['parse empty explicit private uint method'] = function (test) {
    const result = parser.parse('method', 'private uint foo() {}');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'private',
        type: 'uint',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: []
        }
    });
};

exports['parse implicit private uint method'] = function (test) {
    const result = parser.parse('method', 'uint foo() { return 42; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'private',
        type: 'uint',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'return',
                    expression: {
                        ntype: 'constant',
                        value: 42
                    }
                }
            ]
        }
    });
};

exports['parse increment method'] = function (test) {
    const result = parser.parse('method', 'public void increment() { counter = counter + 1; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'public',
        type: 'void',
        arguments: [],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'assignment',
                    lefthand: {
                        ntype: 'name',
                        name: 'counter'
                    },
                    value: {
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
                }
            ]
        }
    });
};

exports['parse add method with one argument'] = function (test) {
    const result = parser.parse('method', 'public void add(uint value) { counter = counter + value; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'public',
        type: 'void',
        arguments: [
            {
                ntype: 'argument',
                name: 'value',
                type: 'uint'
            }
        ],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'assignment',
                    lefthand: {
                        ntype: 'name',
                        name: 'counter'
                    },
                    value: {
                        ntype: 'binary',
                        operator: '+',
                        left: {
                            ntype: 'name',
                            name: 'counter'
                        },
                        right: {
                            ntype: 'name',
                            name: 'value'
                        }
                    }
                }
            ]
        }
    });
};

exports['parse add method with two arguments'] = function (test) {
    const result = parser.parse('method', 'public void add(uint value, uint value2) { counter = counter + value; }');
    
    match(test, result, {
        ntype: 'method',
        visibility: 'public',
        type: 'void',
        arguments: [
            {
                ntype: 'argument',
                name: 'value',
                type: 'uint'
            },
            {
                ntype: 'argument',
                name: 'value2',
                type: 'uint'
            }
        ],
        body: {
            ntype: 'sequence',
            nodes: [
                {
                    ntype: 'assignment',
                    lefthand: {
                        ntype: 'name',
                        name: 'counter'
                    },
                    value: {
                        ntype: 'binary',
                        operator: '+',
                        left: {
                            ntype: 'name',
                            name: 'counter'
                        },
                        right: {
                            ntype: 'name',
                            name: 'value'
                        }
                    }
                }
            ]
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

