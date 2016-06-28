var methods = [
  'add',
  'clear',
  'delete',
  'entries',
  'forEach',
  'has',
  'keys',
  'values'
];

function error(propName, componentName, property, condition) {
  return new Error([
    'Invalid prop `',
    propName,
    '` supplied to `',
    componentName,
    '`. Must be a Set. (`',
    propName,
    '.',
    property,
    '` was not ',
    condition,
    '.)'
  ].join(''));
}

module.exports = function (props, propName, componentName) {
  var s = props[propName];
  if (s.length !== 0) {
    return error(propName, componentName, 'length', 'equal to 0');
  }

  if (typeof s.size !== 'number') {
    return error(propName, componentName, 'size', 'a number');
  }

  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    if (typeof s[method] !== 'function') {
      return errorText(propName, componentName, method, 'a function');
    }
  }
};
