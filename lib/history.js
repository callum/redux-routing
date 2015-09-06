'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.history = history;
exports.equal = equal;

var _actions = require('./actions');

var _constants = require('./constants');

function history(store, action) {
  var hash = action.hash;
  var pathname = action.pathname;
  var search = action.search;
  var url = action.url;

  var curr = window.history.state;
  var next = { hash: hash, pathname: pathname, search: search };

  switch (action.type) {
    case _constants.NAVIGATE:
      if (!equal(curr, next)) {
        window.history.pushState(next, null, url);
      }
      break;

    case _constants.REPLACE:
      window.history.replaceState(next, null, url);
      break;
  }

  window.onpopstate = function (event) {
    return store.dispatch((0, _actions.pop)(event.state));
  };
}

function equal(a, b) {
  return a.hash === b.hash && a.pathname === b.pathname && a.search === b.search;
}