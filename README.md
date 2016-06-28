# es6-set-proptypes

React PropTypes for [ES6 Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and compatible interfaces.

[![Build Status](https://travis-ci.org/andrewbranch/es6-set-proptypes.svg?branch=master)](https://travis-ci.org/andrewbranch/es6-set-proptypes)

Tested with native Set (in Node), [babel-polyfill](https://babeljs.io/docs/usage/polyfill/), [es6-set](https://github.com/medikoo/es6-set), and [Immutable.Set](https://facebook.github.io/immutable-js/docs/#/Set). Includes an `isRequired` property to work the same way as [React.PropTypes](https://facebook.github.io/react/docs/reusable-components.html#prop-validation).

## Usage

```js
import React, { Component, PropTypes } from 'react';
import setType from 'es6-set-proptypes';

export default class UniqueList extends Component {
  static propTypes = {
    header: PropTypes.string,
    items: setType.isRequired,
    hiddenItems: setType
  };

  render() {
    return (
      ...
    );
  }
}
```
