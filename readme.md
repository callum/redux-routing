# redux-routing

[![Build Status](https://travis-ci.org/callum/redux-routing.svg)](https://travis-ci.org/callum/redux-routing)

Universal routing built on top of [redux](https://github.com/rackt/redux).

## how it works

1. Create a router
2. Define routes with handlers
3. Subscribe to route changes
4. Dispatch actions to update the route

redux-routing retains browser history using a hash or the HTML5 History API.

See [path-parser](https://github.com/troch/path-parser) for detail on defining routes.

For usage with React see [example/main.js](example/main.js). See [redux-routing-universal-example](https://github.com/callum/redux-routing-universal-example) for an example of a universal application that renders on both client and server.

## install

```
npm install redux-routing --save
```

## guide

Basic usage example

```js
import { applyMiddleware, createStore } from 'redux'
import { createMiddleware, History, match, navigate, reducer, route } from 'redux-routing'

// define routes
const routes = [
  route('/', () => console.log('routed to /')),
  route('/foo', () => console.log('routed to /foo')),
  route('/foo/:bar', () => console.log('routed to /foo/:bar'))
]

// set up routing middleware using html5 history
const middleware = createMiddleware(History)

// set up store with middleware
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// subscribe to changes
store.subscribe(() => {
  const route = store.getState()
  const matched = match(route.location, routes)

  if (matched) {
    matched.handler()
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
```

Build a URL from a route

```js
const foo = route('/foo/:bar/:baz')

foo.build({ bar: 'hello', baz: 'world' })
// /foo/hello/world
```

Named routes

```js
const routes = new Map()

routes.set('foo', route('/foo/:bar'))
```
