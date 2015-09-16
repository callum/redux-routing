# redux-routing

[![Build Status](https://travis-ci.org/callum/redux-routing.svg)](https://travis-ci.org/callum/redux-routing)

Universal routing built on top of [redux](https://github.com/rackt/redux).

## how it works

1. Create a router
2. Define routes with handlers
3. Subscribe to route changes
4. Dispatch actions to update the route

redux-routing retains browser history using a hash or the HTML5 History API.

For usage with React see [example/main.js](example/main.js). See [redux-routing-universal-example](https://github.com/callum/redux-routing-universal-example) for an example of a universal application that renders on both client and server.

## install

```
npm install redux-routing --save
```

## example

```js
import { applyMiddleware, createStore } from 'redux'
import { createMiddleware, History, navigate, reducer, Router } from 'redux-routing'

// create a router using html5 history
const router = new Router(History)
const middleware = createMiddleware(router)

// set up store with middleware
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// define routes
router.route('/', () => console.log('routed to /'))
router.route('/foo', () => console.log('routed to /foo'))
router.route('/foo/:bar', () => console.log('routed to /foo/:bar'))

// subscribe to changes
store.subscribe(route => {
  const match = router.match(route.location)

  if (match) {
    match.handler()
  } else {
    console.log('404 not found')
  }
})

// start routing
store.dispatch(navigate('/'))
// logs 'routed to /'
store.dispatch(navigate('/foo'))
// logs 'routed to /foo'
store.dispatch(navigate('/foo/123'))
// logs 'routed to /foo/:bar'
store.dispatch(navigate('/foo/bar/baz'))
// logs '404 not found'

// query the router state
console.log(store.getState())
```
