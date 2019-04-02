
const parser = require('../lib/parser');

exports['parse if command'] = function (test) {
    const result = parser.parse('command', 'if (k < 10) k = k + 1;');

    match(test, result, {
        ntype: 'conditional',
        condition: {
            ntype: 'binary',
            operator: '<',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 10
            }
        },
        then: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'binary',
                operator: '+',
                left: {
                    ntype: 'name',
                    name: 'k'
                },
                right: {
                    ntype: 'constant',
                    value: 1
                }
            }
        }
    });
};

exports['parse if command with else'] = function (test) {
    const result = parser.parse('command', 'if (k > 10) k = k - 1; else k = 0');

    match(test, result, {
        ntype: 'conditional',
        condition: {
            ntype: 'binary',
            operator: '>',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 10
            }
        },
        then: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'binary',
                operator: '-',
                left: {
                    ntype: 'name',
                    name: 'k'
                },
                right: {
                    ntype: 'constant',
                    value: 1
                }
            }
        },
        else: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'constant',
                value: 0
            }
        }
    });
};

exports['parse while command'] = function (test) {
    const result = parser.parse('command', 'while (k < 10) k = k + 1;');

    match(test, result, {
        ntype: 'loop',
        condition: {
            ntype: 'binary',
            operator: '<',
            left: {
                ntype: 'name',
                name: 'k'
            },
            right: {
                ntype: 'constant',
                value: 10
            }
        },
        body: {
            ntype: 'assign',
            lefthand: {
                ntype: 'name',
                name: 'k'
            },
            expression: {
                ntype: 'binary',
                operator: '+',
                left: {
                    ntype: 'name',
                    name: 'k'
                },
                right: {
                    ntype: 'constant',
                    value: 1
                }
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
        
        if (expected === value)
            return;
        
        if (value != null && typeof value === 'object')
            match(test, value, expected);
        else
            test.strictEqual(value, expected);
    }
}

