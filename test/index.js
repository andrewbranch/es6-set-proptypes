var tape = require('tape');
var ES6Set = require('es6-set');
var Immutable = require('immutable');
var setValidator = require('../src/index');
var NativeSet = global.Set;
delete global.Set;

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
  t.plan(7);
  passes(t, new NativeSet([0]), 'native Set');
  require('babel-polyfill');
  passes(t, new Set([]), 'babel-polyfill Set');
  passes(t, new ES6Set([1, 2]), 'es6-set polyfilled Set');
  passes(t, Immutable.Set([]), 'Immutable.Set');
  passes(t, undefined, 'undefined without isRequired');
  fails(t, [3, 4, 5], 'array');
  fails(t, undefined, 'undefined and isRequired', true);
});
