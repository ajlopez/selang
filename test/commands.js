
const parser = require('../lib/parser');
const geast = require('geast');

exports['parse if command'] = function (test) {
    const result = parser.parse('command', 'if (k < 10) k = k + 1;');

    test.deepEqual(geast.toObject(result), {
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

    test.deepEqual(geast.toObject(result), {
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

    test.deepEqual(geast.toObject(result), {
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

