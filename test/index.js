var tape = require('tape');
var ES6Set = require('es6-set');
var Immutable = require('Immutable');
var setValidator = require('../src/index');
require('babel-polyfill');

function validateFakeComponent(prop, isRequired) {
  return (isRequired ? setValidator.isRequired : setValidator)({ someProp: prop }, 'someProp', 'FakeComponent');
}

function passes(t, setIsh, variety, isRequired) {
  t.error(validateFakeComponent(setIsh, isRequired), 'passes with ' + variety);
}

function fails(t, nonSet, variety, isRequired) {
  t.ok(validateFakeComponent(nonSet, isRequired) instanceof Error, 'fails with ' + variety);
}

tape('Set PropTypes validator', function (t) {
  t.plan(6);
  passes(t, new Set([0]), 'native or babel-polyfilled Set');
  passes(t, new ES6Set([1, 2]), 'es6-set polyfilled Set');
  passes(t, Immutable.Set([]), 'Immutable.Set');
  passes(t, undefined, 'undefined without isRequired');
  fails(t, [3, 4, 5], 'array');
  fails(t, undefined, 'undefined and isRequired', true);
});
