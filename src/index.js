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

function setType(props, propName, componentName) {
  var s = props[propName];
  if (s == null) return; // null or undefined

  if (typeof s.size !== 'number') {
    return error(propName, componentName, 'size', 'a number');
  }

  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    if (typeof s[method] !== 'function') {
      return error(propName, componentName, method, 'a function');
    }
  }
};

setType.isRequired = function (props, propName, componentName) {
  if (props[propName] == null) { // null or undefined
    return new Error('Required prop `' + propName + '` was not specified in ' + componentName + '.');
  }

  return setType(props, propName, componentName);
}

module.exports = setType;
