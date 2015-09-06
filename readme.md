# redux-router

Agnostic routing built on top of [redux](github.com/rackt/redux). Keep your router state with the rest of your application state, dispatching actions to update the current route.

redux-router can persist state using a hash or the HTML5 History API.

For usage with React see [example/main.js](example/main.js)

[![Build Status](https://travis-ci.org/callum/redux-router.svg)](https://travis-ci.org/callum/redux-router)

## install

```
npm install redux-router --save
```

## example

```js
import { applyMiddleware, createStore } from 'redux'
import { createMiddleware, createRouter, history, navigate, replace, reducer } from 'redux-router'

// create a router using html5 history
const router = createRouter(history)

// configure routes, mapping urls to handlers
router.route('/', () => console.log('foo'))
router.route('/foo', () => console.log('bar'))
router.route('/foo/:bar', () => console.log('baz'))

// subscribe to changes and call handlers as defined above
router.subscribe(handler => handler())

// create routing middleware and set up store
const middleware = createMiddleware(router)
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// start routing
store.dispatch(replace({ pathname: '/' }))
// logs 'foo'
store.dispatch(navigate({ pathname: '/foo' }))
// logs 'bar'
store.dispatch(navigate({ pathname: '/foo/123' }))
// logs 'baz'
store.dispatch(navigate({ pathname: '/foo/123', search: '?name=callum' }))
// logs 'baz'

console.log(store.getState())
// {
//   matcher: '/foo/:bar',
//   params: {
//     bar: 123
//   },
//   pathname: '/foo/123',
//   query: {
//     name: 'callum'
//   },
//   search: '?name=callum'
// }
```
