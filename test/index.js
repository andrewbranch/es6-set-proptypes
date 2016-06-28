var tape = require('tape');
var ES6Set = require('es6-set');
var Immutable = require('Immutable');
var setValidator = require('../src/index');
require('babel-polyfill');

function validateFakeComponent(prop) {
  return setValidator({ someProp: prop }, 'someProp', 'FakeComponent');
}

function passes(t, setIsh, variety) {
  t.error(validateFakeComponent(setIsh), 'passes with ' + variety);
}

function fails(t, nonSet, variety) {
  t.ok(validateFakeComponent(nonSet) instanceof Error, 'fails with ' + variety);
}

tape('Set PropTypes validator', function (t) {
  t.plan(4);
  passes(t, new Set([0]), 'native or babel-polyfilled Set');
  passes(t, new ES6Set([1, 2]), 'es6-set polyfilled Set');
  passes(t, Immutable.Set([]), 'Immutable.Set');
  fails(t, [3, 4, 5], 'array');
});
