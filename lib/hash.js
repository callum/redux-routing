'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.hash = hash;
exports.parse = parse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _actions = require('./actions');

var _constants = require('./constants');

function hash(store, action) {
  switch (action.type) {
    case _constants.NAVIGATE:
    case _constants.REPLACE:
      window.location.hash = action.url;
      break;
  }

  window.onhashchange = function () {
    return store.dispatch((0, _actions.pop)(parse(window.location.hash)));
  };
}

function parse(hash) {
  return _url2['default'].parse(hash.slice(1));
}