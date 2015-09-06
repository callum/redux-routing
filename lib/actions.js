'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.navigate = navigate;
exports.pop = pop;
exports.replace = replace;

var _constants = require('./constants');

function navigate(location) {
  return typedLocation(_constants.NAVIGATE, location);
}

function pop(location) {
  return typedLocation(_constants.POP, location);
}

function replace(location) {
  return typedLocation(_constants.REPLACE, location);
}

function typedLocation(type, location) {
  return {
    hash: location.hash,
    pathname: location.pathname,
    search: location.search,
    type: type
  };
}