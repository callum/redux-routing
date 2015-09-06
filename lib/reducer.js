'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = reducer;

var _constants = require('./constants');

function reducer(route, action) {
  if (route === undefined) route = {};

  switch (action.type) {
    case _constants.NAVIGATE:
    case _constants.POP:
    case _constants.REPLACE:
      return {
        hash: action.hash,
        matcher: action.matcher,
        params: action.params,
        pathname: action.pathname,
        query: action.query,
        search: action.search,
        url: action.url
      };

    default:
      return route;
  }
}

module.exports = exports['default'];