
const gelex = require('gelex');
const gepars = require('gepars');
const geast = require('geast');

geast.node('array', [ 'type', 'length' ]);
geast.node('method', [ 'name', 'type', 'visibility', 'arguments', 'body' ]);

const ldef = gelex.definition();

ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('operator', '+-*/'.split(''));
ldef.define('delimiter', '()[]{};'.split(''));
ldef.defineText('string', '"', '"');

const pdef = gepars.definition();

// simple terms
pdef.define('name', 'name:', function (value) { return geast.name(value); });
pdef.define('integer', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('string', 'string:', function (value) { return geast.constant(value); });

// commands
// variable declaration
pdef.define('command', [ 'type', 'name:', 'delimiter:;' ], function (values) { return geast.variable(values[1], values[0]); });
// if command
pdef.define('command', [ 'name:if', 'delimiter:(', 'expression', 'delimiter:)', 'command', 'name:else', 'command' ], function (values) { return geast.conditional(values[2], values[4], values[6]); });
pdef.define('command', [ 'name:if', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.conditional(values[2], values[4], null); });
// while command
pdef.define('command', [ 'name:while', 'delimiter:(', 'expression', 'delimiter:)', 'command' ], function (values) { return geast.loop(values[2], values[4]); });
// break command
pdef.define('command', [ 'name:break', 'delimiter:;' ], function (values) { return geast.break(); });
// continue command
pdef.define('command', [ 'name:continue', 'delimiter:;' ], function (values) { return geast.continue(); });
// expression command
pdef.define('command', [ 'expression', 'delimiter:;' ], function (values) { return values[0]; });
// composite command
pdef.define('command', [ 'delimiter:{', 'commandlist', 'delimiter:}' ], function (values) { return geast.sequence(values[1]); });
pdef.define('commandlist', [ 'commandlist', 'command' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('commandlist', 'command', function (value) { return [ value ]; });
pdef.define('commandlist', [ '!', 'delimiter:}' ], function (values) { return []; });

// methods
pdef.define('method', [ 'name:void', 'name:', 'delimiter:(', 'delimiter:)', 'command' ], function (values) { return geast.method(values[1], values[0], 'private', [], values[4]); });
pdef.define('method', [ 'visibility', 'name:void', 'name:', 'delimiter:(', 'delimiter:)', 'command' ], function (values) { return geast.method(values[2], values[1], values[0], [], values[5]); });
pdef.define('visibility', 'name:public');
pdef.define('visibility', 'name:private');

// types
pdef.define('type', [ 'type', 'delimiter:[', 'delimiter:]' ], function (values) { return geast.array(values[0], null); });
pdef.define('type', [ 'type', 'delimiter:[', 'integer', 'delimiter:]' ], function (values) { return geast.array(values[0], values[2]); });
pdef.define('type', 'name:uint');
pdef.define('type', 'name:int');
pdef.define('type', 'name:bool');

// expressions
pdef.define('expression', 'expression2');
pdef.define('expression2', [ 'expression2', 'operator:+', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', [ 'expression2', 'operator:-', 'expression1' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', 'expression1');
pdef.define('expression1', [ 'expression1', 'operator:*', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', [ 'expression1', 'operator:/', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', 'term');

// terms
pdef.define('term', [ 'term', 'delimiter:[', 'expression', 'delimiter:]' ], function (values) { return geast.indexed(values[0], values[2]); } );
pdef.define('term', 'integer');
pdef.define('term', 'name');
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

function parseNode(type, text) {
    const lexer = ldef.lexer(text);
    const parser = pdef.parser(lexer);
    
    return parser.parse(type);
}

module.exports = {
    parse: parseNode
};

