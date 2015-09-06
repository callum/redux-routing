'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createRouter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pathParser = require('path-parser');

var _pathParser2 = _interopRequireDefault(_pathParser);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function createRouter() {
  var persistence = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

  if (typeof persistence !== 'function') {
    throw new Error('Expected persistence to be a function');
  }

  var subscribers = new Set();
  var routes = new Set();

  function match(location) {
    var hash = location.hash;
    var pathname = location.pathname;
    var search = location.search;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _route = _step.value;

        var _match = _route.path.match(pathname);

        if (_match) {
          var query = undefined;

          if (search) {
            query = _querystring2['default'].parse(search.slice(1));
          }

          return {
            handler: _route.handler,
            matcher: _route.matcher,
            params: _match,
            url: _url2['default'].format(location),
            hash: hash,
            pathname: pathname,
            query: query,
            search: search
          };
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  function route(matcher, handler) {
    var route = {
      path: new _pathParser2['default'](matcher),
      handler: handler,
      matcher: matcher
    };

    routes.add(route);
    return route;
  }

  function subscribe(listener) {
    subscribers.add(listener);

    return function unsubscribe() {
      subscribers['delete'](listener);
    };
  }

  function notify(callback) {
    subscribers.forEach(function (subscriber) {
      return subscriber(callback);
    });
  }

  return {
    match: match,
    notify: notify,
    persistence: persistence,
    route: route,
    routes: routes,
    subscribe: subscribe,
    subscribers: subscribers
  };
}

module.exports = exports['default'];