"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = createMiddleware;

function createMiddleware(router) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (/^@@redux-routing/.test(action.type)) {
          var match = router.match(action);

          if (!match) {
            throw new Error("Missing route for '" + action.pathname + "'");
          }

          var result = next(_extends({}, action, match));

          router.persistence(store, result);
          router.notify(match.handler);

          return result;
        }

        return next(action);
      };
    };
  };
}

module.exports = exports["default"];